<?php

namespace App\Controller\Api;

use App\Entity\Catalog;
use App\Entity\Product;
use App\Form\ProductType;
use App\Repository\UserRepository;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\LocalSupplierRepository;
use App\Repository\ProductRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class ApiProductsController extends AbstractController
{
    /**
     * @Route("/api/products", name="api_products", methods={"GET"})
     */
    public function index()
    {
        return $this->json([]);
    }

    /**
     * @Route("/api/products/add", name="api_products_add", methods={"POST"})
     */
    public function add (Request $request, ProductRepository $productRepository, CategoryRepository $categoryRepository, UserRepository $userRepository,LocalSupplierRepository $localSupplierRepository, EntityManagerInterface $em, ValidatorInterface $validator, DenormalizerInterface $denormalizer)
    {
         
        // 1. On récupère le contenu JSON
        $data = json_decode($request->getContent());

        $product = $denormalizer->denormalize($data->product, Product::class);
        
        //on valide l'entité 
        $errors = $validator->validate($product);
        if (count($errors) !== 0) {
            $jsonErrors = [];
            foreach ($errors as $error) {
                $jsonErrors[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage(),
                ];
            }

            return $this->json($jsonErrors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // on verifie sir le produit n'exite pas déjà en base 

        $productName=$data->product;
        dump($productName);

        // 3. On va récupérer la catégorie du JSON
        $categoryId = $data->category;
        $category = $categoryRepository->find($categoryId);
        // On l'associe à la question
        $product->setCategory($category);

        foreach ($data->users as $userId) {
            $user = $userRepository->find($userId);
            $product->addUser($user);
        }

        foreach ($data->localSuppliers as $localSupplierId) {
            $localSupplier = $localSupplierRepository->find($localSupplierId);
            $product->addlocalSupplier($localSupplier);
        }

        $catalog= new Catalog;
        $catalog->setUser($user);
        $catalog->setLocalSupplier($localSupplier);
        $product->addCatalog($catalog);
        
        $em = $this->getDoctrine()->getManager();
        $em->persist($product);
        $em->flush();

        return $this->json('produit ajouté', 201);
    }

    
}


