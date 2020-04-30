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
    // get our ApiSirene service
    public function __construct(ApiSirene $apiSirene)
    {
        $this->apiSirene=$apiSirene;
    }
    
    /**
     * @Route("/api/shopkeepers", name="api_shopkeeper_by_region_category", methods={"POST"})
     * @return JsonResponse list of shopkeepers by region and by category
     */
    public function getShopkeepersByRegionAndCategory(Request $request, UserRepository $userRepository)
    {
        // we get JSON content
        $data = json_decode($request->getContent());
        // setting as filters for custom query
        $regionId = $data->region;
        $categoryId = $data->category;
        $results = $userRepository->findByRegionAndCategory($regionId, $categoryId);

        return $this->json($results, 200, [], ['groups' => 'results_get']);
    }

    /**
     * @Route("/api/shopkeepers/{id<\d+>}", name="api_shopkeeper_by_id", methods={"POST"})
     * @return JsonResponse get informations for selected shopkeeper
     */
    public function getShopkeeperInformations(Request $request, DenormalizerInterface $denormalizer, ValidatorInterface $validator, UserRepository $userRepository)
    {
        // we get JSON content
        $data = json_decode($request->getContent());
        $user = $denormalizer->denormalize($data, User::class);

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
     * @return JsonResponse add a shopkeeper in DB
     */
    public function add(Request $request, RegionRepository $regionRepository, DenormalizerInterface $denormalizer, ValidatorInterface $validator, UserRepository $userRepository, UserPasswordEncoderInterface $encoder)
    {
        // we get JSON content
        $dataRequest = json_decode($request->getContent());  
        $newShop = $denormalizer->denormalize($dataRequest, User::class);
         
        // entity validation
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
        
        // SIRET number validation : 14 characters and not already exist
        $siret = filter_var($dataRequest->siret, FILTER_SANITIZE_NUMBER_INT);
        if(!strlen($siret) === 14) {
            return $this->json('Entrez un numéro SIRET valide.', 409);
        }
        if ($userRepository->findBy(['siret' => $siret])){
            return $this->json('Ce numéro SIRET est déjà utilisé.', 409);
        }
        
        // take region data from request
        $regionId = filter_var($dataRequest->region, FILTER_SANITIZE_NUMBER_INT);
        $region = $regionRepository->find($regionId);

        // take email data from request and validation : wrong value ? already exist ?
        $newEmail = filter_var($dataRequest->email, FILTER_SANITIZE_EMAIL);
        if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
            return $this->json("Cette adresse n'est pas valide", 409);
        }
        if ($userRepository->findBy(['email' => $newEmail])) {
            return $this->json('Cet email est déjà utilisé.', 409);
        }
    
        // take external API data from SIRET number
        $response = $this->apiSirene->getShopkeeperData($siret);
        $data = json_decode($response->getContent());

        // new Shopkeeper -> setting informations from request and external API
        $user = New User;

        $user->setEmail($newEmail);
        
        $password = $dataRequest->password;
        // Validate password strength
        $uppercase = preg_match('@[A-Z]@', $password);
        $lowercase = preg_match('@[a-z]@', $password);
        $number    = preg_match('@[0-9]@', $password);
        if(!$uppercase || !$lowercase || !$number || strlen($password) < 8) {
            return $this->json('Le mot de passe doit faire 8 caractères minimum et doit contenir au moins une majuscule et un chiffre.', 409 );
        }
        $user->setPassword($encoder->encodePassword($user, $password));    

        $role = ['ROLE_SHOPKEEPER'];
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

        $user->setLogoPicture('/uploads/avatars/no-avatar.png');

        $em=$this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
         
        return $this->json('Utilisateur-commerçant ajouté', 201);
    }

    /**
     * @Route("/api/shopkeepers/{id<\d+>}/edit", name="api_shopkeeper_edit", methods={"POST"})
     * @return JsonResponse edit a shopkeeper's row
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
        $userId = filter_var($data->id, FILTER_SANITIZE_NUMBER_INT);
        $userToEdit = $userRepository->find($userId);
        if (!$userToEdit){
            return $this->json('Utilisateur inexistant.', 409);
        }

        // else : edit this user
        $em = $this->getDoctrine()->getManager();

        $newEmail = filter_var($data->email, FILTER_SANITIZE_EMAIL);
        if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
            return $this->json("Cette adresse n'est pas valide", 409);
        }
        if ($newEmail !== $userToEdit->getEmail()) {
            $userToEdit->setEmail($newEmail);
        }

        $firstname = filter_var($data->firstname, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
        if ($firstname !== $userToEdit->getFirstname()) {
            $userToEdit->setFirstname($firstname);
        }

        $lastname = filter_var($data->lastname, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
        if ($lastname !== $userToEdit->getLastname()) {
            $userToEdit->setLastname($lastname);
        }

        if ($data->password) {
            // Validate password strength
            $uppercase = preg_match('@[A-Z]@', $data->password);
            $lowercase = preg_match('@[a-z]@', $data->password);
            $number    = preg_match('@[0-9]@', $data->password);
            if(!$uppercase || !$lowercase || !$number || strlen($data->password) < 8) {
                return $this->json('Le mot de passe doit faire 8 caractères minimum et doit contenir au moins une majuscule et un chiffre.', 409 );
            }
            $userToEdit->setPassword($encoder->encodePassword($userToEdit, $data->password));
        }

        $companyDescription = filter_var($data->companyDescription, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
        if ($companyDescription !== $userToEdit->getCompanyDescription()) {
            $userToEdit->setCompanyDescription($companyDescription);
        }

        if ($data->logoPicture !== $userToEdit->getLogoPicture()) {
            $extension = explode('/', mime_content_type($data->logoPicture))[1];
            // image's extension validation
            if ($extension == 'jpg' || $extension == 'jpeg' || $extension == 'png') {
                $newFilename = 'avatarId'.$userId.uniqid().'.'.$extension;

                $img = explode(',', $data->logoPicture)[1];

                $newPicture = base64_decode($img);

                // Move the file to the directory where avatars are stored
                if ($newPicture && $userToEdit->getLogoPicture() != '/uploads/avatars/no-avatar.png') {
                    unlink(substr($userToEdit->getLogoPicture(), 1));
                    file_put_contents('uploads/avatars/'.$newFilename, $newPicture);
                } elseif ($userToEdit->getLogoPicture() == '/uploads/avatars/no-avatar.png') {
                    file_put_contents('uploads/avatars/'.$newFilename, $newPicture);
                } else {
                    return $this->json("Erreur lors de l'envoi d'image.", 409);
                }
                $userToEdit->setLogoPicture('/uploads/avatars/'.$newFilename);
            } else {
                return $this->json("Format d'image non autorisée.", 409);
            }
        } elseif ($data->logoPicture == '') {
            $user->setLogoPicture('/uploads/avatars/no-avatar.png');
        }

        $phone = filter_var($data->phone, FILTER_SANITIZE_STRING);
        if ($phone !== $userToEdit->getPhone()) {
            $userToEdit->setPhone($phone);
        }

        $website = filter_var($data->website, FILTER_SANITIZE_URL);
        if ($website !== $userToEdit->getWebsite()) {
            if ($website === '') {
                $userToEdit->setWebsite(null);
            }
            $urlComponents = parse_url($website);
            if (isset($urlComponents["scheme"])) {
                $userToEdit->setWebsite($website);
            } else {
                $userToEdit->setWebsite('http://'.$website);
            }   
        }

        $contact = filter_var($data->contact, FILTER_SANITIZE_EMAIL);
        if ($contact !== $userToEdit->getContact()) {
            $userToEdit->setContact($contact);
        }

        $userToEdit->setUpdatedAt(new \DateTime());

        $em->persist($userToEdit);
        $em->flush();

        return $this->json('Informations mises à jour.');
    }

    /**
     * @Route("/api/shopkeepers/{id<\d+>}/delete", name="api_shopkeeper_delete", methods={"DELETE"})
     * @return JsonResponse delete a shopkeeper's row
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
        $userId = filter_var($data->id, FILTER_SANITIZE_NUMBER_INT);
        $userToRemove = $userRepository->find($userId);
        if (!$userToRemove){
            return $this->json('Utilisateur inexistant.', 409);
        }

        // else : delete this user
        $em = $this->getDoctrine()->getManager();
        $em->remove($userToRemove);
        $em->flush();

        return $this->json('Utilisateur supprimé');
    }

}
