<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ApiLocalSuppliersController extends AbstractController
{
    /**
     * @Route("/api/local/suppliers", name="api_local_suppliers")
     */
    public function index()
    {
        return $this->render('api_local_suppliers/index.html.twig', [
            'controller_name' => 'ApiLocalSuppliersController',
        ]);
    }
}
