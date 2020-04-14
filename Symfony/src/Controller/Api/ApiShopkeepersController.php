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
     * @Route("/api/shopkeepers", name="api_shopkeeper_by_region_category", methods={"GET"})
     */
    public function getShopkeepersByRegionAndCategory(Request $request, ValidatorInterface $validator, UserRepository $userRepository)
    {
        $data = json_decode($request->getContent());
        //dd($data);

        $regionId = $data->region;
        $categoryId = $data->category;
        $results = $userRepository->findByRegionAndCategory($regionId, $categoryId);

        return $this->json($results, 200, [], ['groups' => 'results_get']);
    }


    /**
     * @Route("/api/shopkeepers/{id<\d+>}", name="api_shopkeeper_by_id", methods={"GET"})
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
     * @Route("/api/shopkeepers/{id<\d+>}/edit", name="api_shopkeeper_edit", methods={"POST"})
     */
    public function editShopkeeper(Request $request, DenormalizerInterface $denormalizer, ValidatorInterface $validator, UserRepository $userRepository)
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
        $userToEdit = $userRepository->find($userId);
        if (!$userToEdit){
            throw $this->createNotFoundException(sprintf(
                'Utilisateur inexistant.'));
        }

        // else : edit this user
        $em = $this->getDoctrine()->getManager();

        $newEmail = $data->email;
        if ($userRepository->findBy(['email' => $newEmail])) {
            throw $this->createNotFoundException(sprintf(
                'Adresse mail déjà utilisée.'));
        }
        if ($data->email !== $userToEdit->getEmail()) {
            $userToEdit->setEmail($newEmail);
        }
        if ($data->firstname !== $userToEdit->getFirstname()) {
            $userToEdit->setFirstname($data->firstname);
        }
        if ($data->lastname !== $userToEdit->getLastname()) {
            $userToEdit->setLastname($data->lastname);
        }
        if ($data->password !== $userToEdit->getPassword()) {
            $userToEdit->setPassword($data->password);
        }
        if ($data->logoPicture !== $userToEdit->getLogoPicture()) {
            $userToEdit->setLogoPicture('/public/uploads/'.$data->logoPicture);
        }
        if ($data->phone !== $userToEdit->getLastname()) {
            $userToEdit->setPhone($data->phone);
        }
        if ($data->webiste !== $userToEdit->getWebsite()) {
            $userToEdit->setWebsite($data->website);
        }
        $userToEdit->setUpdatedAt(new \DateTime());

        $em->persist($userToEdit);
        $em->flush();

        return $this->json('Informations mises à jour.');
    }

    /**
     * @Route("/api/shopkeepers/{id<\d+>}/delete", name="api_shopkeeper_delete", methods={"DELETE"})
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
