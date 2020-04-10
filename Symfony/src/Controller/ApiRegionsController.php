<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ApiRegionsController extends AbstractController
{
    /**
     * @Route("/api/regions", name="api_regions")
     */
    public function index()
    {
        return $this->render('api_regions/index.html.twig', [
            'controller_name' => 'ApiRegionsController',
        ]);
    }
}
