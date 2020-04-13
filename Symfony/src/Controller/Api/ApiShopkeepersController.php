<?php

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ApiShopkeepersController extends AbstractController
{
    /**
     * @Route("/api/shopkeepers/{id<\d+>}", name="api_shopkeeper_by_id")
     */
    public function getShopkeeperInformations(User $user)
    {
        return $this->json($user, 200, [], ['groups' => 'user_get']);
    }
}
