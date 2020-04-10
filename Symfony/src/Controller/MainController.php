<?php

namespace App\Controller;

use App\Repository\RegionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="main")
     */
    public function index()
    {
        return $this->render('main/index.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }

    /**
     * @Route("/regions", name="get_regions")
     */
    public function getRegions(RegionRepository $regionRepository)
    {
        $regions=$regionRepository->findAll();
        dump ($regions);
        return $this->json($regions, 200, [], ['groups' => 'regions_get']);
    }
}
