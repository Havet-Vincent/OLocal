<?php

namespace App\Controller;

use App\Entity\Region;
use App\Service\ApiSirene;
use App\Entity\LocalSupplier;
use App\Repository\RegionRepository;
use Symfony\Component\Routing\Annotation\Route;
use EasyCorp\Bundle\EasyAdminBundle\Controller\EasyAdminController;

class LocalSupplierController extends EasyAdminController
{
    private $apiSirene;

    public function __construct(ApiSirene $apiSirene, RegionRepository $regionRepository)
    {
        $this->apiSirene=$apiSirene;
        $this->regionRepository = $regionRepository;
    }

    public function persistLocalSupplierEntity()
    {
        $siret = $_POST["localsupplier"]['siret'];

        $regionId = $_POST["localsupplier"]['region'];
        $region = $this->regionRepository->find($regionId);

        $response=$this->apiSirene->getShopkeeperData($siret);        
        $data = json_decode($response->getContent());

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
         
        return $localSupplier;
    }
}
