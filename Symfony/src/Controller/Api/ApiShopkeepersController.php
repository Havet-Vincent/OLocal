<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class ApiShopkeepersController extends AbstractController
{
    /**
     * @Route("/api/shopkeepers/{id<\d+>}", name="api_shopkeeper_by_id")
     */
    public function getShopkeeperInformations(Request $request, DenormalizerInterface $denormalizer, ValidatorInterface $validator, UserRepository $userRepository)
    {
        $data = json_decode($request->getContent());
        $user = $denormalizer->denormalize($data, User::class);

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

        // user doesn't exist ?
        $userId = $data->id;
        $userWanted = $userRepository->find($userId);
        if (!$userWanted){
            throw $this->createNotFoundException(sprintf(
                'Utilisateur inexistant.'));
        }

        return $this->json($userWanted, 200, [], ['groups' => 'user_get']);
    }

    /**
     * @Route("/api/shopkeepers/{id<\d+>}/delete", name="api_shopkeeper_delete")
     */
    public function deleteShopkeeper(Request $request, DenormalizerInterface $denormalizer, ValidatorInterface $validator, UserRepository $userRepository)
    {
        // translate json request
        $data = json_decode($request->getContent());
        $user = $denormalizer->denormalize($data, User::class);

        // validation/error
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

        // user doesn't exist ?
        $userId = $data->id;
        $userToRemove = $userRepository->find($userId);
        if (!$userToRemove){
            throw $this->createNotFoundException(sprintf(
                'Utilisateur inexistant.'));
        }

        // else : delete this user
        $em = $this->getDoctrine()->getManager();
        $em->remove($userToRemove);
        $em->flush();

        return $this->json('Utilisateur supprimé');
    }

}
