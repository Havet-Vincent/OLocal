<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ApiProductsController extends AbstractController
{
    /**
     * @Route("/api/products", name="api_products")
     */
    public function index()
    {
        return $this->render('api_products/index.html.twig', [
            'controller_name' => 'ApiProductsController',
        ]);
    }
}
