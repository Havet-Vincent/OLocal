<?php

namespace App\Controller\Api;

use App\Entity\Category;
use App\Repository\ProductRepository;
use App\Repository\CategoryRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ApiCategoriesController extends AbstractController
{
    /**
     * @Route("/api/categories", name="get_categories", methods={"GET"})
     */
    public function getCategories(CategoryRepository $categoryRepository)
    {
        $categories=$categoryRepository->findAll();
        
        return $this->json($categories, 200, [], ['groups' => 'categories_get']);
    }

    /**
     * @Route("/api/categories/{id<\d+>}/products", name="get_products_by_category", methods={"GET"})
     */
    public function getProductsByCategory (Category $category)
    
    {
        dump($category);
        
        return $this->json($category, 200, [], ['groups'=>'get_products']);
    }


}
