<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    private $homepage = 'http://olocal.dscloud.me/';
    
    /**
     * @Route("/api/login_id", name="login_id", methods={"POST"})
     */
    public function login_id(Request $request, UserRepository $userRepository, DenormalizerInterface $denormalizer, ValidatorInterface $validator)
    {
        $dataRequest = json_decode($request->getContent());       
        $user = $denormalizer->denormalize($dataRequest, User::class);

        // entity validation
        $errors = $validator->validate($user);
        if (count($errors) !== 0) {
            $jsonErrors = [];
            foreach ($errors as $error) {
                $jsonErrors[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage(),
                ];
            }
 
            return $this->json($jsonErrors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // check if user exist -> get this user's object from DB
        $email = filter_var($dataRequest->username, FILTER_SANITIZE_EMAIL);
        if($userRepository->findOneBy(['email' => $email]) == null) {
            return $this->json('Utilisateur inexistant.', 409);
        }
        $loginUser = $userRepository->findOneBy(['email' => $email]);

        return $this->json($loginUser, 200, [], ['groups' => 'user_login']);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    /**
     * @Route("/app_login", name="app_login", methods={"GET", "POST"})
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        if ($this->getUser()) {
             return $this->redirectToRoute('easyadmin');
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', [
            'last_username' => $lastUsername, 
            'error' => $error,
            ]);
    }

    /**
     * @Route("/", name="home")
     * Redirect to the front-page
     */
    public function homepage()
    {
        return $this->redirect($this->homepage);
    }
}