<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="home_page", methods={"GET"})
     */
    public function index()
    {
        return $this->json([]);
    }

     /**
     * @Route("/site-map", name="map_page", methods={"GET"})
     */
    public function mapShow()
    {
        return $this->json([]);
    }


     /**
     * @Route("/legal-mentions", name="legal_mentions_page", methods={"GET"} )
     */
    public function mentionsShow()
    {
        return $this->json([]);
    }

     /**
     * @Route("/contact", name="contact_page", methods={"GET"})
     */
    public function contactShow()
    {
        return $this->json([]);
    }
    
}
