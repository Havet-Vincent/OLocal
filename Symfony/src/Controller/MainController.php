<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="home_page")
     */
    public function index()
    {
        return $this->json([]);
    }

     /**
     * @Route("/site-map", name="map_page")
     */
    public function mapShow()
    {
        return $this->json([]);
    }


     /**
     * @Route("/legal-mentions", name="legal_mentions_page")
     */
    public function mentionsShow()
    {
        return $this->json([]);
    }

     /**
     * @Route("/contact", name="contact_page")
     */
    public function contactShow()
    {
        return $this->json([]);
    }
    
}
