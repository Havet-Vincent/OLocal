<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ShopkeeperController extends AbstractController
{
    /**
     * @Route("/shopkeeper", name="shopkeeper")
     */
    public function index()
    {
        return $this->render('shopkeeper/index.html.twig', [
            'controller_name' => 'ShopkeeperController',
        ]);
    }
}
