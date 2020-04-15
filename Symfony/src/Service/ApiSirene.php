<?php

namespace App\Service;

use Symfony\Component\HttpClient\HttpClient;

class ApiSirene 

{
    private $tokenBearer = '9ee0a06b-1d55-3180-87af-a97afa60daab';

    /**
     * service permettant la récupération des données de l'api SIRENE
     * 
     */
     
    public function getShopkeeperData ($siret)

     {
         
        $client = HttpClient::createForBaseUri("https://api.insee.fr/entreprises/sirene/V3/siret/{$siret}", [        
            // HTTP Bearer authentication (also called token authentication)
            'auth_bearer' => $this->tokenBearer,
        ]);
        
        $response = $client->request('GET', "https://api.insee.fr/entreprises/sirene/V3/siret/{$siret}");   

        // TODO : siret existence check
        return $response;
        
    }

     
}