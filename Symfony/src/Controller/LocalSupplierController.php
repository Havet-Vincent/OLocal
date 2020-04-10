<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class LocalSupplierController extends AbstractController
{
    /**
     * @Route("/local/supplier", name="local_supplier")
     */
    public function index()
    {
        return $this->render('local_supplier/index.html.twig', [
            'controller_name' => 'LocalSupplierController',
        ]);
    }
}
