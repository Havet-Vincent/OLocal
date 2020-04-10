<?php

namespace App\Controller\Api;

use App\Repository\RegionRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ApiRegionsController extends AbstractController
{
    /**
     * @Route("/api/regions", name="get_regions")
     */
    public function getRegions(RegionRepository $regionRepository)
    {
        $regions=$regionRepository->findAll();
       
        return $this->json($regions, 200, [], ['groups' => 'regions_get']);
    }

}
