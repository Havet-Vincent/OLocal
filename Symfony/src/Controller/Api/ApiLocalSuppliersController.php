<?php

namespace App\Controller\Api;

use App\Service\ApiSirene;
use App\Entity\LocalSupplier;
use App\Repository\RegionRepository;
use App\Repository\LocalSupplierRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class ApiLocalSuppliersController extends AbstractController
{
    private $apiSirene;
    // get our ApiSirene service
    public function __construct(ApiSirene $apiSirene)
    {
        $this->apiSirene=$apiSirene;
    }

    /**
     * @Route("/api/localsuppliers/add", name="api_localsuppliers_add", methods="POST")
     * @return JsonResponse add a local supplier in DB
     */
    public function add(Request $request, RegionRepository $regionRepository, DenormalizerInterface $denormalizer, ValidatorInterface $validator, LocalSupplierRepository $localSupplierRepository)
    {
        // we get the JSON Content
        $dataRequest = json_decode($request->getContent());
        
        $localSupplier = $denormalizer->denormalize($dataRequest, LocalSupplier::class);
         
        // entity validation
        $errors = $validator->validate($localSupplier);
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

        // we get the SIRET number
        $siret = filter_var($dataRequest->siret, FILTER_SANITIZE_NUMBER_INT);

        // we check the number of characters of the SIRET number
        if(!strlen($siret) === 14) {
            return $this->json('Entrez un numéro SIRET valide.', 409);
        }

        // we check if the SIRET number is already stored on the database
        if ($localSupplierRepository->findBy(['siret'=>$siret])){
            return $this->json('existe déjà', 409);
        }

        $regionId = filter_var($dataRequest->region, FILTER_SANITIZE_NUMBER_INT);
        $region = $regionRepository->find($regionId);
    
        // getting informations from external API Sirene
        $response = $this->apiSirene->getShopkeeperData($siret);      
        $data = json_decode($response->getContent());     

        // setting them
        $name=$data->etablissement->uniteLegale->denominationUniteLegale;
        if ($name === null) {
            $name = $data->etablissement->periodesEtablissement[0]->enseigne1Etablissement;
        }
        $postalCode=$data->etablissement->adresseEtablissement->codePostalEtablissement;
        $city = $data->etablissement->adresseEtablissement->libelleCommuneEtablissement;

        $localSupplier = New LocalSupplier;
        $localSupplier->setName($name);
        $localSupplier->setSiret($siret);
        $localSupplier->setPostalCode($postalCode);
        $localSupplier->setCity($city);
        $localSupplier->setRegion($region);
        $em=$this->getDoctrine()->getManager();
        $em->persist($localSupplier);
        $em->flush();
         
        return $this->json('Producteur local ajouté',201);
    }
}
