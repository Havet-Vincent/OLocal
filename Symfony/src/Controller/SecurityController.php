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

class SecurityController extends AbstractController
{
    /**
     * @Route("/api/login_id", name="login_id", methods={"POST"})
     */
    public function login_id(Request $request, UserRepository $userRepository, DenormalizerInterface $denormalizer, ValidatorInterface $validator)
    {
        $dataRequest = json_decode($request->getContent());
        
        $user = $denormalizer->denormalize($dataRequest, User::class);

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

        $email = $dataRequest->username;
        
        if($userRepository->findOneBy(['email' => $email]) == null) {
            throw $this->createNotFoundException(sprintf('Utilisateur inexistant.'));
        }
        
        $loginUser = $userRepository->findOneBy(['email' => $email]);

        return $this->json($loginUser, 200, [], ['groups' => 'user_login']);
    }

    /**
     * @Route("/logout", name="app_logout", methods={"GET"})
     */
    public function logout()
    {
        // controller can be blank: it will never be executed!
        throw new \Exception('Don\'t forget to activate logout in security.yaml');
    }
}