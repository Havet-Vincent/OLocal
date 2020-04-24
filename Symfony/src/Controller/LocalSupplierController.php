<?php

namespace App\Controller;

use App\Service\ApiSirene;
use App\Entity\LocalSupplier;
use App\Repository\LocalSupplierRepository;
use App\Repository\RegionRepository;
use EasyCorp\Bundle\EasyAdminBundle\Controller\EasyAdminController;

class LocalSupplierController extends EasyAdminController
{
    private $apiSirene;
    // get our ApiSirene service and useful repositories
    public function __construct(ApiSirene $apiSirene, RegionRepository $regionRepository, LocalSupplierRepository $localSupplierRepository)
    {
        $this->apiSirene=$apiSirene;
        $this->regionRepository = $regionRepository;
        $this->localSupplierRepository = $localSupplierRepository;
    }

    /**
     * Override native EasyAdmin add action for User LocalSupplier
     * Add a local supplier with external API Sirene
     *  in the Back-Office
     */
    public function persistLocalSupplierEntity()
    {
        $regionId = filter_var($_POST["localsupplier"]['region'], FILTER_SANITIZE_NUMBER_INT);
        $region = $this->regionRepository->find($regionId);

        $siret = filter_var($_POST["localsupplier"]['siret'], FILTER_SANITIZE_NUMBER_INT);
        // we check the number of charters of the siret number
        if(!strlen($siret) === 14) {
            throw new \Exception('Entrez un numéro SIRET valide.');
        }

        // we check if the siret number is already stored on the database
        if ($this->localSupplierRepository->findBy(['siret' => $siret])){
            throw new \Exception('Ce numéro de SIRET est déjà utilisé.');
        }

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
