<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\ApiSirene;
use App\Repository\UserRepository;
use App\Repository\RegionRepository;
use EasyCorp\Bundle\EasyAdminBundle\Controller\EasyAdminController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends EasyAdminController
{
    private $apiSirene;

    public function __construct(ApiSirene $apiSirene, UserRepository $userRepository, RegionRepository $regionRepository, UserPasswordEncoderInterface $encoder)
    {
        $this->apiSirene = $apiSirene;
        $this->userRepository = $userRepository;
        $this->regionRepository = $regionRepository;
        $this->encoder = $encoder;
    }

    /**
     * Override native EasyAdmin add action for User Entity
     * Add a user with external API Sirene for shopkeepers only
     *  in the Back-Office
     */
    public function persistUserEntity()
    {        
        if ($_POST["user"]['siret']) {
            // take region data from request
            $regionId = filter_var($_POST["user"]['region'], FILTER_SANITIZE_NUMBER_INT);
            $region = $this->regionRepository->find($regionId);

            $siret = filter_var($_POST["user"]['siret'], FILTER_SANITIZE_NUMBER_INT);
            // we check the number of charters of the siret number
            if(!strlen($siret) === 14) {
                throw new \Exception('Entrez un numéro SIRET valide.');
            }

            // we check if the siret number is already stored on the database
            if ($this->userRepository->findBy(['siret' => $siret])){
                throw new \Exception('Ce numéro de SIRET est déjà utilisé.');
            }

            // take email data from request
            $newEmail = filter_var($_POST["user"]['email'], FILTER_SANITIZE_EMAIL);
            if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
                throw new \Exception("Cette adresse n'est pas valide");
            }
            if ($this->userRepository->findBy(['email' => $newEmail])) {
                throw new \Exception('Cet email est déjà utilisé.');
            }
        
            // take external API data from SIRET number
            $response = $this->apiSirene->getShopkeeperData($siret);
            $data = json_decode($response->getContent());

            $user = New User;

            $user->setEmail($newEmail);

            $password = $_POST["user"]['password'];
            // Validate password strength
            $uppercase = preg_match('@[A-Z]@', $password);
            $lowercase = preg_match('@[a-z]@', $password);
            $number    = preg_match('@[0-9]@', $password);
            if(!$uppercase || !$lowercase || !$number || strlen($password) < 8) {
                throw new \Exception('Le mot de passe doit faire 8 caractères minimum et doit contenir au moins une majuscule et un chiffre.');
            }            
            $user->setPassword($this->encoder->encodePassword($user, $password));

            if (array_key_exists('isEmailChecked', $_POST["user"])) {
                $isEmailChecked = $_POST["user"]['isEmailChecked'];
            } else {
                $isEmailChecked = false;
            }
            $user->setIsEmailChecked($isEmailChecked);
    
            if (array_key_exists('isActive', $_POST["user"])) {
                $isActive = $_POST["user"]['isActive'];
            } else {
                $isActive = false;
            }
            $user->setIsActive($isActive);
    
            if (array_key_exists('userRole', $_POST["user"])) {
                $role = $_POST["user"]['userRole'][0];
            } else {
                $role = 'ROLE_USER';
            }
            $user->setUserRole([$role]);

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

            $user->setLogoPicture('uploads/avatars/no-avatar.png');

            $em=$this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            
            return $this->addFlash('success', 'Utilisateur ajouté');;
        }

        $newUser = new User;

        $email = filter_var($_POST["user"]['email'], FILTER_SANITIZE_EMAIL);
        if ($this->userRepository->findBy(['email' => $email])) {
                throw new \Exception('Email déjà utilisé');;
            }
        $newUser->setEmail($email);

        $password = $_POST["user"]['password'];
        // Validate password strength
        $uppercase = preg_match('@[A-Z]@', $password);
        $lowercase = preg_match('@[a-z]@', $password);
        $number    = preg_match('@[0-9]@', $password);
        if(!$uppercase || !$lowercase || !$number || strlen($password) < 8) {
            throw new \Exception('Le mot de passe doit faire 8 caractères minimum et doit contenir au moins une majuscule et un chiffre.');
        }
        $newUser->setPassword($this->encoder->encodePassword($newUser, $password));  
        
        if (array_key_exists('isEmailChecked', $_POST["user"])) {
            $isEmailChecked = $_POST["user"]['isEmailChecked'];
        } else {
            $isEmailChecked = false;
        }
        $newUser->setIsEmailChecked($isEmailChecked);

        if (array_key_exists('isActive', $_POST["user"])) {
            $isActive = $_POST["user"]['isActive'];
        } else {
            $isActive = false;
        }
        $newUser->setIsActive($isActive);

        if (array_key_exists('userRole', $_POST["user"]) 
            && ($_POST["user"]['userRole'][0] === 'ROLE_SHOPKEEPER'
            || $_POST["user"]['userRole'][0] === 'ROLE_ADMIN')) {
            $role = $_POST["user"]['userRole'][0];
        } else {
            $role = 'ROLE_USER';
        }
        $newUser->setUserRole([$role]);

        $newUser->setLogoPicture('uploads/avatars/no-avatar.png');

        $em=$this->getDoctrine()->getManager();
        $em->persist($newUser);
        $em->flush();
            
        return $this->addFlash('success', 'Utilisateur ajouté');
    }

    /**
     * Override native EasyAdmin edit action for User Entity
     * Edit a user
     *  in the Back-Office
     */
    public function updateUserEntity ($entity)
    {
        $userId = filter_var($entity->getId(), FILTER_SANITIZE_NUMBER_INT);
        $user = $this->userRepository->find($userId);
        
        $em = $this->getDoctrine()->getManager();

        $newEmail = filter_var($entity->getEmail(), FILTER_SANITIZE_EMAIL);
        if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
            throw new \Exception("Cette adresse n'est pas valide");
        }
        if ($newEmail !== $user->getEmail()) {   
            $user->setEmail($newEmail);     
        }

        if (array_key_exists(0, $entity->getUserRole())) {
            $role = $entity->getUserRole()[0];
        } else {
            $role = 'ROLE_USER';
        }
        $user->setUserRole([$role]);

        $firstname = filter_var($entity->getFirstname(), FILTER_SANITIZE_STRING);
        if ($firstname !== $user->getFirstname()) {
            $user->setFirstname($firstname);
        }
        $lastname = filter_var($entity->getLastname(), FILTER_SANITIZE_STRING);
        if ($lastname !== $user->getLastname()) {
            $user->setLastname($lastname);
        }
        $companyName = filter_var($entity->getCompanyName(), FILTER_SANITIZE_STRING);
        if ($companyName !== $user->getCompanyName()) {
            $user->setCompanyName($companyName);
        }
        $companyDescription = filter_var($entity->getCompanyDescription(), FILTER_SANITIZE_STRING);
        if ($companyDescription !== $user->getCompanyDescription()) {
            $user->setCompanyDescription($companyDescription);
        }
        $additionalAddress = filter_var($entity->getAdditionalAddress(), FILTER_SANITIZE_STRING);
        if ($additionalAddress !== $user->getAdditionalAddress()) {
            $user->setAdditionalAddress($additionalAddress);
        }
        $repeatIndex = filter_var($entity->getRepeatIndex(), FILTER_SANITIZE_STRING);
        if ($repeatIndex !== $user->getRepeatIndex()) {
            $user->setRepeatIndex($repeatIndex);
        }
        $wayNumber = filter_var($entity->getWayNumber(), FILTER_SANITIZE_NUMBER_INT);
        if ($wayNumber === "") {
            $wayNumber = null;
        }
        if ($wayNumber !== $user->getWayNumber()) {
            $user->setWayNumber($wayNumber);
        }
        $wayType = filter_var($entity->getWayType(), FILTER_SANITIZE_STRING);
        if ($wayType !== $user->getWayType()) {
            $user->setWayType($wayType);
        }
        $wayName = filter_var($entity->getWayName(), FILTER_SANITIZE_STRING);
        if ($wayName !== $user->getWayName()) {
            $user->setWayName($wayName);
        }
        $postalCode = filter_var($entity->getPostalCode(), FILTER_SANITIZE_NUMBER_INT);
        if ($postalCode === "") {
            $postalCode = null;
        }
        if ($postalCode !== $user->getPostalCode()) {
            $user->setPostalCode($postalCode);
        }
        $city = filter_var($entity->getCity(), FILTER_SANITIZE_STRING);
        if ($city !== $user->getCity()) {
            $user->setCity($city);
        }      
        if ($entity->getLogoPicture() == null) {
            $user->setLogoPicture('uploads/avatars/no-avatar.png');
        }
        $phone = filter_var($entity->getPhone(), FILTER_SANITIZE_STRING);
        if ($phone !== $user->getPhone()) {
            $user->setPhone($phone);
        }
        $website= filter_var($entity->getWebsite(), FILTER_SANITIZE_URL);
        if ($website !== $user->getWebsite()) {
            $user->setWebsite($website);
        }
        $user->setUpdatedAt(new \DateTime());

        $em->persist($user);
        $em->flush();

        return $this->addFlash('success', 'Modifications appliquées');
    }
}
