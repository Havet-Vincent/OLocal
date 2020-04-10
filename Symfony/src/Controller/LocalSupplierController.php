<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class LocalSupplierController extends AbstractController
{
    /**
     * @Route("/localsupplier/detail", name="localsupplier_detail")
     */
    public function detail()
    {
        return $this->json([]);
    }
}
