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

    public function persistUserEntity()
    {        
        if ($_POST["user"]['siret']) {

            $siret = $_POST["user"]['siret'];

            // take region data from request
            $regionId = $_POST["user"]['region'];
            $region = $this->regionRepository->find($regionId);

            if ($this->userRepository->findBy(['siret' => $siret])){
                throw new \Exception('Ce numéro de SIRET est déjà utilisé.');
            }
            //siret pour tester 85218609700014            

            // take email data from request
            $newEmail = $_POST["user"]['email'];

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
            
            return $user;
        }

        $newUser = new User;

        $email = $_POST["user"]['email'];
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
            
        return $newUser;
    }

    public function updateUserEntity ($entity)
    {
       //dd($entity);
        $userId = $entity->getId();
        $user = $this->userRepository->find($userId);
        
        // else : edit this user
        $em = $this->getDoctrine()->getManager();

        $newEmail = $entity->getEmail();

        if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
            throw new \Exception("Cette adresse n'est pas valide");
        }

        if ($newEmail === $this->userRepository->findBy(['email' => $newEmail])) {
            throw new \Exception('Email déjà utilisé');
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

        if ($entity->getFirstname() !== $user->getFirstname()) {
            $user->setFirstname($entity->getFirstname());
        }
        if ($entity->getLastname() !== $user->getLastname()) {
            $user->setLastname($entity->getLastname());
        }
        if ($entity->getCompanyName() !== $user->getCompanyName()) {
            $user->setCompany($entity->getCompany());
        }
        if ($entity->getCompanyDescription() !== $user->getCompanyDescription()) {
            $user->setCompanyDescription($entity->getCompanyDescription());
        }
        if ($entity->getAdditionalAddress() !== $user->getAdditionalAddress()) {
            $user->setAdditionalAddress($entity->getAdditionalAddress());
        }
        if ($entity->getRepeatIndex() !== $user->getRepeatIndex()) {
            $user->setRepeatIndex($entity->getRepeatIndex());
        }
        if ($entity->getWayNumber() !== $user->getWayNumber()) {
            $user->setWayNumber($entity->getWayNumber());
        }
        if ($entity->getWayType() !== $user->getWayType()) {
            $user->setWayType($entity->getWayType());
        }
        if ($entity->getWayName() !== $user->getWayName()) {
            $user->setWayName($entity->getWayName());
        }
        if ($entity->getPostalCode() !== $user->getPostalCode()) {
            $user->setPostalCode($entity->getPostalCode());
        }
        if ($entity->getCity() !== $user->getCity()) {
            $user->setCity($entity->getCity());
        }      
        if ($entity->getLogoPicture() == null) {
            $user->setLogoPicture('uploads/avatars/no-avatar.png');
        }
        if ($entity->getPhone() !== $user->getPhone()) {
            $user->setPhone($entity->getPhone());
        }
        if ($entity->getWebsite() !== $user->getWebsite()) {
            $user->setWebsite($entity->getWebsite());
        }
        $user->setUpdatedAt(new \DateTime());

        $em->persist($user);
        $em->flush();

        return $user;
    }
}
