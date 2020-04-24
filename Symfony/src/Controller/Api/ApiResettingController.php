<?php

namespace App\Controller\Api;

use App\Repository\UserRepository;
use App\Service\Mailer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;


class ApiResettingController extends AbstractController
{
    /**
     * @Route("/api/request", name="request_resetting", methods={"POST"})
     */
    public function request(Request $request, Mailer $mailer, TokenGeneratorInterface $tokenGenerator, UserRepository $userRepository)
    {
        // we get JSON content from request
        $data = json_decode($request->getContent());

        $userEmail = $data->email;
        if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
            return $this->json("Merci de renseigner une adresse email valide.", 409);
        }
        $user = $userRepository->findOneBy(['email' => $userEmail]);

        // user exist ?
        if (!$user) {
            return $this->json('Email inexistant.', 409);
        } 

        // token creation
        $user->setToken($tokenGenerator->generateToken());
        $user->setPasswordRequestedAt(new \Datetime());
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        // use mailer service we create
        $bodyMail = $mailer->createBodyMail('resetting/mail.html.twig', [
            'user' => $user
        ]);
        $mailer->sendMessage('olocalautomail@gmail.com', $user->getEmail(), 'Renouvellement du mot de passe', $bodyMail);

        return $this->json("Un mail va vous être envoyé afin que vous puissiez renouveller votre mot de passe. Le lien que vous recevrez sera valide 10 minutes.");
    }

    private function isRequestInTime(\Datetime $passwordRequestedAt = null)
    {
        if ($passwordRequestedAt === null) {
            return false;        
        }
        
        $now = new \DateTime();
        $interval = $now->getTimestamp() - $passwordRequestedAt->getTimestamp();

        if ($interval > 600) {
            return false;
        }
        return true;
    }

    /**
     * @Route("/api/{id<\d+>}/{token}", name="resetting")
     */
    public function resetting(Request $request, UserPasswordEncoderInterface $encoder, UserRepository $userRepository)
    {
        // we get JSON content from request
        $data = json_decode($request->getContent());
        $userId = $data->id;
        $user = $userRepository->find($userId);
        // user exist ?
        if (!$user) {
            return $this->json('Utilisateur inexistant.', 409);
        }  

        $token = $data->token;
        // access denied if : token null or DB token not equal to token used or token expired
        if ($user->getToken() === null || $token !== $user->getToken() || !$this->isRequestInTime($user->getPasswordRequestedAt()))
        {
            throw new AccessDeniedHttpException();
        }
        
        $password = $data->password;
        // Validate password strength
        $uppercase = preg_match('@[A-Z]@', $password);
        $lowercase = preg_match('@[a-z]@', $password);
        $number    = preg_match('@[0-9]@', $password);
        if(!$uppercase || !$lowercase || !$number || strlen($password) < 8) {
            return $this->json('Le mot de passe doit faire 8 caractères minimum et doit contenir au moins une majuscule et un chiffre.', 409);
        }
        $user->setPassword($encoder->encodePassword($user, $password)); 
        
        // reset token to null for not re-use
        $user->setToken(null);
        $user->setPasswordRequestedAt(null);

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        return $this->json("Votre mot de passe a été changé.");
    }
}