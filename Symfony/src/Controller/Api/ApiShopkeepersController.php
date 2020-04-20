<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Service\ApiSirene;
use App\Repository\UserRepository;
use App\Repository\RegionRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class ApiShopkeepersController extends AbstractController
{
    private $apiSirene;

    public function __construct(ApiSirene $apiSirene)
    {
        $this->apiSirene=$apiSirene;
    }
    
    /**
     * @Route("/api/shopkeepers", name="api_shopkeeper_by_region_category", methods={"POST"})
     */
    public function getShopkeepersByRegionAndCategory(Request $request, UserRepository $userRepository)
    {
        $data = json_decode($request->getContent());

        $regionId = $data->region;
        $categoryId = $data->category;
        $results = $userRepository->findByRegionAndCategory($regionId, $categoryId);

        return $this->json($results, 200, [], ['groups' => 'results_get']);
    }


    /**
     * @Route("/api/shopkeepers/{id<\d+>}", name="api_shopkeeper_by_id", methods={"POST"})
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
     * @Route("/api/shopkeepers/add", name="api_shopkeeper_add", methods={"POST"})
     */
    public function add(Request $request, RegionRepository $regionRepository, DenormalizerInterface $denormalizer, ValidatorInterface $validator, UserRepository $userRepository, UserPasswordEncoderInterface $encoder)
    {
        $dataRequest = json_decode($request->getContent());
        
        $newShop = $denormalizer->denormalize($dataRequest, User::class);
         
        $errors = $validator->validate($newShop);
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
        
        $siret = $dataRequest->siret;
        if ($userRepository->findBy(['siret' => $siret])){
            return $this->json('Ce numéro de SIRET est déjà utilisé.', 409);
         }
        //siret pour tester 85218609700014
        
        // take region data from request
        $regionId = $dataRequest->region;
        $region = $regionRepository->find($regionId);

        // take email data from request
        $newEmail = $dataRequest->email;
        if ($userRepository->findBy(['email' => $newEmail])) {
            return $this->json('Cet email est déjà utilisé.', 409);
        }
    
        // take external API data from SIRET number
        $response = $this->apiSirene->getShopkeeperData($siret);
        $data = json_decode($response->getContent());


        $user = New User;

        $user->setEmail($newEmail);

        $password = $dataRequest->password;
        $user->setPassword($encoder->encodePassword($user, $password));

        $role = ['ROLE_USER'];
        $user->setUserRole($role);

        // TODO : implements email check
        $user->setIsEmailChecked(true);

        $user->setIsActive(true);

        $additionnalAddress = $data->etablissement->adresseEtablissement->complementAdresseEtablissement;
        $user->setAdditionalAddress($additionnalAddress);

        $repeatIndex = $data->etablissement->adresseEtablissement->indiceRepetitionEtablissement;
        $user->setRepeatIndex($repeatIndex);

        $wayNumber = $data->etablissement->adresseEtablissement->numeroVoieEtablissement;
        $user->setWayNumber($wayNumber);

        $wayType = $data->etablissement->adresseEtablissement->typeVoieEtablissement;
        $user->setWayType($wayType);

        $wayName = $data->etablissement->adresseEtablissement->libelleVoieEtablissement;
        $user->setWayName($wayName);
        
        $postalCode = $data->etablissement->adresseEtablissement->codePostalEtablissement;
        $user->setPostalCode($postalCode);

        $city = $data->etablissement->adresseEtablissement->libelleCommuneEtablissement;
        $user->setCity($city);

        $company = $data->etablissement->uniteLegale->denominationUniteLegale;
        if ($company === null) {
            $company = $data->etablissement->periodesEtablissement[0]->enseigne1Etablissement;
        }
        $user->setCompanyName($company);

        $user->setSiret($siret);

        $user->setRegion($region);

        $user->setCreatedAt(new \DateTime());

        $em=$this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
         
        return $this->json('Utilisateur-commerçant ajouté', 201);
    }

    /**
     * @Route("/api/shopkeepers/{id<\d+>}/edit", name="api_shopkeeper_edit", methods={"POST"})
     */
    public function editShopkeeper(Request $request, DenormalizerInterface $denormalizer, ValidatorInterface $validator, UserRepository $userRepository, UserPasswordEncoderInterface $encoder)
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
        if ($newEmail === $userRepository->findBy(['email' => $newEmail])) {
            throw $this->createNotFoundException(sprintf(
                'Adresse mail déjà utilisée.'));
        }
        if ($newEmail !== $userToEdit->getEmail()) {
            $userToEdit->setEmail($newEmail);
        }
        if ($data->firstname !== $userToEdit->getFirstname()) {
            $userToEdit->setFirstname($data->firstname);
        }
        if ($data->lastname !== $userToEdit->getLastname()) {
            $userToEdit->setLastname($data->lastname);
        }
        if ($data->password) {
            $userToEdit->setPassword($encoder->encodePassword($userToEdit, $data->password));
        }
        if ($data->companyDescription !== $userToEdit->getCompanyDescription()) {
            $userToEdit->setCompanyDescription($data->companyDescription);
        }
        if ($data->logoPicture !== null) {

            $extension = explode('/', mime_content_type($data->logoPicture))[1];
            $newFilename = 'avatarId'.$userId.'.'.$extension;

            $img = explode(',', $data->logoPicture)[1];

            $newPicture = base64_decode($img);

            // Move the file to the directory where avatars are stored
            if ($newPicture) {
                file_put_contents('uploads/avatars/'.$newFilename, $newPicture);
            } else {
                return $this->json('Erreur lors de l\'envoi d\'image.');
            }
            $userToEdit->setLogoPicture('/uploads/avatars/'.$newFilename);
        }
        if ($data->phone !== $userToEdit->getPhone()) {
            $userToEdit->setPhone($data->phone);
        }
        if ($data->website !== $userToEdit->getWebsite()) {
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
        $userId = $data->user;
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
