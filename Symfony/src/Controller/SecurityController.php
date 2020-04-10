<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    /**
     * @Route("/signup", name="signup")
     */
    public function signup()
    {
        return $this->json([]);
    }

    /**
     * @Route("/login", name="login")
     */
    public function login()
    {
        return $this->json([]);
    }

    /**
     * @Route("/lougout", name="lougout")
     */
    public function lougout()
    {
        return $this->json([]);
    }
}
