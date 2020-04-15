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

    public function __construct(ApiSirene $apiSirene)
    {
        $this->apiSirene=$apiSirene;
    }
    
    
    /**
     * @Route("/api/local/suppliers", name="api_local_suppliers")
     */
    public function index()
    {
        return $this->render('api_local_suppliers/index.html.twig', [
            'controller_name' => 'ApiLocalSuppliersController',
        ]);
    }

    /**
     * @Route("/api/localsuppliers/add", name="api_localsuppliers_add", methods="POST")
     */

    public function add (Request $request, RegionRepository $regionRepository, DenormalizerInterface $denormalizer, ValidatorInterface $validator, LocalSupplierRepository $localSupplierRepository)
    {
         // 1. On récupère le contenu JSON
         $dataRequest = json_decode($request->getContent());
         //dump($data);
        
        $localSupplier = $denormalizer->denormalize($dataRequest, LocalSupplier::class);
         
        //on valide l'entité 
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
        

         // on verifie si le produit n'exite pas déjà en base 
         $siret = $dataRequest->siret;
         if ($localSupplierRepository->findBy(['siret'=>$siret])){
             return $this->json('existe déjà', 409);
         }
        //siret pour tester 85218609700014
        
        $regionId = $dataRequest->region;
        $region = $regionRepository->find($regionId);
    
        //$response= new Response;
        $response=$this->apiSirene->getShopkeeperData($siret);
        
        //dd($response);
        $data = json_decode($response->getContent());
        //dd($data);

        $name=$data->etablissement->uniteLegale->denominationUniteLegale;
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
         
        //return $this->json($localSupplier, 200, [], ['groups' => 'add_local_supplier']);
        return $this->json('producteur ajouté',201);
    }
}
