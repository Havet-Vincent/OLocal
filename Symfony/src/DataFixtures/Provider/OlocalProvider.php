<?php

namespace App\DataFixtures\Provider;

class OlocalProvider extends \Faker\Provider\Base
{

private static $regions = [
    "Auvergne-Rhône-Alpes",
    "Bourgogne-Franche-Comté",
    "Bretagne",
    "Centre-Val de Loire",
    "Corse",
    "Grand Est",
    "Guadeloupe",
    "Guyane",
    "Hauts-de-France",
    "Île-de-France",
    "Martinique",
    "Mayotte",
    "Normandie",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Pays de la Loire",
    "Provence-Alpes-Côte d'Azur",
    "La Réunion",
];

private static $categories=[

    "Fruits",
    "Légumes",
    "Viandes, Oeufs et Poissons",
    "Céréales, Légumineuses et Féculents",
    "Lait et Produits Laitiers",
    "Matières Grasses",
    "Sucre et produits sucrés",
    "Boissons",
    "Alcools",
    "Hygiène et beauté",
    "Entretien et Nettoyage",
];

/**
 * Pick a random region from the previous list
 */
public static function getRandomRegion()
{
    return self::$regions[array_rand(self::$regions)];
}

/**
 * Pick a random category from the previous list
 */
public static function getRandomCategory()
{
    return self::$categories[array_rand(self::$categories)];
}

}
