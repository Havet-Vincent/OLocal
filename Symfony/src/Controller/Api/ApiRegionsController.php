<?php

namespace App\Controller\Api;

use App\Entity\LocalSupplier;
use App\Entity\Region;
use App\Repository\LocalSupplierRepository;
use App\Repository\RegionRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ApiRegionsController extends AbstractController
{
    /**
     * @Route("/api/regions", name="get_regions", methods={"GET"})
     */
    public function getRegions(RegionRepository $regionRepository)
    {
        $regions=$regionRepository->findAll();
       
        return $this->json($regions, 200, [], ['groups' => 'regions_get']);
    }

    /**
     * @Route("/api/regions/{id<\d+>}/localsuppliers", name="get_local_by_region")
     * 
     * @return list of local suppliers for one region
     */
    public function getLocalSuppliersByRegion(Region $region = null, LocalSupplierRepository $localSupplierRepository)
    {      
        $regionId = $region->getId();
        $localSupplierByRegion = $localSupplierRepository->findBy(['region' => $regionId]);
        return $this->json($localSupplierByRegion, 200, [], ['groups' => 'local_by_region_get']);
    }

}
