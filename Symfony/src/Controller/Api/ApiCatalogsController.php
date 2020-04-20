<?php

namespace App\Controller\Api;

use App\Entity\Catalog;
use App\Entity\Product;
use App\Repository\CatalogRepository;
use App\Repository\UserRepository;
use App\Repository\RegionRepository;
use App\Repository\ProductRepository;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\LocalSupplierRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class ApiCatalogsController extends AbstractController
{
    /**
     * @Route("/api/catalogs/add", name="api_catalogs_add", methods="POST")
     */
    public function add(Request $request, DenormalizerInterface $denormalizer, ValidatorInterface $validator, ProductRepository $productRepository, RegionRepository $regionRepository, LocalSupplierRepository $localSupplierRepository, UserRepository $userRepository, CategoryRepository $categoryRepository, EntityManagerInterface $em)
    {
        // 1. On récupère le contenu JSON
        $dataRequest = json_decode($request->getContent());
      
        $catalog = $denormalizer->denormalize($dataRequest, Catalog::class);
        
        //on valide l'entité 
        $errors = $validator->validate($catalog);
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

        $localSupplierId = $dataRequest->localSupplier;
        $localSupplier = $localSupplierRepository->find($localSupplierId);

        $userId = $dataRequest->user;
        $user = $userRepository->find($userId);

        $productName = $dataRequest->product;
        // if product already in DB
        if ($productRepository->findOneBy(['name'=>$productName])){
            // take its id with getId()
            $product = $productRepository->findOneBy(['name'=>$productName]);            
        }
        else{
            // else -> call add product function before adding it to Catalog
            $categoryId = $dataRequest->category;
            $category = $categoryRepository->find($categoryId);
            $product = new Product;
            $product->setName($productName);
            $product->setCategory($category);
            $em=$this->getDoctrine()->getManager();
            $em->persist($product);
            $em->flush();
            $product = $productRepository->findOneBy(['name'=>$productName]);

        }

        $catalog->setProduct($product);
        $catalog->setUser($user);
        $catalog->setLocalSupplier($localSupplier);
        $em=$this->getDoctrine()->getManager();
        $em->persist($catalog);
        $em->flush();

        return $this->json('catalogue ajouté', 201);

    }

    /**
     * @Route("/api/catalogs/{id<\d+>}/edit", name="api_catalogs_edit", methods="POST")
     */
    public function edit(Request $request, DenormalizerInterface $denormalizer, ValidatorInterface $validator, ProductRepository $productRepository, RegionRepository $regionRepository, LocalSupplierRepository $localSupplierRepository, UserRepository $userRepository, CategoryRepository $categoryRepository, CatalogRepository $catalogRepository, EntityManagerInterface $em)
    {
        // 1. On récupère le contenu JSON
        $dataRequest = json_decode($request->getContent());
      
        $catalog = $denormalizer->denormalize($dataRequest, Catalog::class);
        
        //on valide l'entité 
        $errors = $validator->validate($catalog);
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

        // catalog doesn't exist ?
        $catalogId = $dataRequest->id;
        $catalogToEdit = $catalogRepository->find($catalogId);
        if (!$catalogToEdit){
            throw $this->createNotFoundException(sprintf(
                'Catalogue inexistant.'));
        }

        $localSupplierId = $dataRequest->localSupplier;
        $localSupplier = $localSupplierRepository->find($localSupplierId);

        $productName = $dataRequest->product;
        // if product already in DB
        if ($productRepository->findOneBy(['name' => $productName])) {
            // take its id with getId()
            $product = $productRepository->findOneBy(['name' => $productName]);            
        } else {
            // else -> call add product function before adding it to Catalog
            $categoryId = $dataRequest->category;
            $category = $categoryRepository->find($categoryId);
            $product = new Product;
            $product->setName($productName);
            $product->setCategory($category);
            $em=$this->getDoctrine()->getManager();
            $em->persist($product);
            $em->flush();
            $product = $productRepository->findOneBy(['name' => $productName]);
        }

        if ($dataRequest->localSupplier !== $catalogToEdit->getLocalSupplier()) {
            $catalogToEdit->setLocalSupplier($localSupplier);
        }
        if ($dataRequest->product !== $catalogToEdit->getProduct()) {
            $catalogToEdit->setProduct($product);
        }

        $em=$this->getDoctrine()->getManager();
        $em->persist($catalogToEdit);
        $em->flush();

        return $this->json('Catalogue mis à jour');
    }

    /**
     * @Route("/api/catalogs/{id<\d+>}/delete", name="api_catalogs_delete", methods={"DELETE"})
     */
    public function delete (Request $request, DenormalizerInterface $denormalizer, ValidatorInterface $validator, CatalogRepository $catalogRepository)
    {
        // translate json request
        $data = json_decode($request->getContent());
        $catalog = $denormalizer->denormalize($data, Catalog::class);

        // validation/error
        $errors = $validator->validate($catalog);
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

        // catalog doesn't exist ?
        $catalogId = $data->catalog;
        $catalogToRemove = $catalogRepository->find($catalogId);
        if (!$catalogToRemove){
            throw $this->createNotFoundException(sprintf(
                'Catalogue inexistant.'));
        }

        // else : delete this user
        $em = $this->getDoctrine()->getManager();
        $em->remove($catalogToRemove);
        $em->flush();

        return $this->json('Catalogue supprimé');
    }
}
