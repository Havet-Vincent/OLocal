<?php

namespace App\Controller\Api;

use App\Entity\Region;
use App\Repository\RegionRepository;
use App\Repository\LocalSupplierRepository;
use Symfony\Component\HttpFoundation\Request;
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
     * @Route("/api/regions/{id<\d+>}/localsuppliers", name="get_local_by_region", methods={"POST"})
     * 
     * @return list of local suppliers for one region
     */
    public function getLocalSuppliersByRegion(Request $request, LocalSupplierRepository $localSupplierRepository)
    {      
        $dataRequest = json_decode($request->getContent());
        $regionId = $request->region;
        $localSupplierByRegion = $localSupplierRepository->findBy(['region' => $regionId]);
        return $this->json($localSupplierByRegion, 200, [], ['groups' => 'local_by_region_get']);
    }

}
