<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ApiShopkeepersController extends AbstractController
{
    /**
     * @Route("/api/shopkeepers", name="api_shopkeepers")
     */
    public function index()
    {
        return $this->render('api_shopkeepers/index.html.twig', [
            'controller_name' => 'ApiShopkeepersController',
        ]);
    }
}
