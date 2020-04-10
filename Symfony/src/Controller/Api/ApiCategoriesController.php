<?php

namespace App\Controller\Api;

use App\Repository\CategoryRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ApiCategoriesController extends AbstractController
{
    /**
     * @Route("/api/categories", name="get_categories")
     */
    public function getCategories(CategoryRepository $categoryRepository)
    {
        $categories=$categoryRepository->findAll();
        
        return $this->json($categories, 200, [], ['groups' => 'categories_get']);
    }
}
