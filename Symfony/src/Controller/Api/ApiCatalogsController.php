<?php

namespace App\Controller\Api;

use App\Entity\Catalog;
use App\Entity\Product;
use App\Repository\CatalogRepository;
use App\Repository\UserRepository;
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
     * @return JsonReponse add one catalog's row
     */
    public function add(Request $request, DenormalizerInterface $denormalizer, ValidatorInterface $validator, ProductRepository $productRepository, LocalSupplierRepository $localSupplierRepository, UserRepository $userRepository, CategoryRepository $categoryRepository, EntityManagerInterface $em)
    {
        // we get the JSON Content
        $dataRequest = json_decode($request->getContent());     
        $catalog = $denormalizer->denormalize($dataRequest, Catalog::class);
        
        // entity validation
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

        // we get informations from Json and get its objects from DB
        $localSupplierId = filter_var($dataRequest->localSupplier, FILTER_SANITIZE_NUMBER_INT);
        $localSupplier = $localSupplierRepository->find($localSupplierId);
        if (!$localSupplier) {
            return $this->json("Données 'producteur local' non conformes", 409);
        }

        $userId = filter_var($dataRequest->user, FILTER_SANITIZE_NUMBER_INT);
        $user = $userRepository->find($userId);
        if (!$user) {
            return $this->json("Données 'commerçant' non conformes", 409);
        }

        $productName = filter_var($dataRequest->product, FILTER_SANITIZE_STRING);

        // we check if product is already in Database
        if ($productRepository->findOneBy(['name'=>$productName])){
            // take its id with getId()
            $product = $productRepository->findOneBy(['name'=>$productName]);            
        }
        else{
            // else -> call add product function before adding it to Catalog
            $categoryId = filter_var($dataRequest->category, FILTER_SANITIZE_NUMBER_INT);
            $category = $categoryRepository->find($categoryId);
            if (!$category) {
                return $this->json("Données 'catégorie' non conformes", 409);
            }
            $product = new Product;
            $product->setName(ucfirst($productName));
            $product->setCategory($category);
            $em=$this->getDoctrine()->getManager();
            $em->persist($product);
            $em->flush();
            $product = $productRepository->findOneBy(['name'=>$productName]);
        }
        // setting all properties
        $catalog->setProduct($product);
        $catalog->setUser($user);
        $catalog->setLocalSupplier($localSupplier);
        $em=$this->getDoctrine()->getManager();
        $em->persist($catalog);
        $em->flush();

        return $this->json('Catalogue ajouté', 201);

    }

    /**
     * @Route("/api/catalogs/{id<\d+>}/edit", name="api_catalogs_edit", methods="POST")
     * @return JsonReponse edit one catalog's row
     */
    public function edit(Request $request, DenormalizerInterface $denormalizer, ValidatorInterface $validator, ProductRepository $productRepository, LocalSupplierRepository $localSupplierRepository, CategoryRepository $categoryRepository, CatalogRepository $catalogRepository, EntityManagerInterface $em)
    {
        // we get the JSON Content
        $dataRequest = json_decode($request->getContent());
      
        $catalog = $denormalizer->denormalize($dataRequest, Catalog::class);
        
        // entity validation
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
        $catalogId = filter_var($dataRequest->id, FILTER_SANITIZE_NUMBER_INT);
        $catalogToEdit = $catalogRepository->find($catalogId);
        if (!$catalogToEdit){
            throw $this->createNotFoundException(sprintf(
                'Catalogue inexistant.'));
        }

        $localSupplierId = filter_var($dataRequest->localSupplier, FILTER_SANITIZE_NUMBER_INT);
        $localSupplier = $localSupplierRepository->find($localSupplierId);
        if (!$localSupplier) {
            return $this->json("Données 'producteur local' non conformes", 409);
        }

        $productName = filter_var($dataRequest->product, FILTER_SANITIZE_STRING);
        // if product already in DB
        if ($productRepository->findOneBy(['name' => $productName])) {
            // take its id with getId()
            $product = $productRepository->findOneBy(['name' => $productName]);            
        } else {
            // else -> call add product function before adding it to Catalog
            $categoryId = filter_var($dataRequest->category, FILTER_SANITIZE_NUMBER_INT);
            $category = $categoryRepository->find($categoryId);
            if (!$category) {
                return $this->json("Données 'catégorie' non conformes", 409);
            }
            $product = new Product;
            $product->setName(ucfirst($productName));
            $product->setCategory($category);
            $em=$this->getDoctrine()->getManager();
            $em->persist($product);
            $em->flush();
            $product = $productRepository->findOneBy(['name' => $productName]);
        }

        if ($localSupplierId !== $catalogToEdit->getLocalSupplier()) {
            $catalogToEdit->setLocalSupplier($localSupplier);
        }
        if ($product->getId() !== $catalogToEdit->getProduct()) {
            $catalogToEdit->setProduct($product);
        }

        $em=$this->getDoctrine()->getManager();
        $em->persist($catalogToEdit);
        $em->flush();

        return $this->json('Catalogue mis à jour');
    }

    /**
     * @Route("/api/catalogs/{id<\d+>}/delete", name="api_catalogs_delete", methods={"DELETE"})
     * @return JsonResponse delete selected catalog's row
     */
    public function delete (Request $request, DenormalizerInterface $denormalizer, ValidatorInterface $validator, CatalogRepository $catalogRepository)
    {
        // translate json request
        $data = json_decode($request->getContent());
        $catalog = $denormalizer->denormalize($data, Catalog::class);

        // entity validation
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
        $catalogId = filter_var($data->catalog, FILTER_SANITIZE_NUMBER_INT);
        $catalogToRemove = $catalogRepository->find($catalogId);
        if (!$catalogToRemove){
            return $this->json('Catalogue inexistant.', 409);
        }

        // else : delete this user
        $em = $this->getDoctrine()->getManager();
        $em->remove($catalogToRemove);
        $em->flush();

        return $this->json('Catalogue supprimé');
    }
}
