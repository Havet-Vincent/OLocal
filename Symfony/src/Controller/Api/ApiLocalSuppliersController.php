<?php

namespace App\Controller\Api;

use App\Service\ApiSirene;
use App\Entity\LocalSupplier;
use App\Repository\RegionRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
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
     * @Route("/api/test", name="test", methods="GET")
     */

    public function testApi (Request $request, RegionRepository $regionRepository)
    {
        //siret pour tester 85218609700014
        $siretRequest = json_decode($request->getContent());
        $siret = $siretRequest->siret;

        $regionId = $siretRequest->region;
        $region = $regionRepository->find($regionId);
        // On l'associe au produit
      

        //$response= new Response;
        $response=$this->apiSirene->getShopkeeperData($siret);
        //dd($response);
        $data = json_decode($response->getContent());
        //dd($data);

        $name=$data->etablissement->uniteLegale->denominationUniteLegale;
        $postalCode=$data->etablissement->adresseEtablissement->codePostalEtablissement;
        $city = $data->etablissement->adresseEtablissement->libelleCommuneEtablissement;
        $localSupplier=New LocalSupplier;
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
