<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ApiCategoriesController extends AbstractController
{
    /**
     * @Route("/api/categories", name="api_categories")
     */
    public function index()
    {
        return $this->render('api_categories/index.html.twig', [
            'controller_name' => 'ApiCategoriesController',
        ]);
    }
}
