<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Region;
use App\Entity\Product;
use App\Entity\Category;
use App\Entity\LocalSupplier;
use Doctrine\Bundle\FixturesBundle\Fixture;
use App\DataFixtures\Provider\OlocalProvider;
use App\Entity\Catalog;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {   
        $faker= Factory::create('fr_FR');
        $faker->addProvider(new OlocalProvider($faker));

        // we create all regions
        $regionsList = [];

        $region= new Region();
        $region->setName("Auvergne-Rhône-Alpes");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);

        $region= new Region();
        $region->setName("Bourgogne-Franche-Comté");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);
        
        $region= new Region();
        $region->setName("Bretagne");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);
        
        $region= new Region();
        $region->setName("Centre-Val de Loire");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);

        $region= new Region();
        $region->setName("Corse");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);

        $region= new Region();
        $region->setName("Grand Est");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);

        $region= new Region();
        $region->setName("Guadeloupe");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);

        $region= new Region();
        $region->setName("Guyane");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);

        $region= new Region();
        $region->setName("Hauts-de-France");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);

        $region= new Region();
        $region->setName("Île-de-France");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);
        
        $region= new Region();
        $region->setName("Mayotte");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);

        $region= new Region();
        $region->setName("Martinique");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);
        
        $region= new Region();
        $region->setName("Normandie");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);
        
        $region= new Region();
        $region->setName("Nouvelle-Aquitaine");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);
        
        $region= new Region();
        $region->setName("Occitanie");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);
        
        $region= new Region();
        $region->setName("Pays de la Loire");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);
        
        $region= new Region();
        $region->setName("Provence-Alpes-Côte d'Azur");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);

        $region= new Region();
        $region->setName("La Réunion");
        $region->setCreatedAt(new \DateTime());
        $regionsList[] = $region;
        $manager->persist($region);

        // we create all categories
        $categoriesList = [];

        $category = new Category();
        $category->setName("Fruits");
        $category->setCreatedAt(new \DateTime());
        $categoriesList[] = $category;
        $manager->persist($category);
        
        $category = new Category;
        $category->setName("Légumes");
        $category->setCreatedAt(new \DateTime());
        $categoriesList[] = $category;
        $manager->persist($category);

        $category = new Category;
        $category->setName("Viandes, Oeufs et Poissons");
        $category->setCreatedAt(new \DateTime());
        $categoriesList[] = $category;
        $manager->persist($category);

        $category = new Category;
        $category->setName("Céréales, Légumineuses et Féculents");
        $category->setCreatedAt(new \DateTime());
        $categoriesList[] = $category;
        $manager->persist($category);

        $category = new Category;
        $category->setName("Lait et Produits Laitiers");
        $category->setCreatedAt(new \DateTime());
        $categoriesList[] = $category;
        $manager->persist($category);

        $category = new Category;
        $category->setName("Matières Grasses");
        $category->setCreatedAt(new \DateTime());
        $categoriesList[] = $category;
        $manager->persist($category);

        $category = new Category;
        $category->setName("Sucre et produits sucrés");
        $category->setCreatedAt(new \DateTime());
        $categoriesList[] = $category;
        $manager->persist($category);

        $category = new Category;
        $category->setName("Boissons");
        $category->setCreatedAt(new \DateTime());
        $categoriesList[] = $category;
        $manager->persist($category);

        $category = new Category;
        $category->setName("Alcools");
        $category->setCreatedAt(new \DateTime());
        $categoriesList[] = $category;
        $manager->persist($category);

        $category = new Category;
        $category->setName("Hygiène et beauté");
        $category->setCreatedAt(new \DateTime());
        $categoriesList[] = $category;
        $manager->persist($category);

        $category = new Category;
        $category->setName("Entretien et Nettoyage");
        $category->setCreatedAt(new \DateTime());
        $categoriesList[] = $category;
        $manager->persist($category);   

        // we create 200 local suppliers
        $localList = [];
        for ($i = 0; $i < 200; $i++) {
            $localSupplier = new LocalSupplier();
            $localSupplier->setName($faker->unique()->company());
            $localSupplier->setSiret($faker->numberBetween(10000000000000, 99999999999999));
            $localSupplier->setPostalCode($faker->numberBetween(10000, 99999));
            $localSupplier->setCity($faker->city());
            $localSupplier->setCreatedAt(new \DateTime());

            $randomRegion = $regionsList[array_rand($regionsList)];
            $localSupplier->setRegion($randomRegion);

            $localList[] = $localSupplier;
            $manager->persist($localSupplier);
        }

        // we create 50 users (shopkeepers)    
        $usersList = [];           
        for ($i = 0; $i < 50; $i++) {
            $user= new User();
            $user->setEmail($faker->unique()->email());
            $user->setFirstname($faker->firstname());
            $user->setLastname($faker->lastname());
            $user->setPassword($faker->password());
            $user->setUserRole(['ROLE_USER']);
            $user->setIsEmailChecked(true);
            $user->setIsActive(true);
            $user->setAdditionalAddress($faker->optional()->secondaryAddress());
            $user->setRepeatIndex($faker->optional()->randomElement(["Bis","Ter"]));
            $user->setWayNumber($faker->buildingNumber());
            $user->setWayType($faker->randomElement(["rue","avenue","allée","boulevard", "route","place"]));
            $user->setWayName($faker->streetName());
            $user->setPostalCode($faker->numberBetween(10000, 99999));
            $user->setCity($faker->city());
            $user->setSiret($faker->numberBetween(10000000000000, 99999999999999));
            $user->setCompanyName($faker->unique()->company());
            $user->setCompanyDescription($faker->realText($maxNbChars = 400, $indexSize = 2));
            $user->setLogoPicture('/uploads/frontoffice'.mt_rand(1, 30).'.jpg');
            $user->setPhone($faker->serviceNumber());
            $user->setWebsite($faker->url());
            $user->setCreatedAt(new \DateTime());
            
            $randomRegion = $regionsList[array_rand($regionsList)];
            $user->setRegion($randomRegion);

                // we create between 3 and 10 products
                $productsList = [];
                for ($p = 0; $p < mt_rand(3, 10); $p++) {
                    $product = new Product();
                    $product->setName($faker->word());
                    $product->setCreatedAt(new \DateTime());

                    $randomCategory = $categoriesList[array_rand($categoriesList)];
                    $product->setCategory($randomCategory);

                    
                    $catalogProduct = new Catalog;
                    $catalogProduct->setUser($user);
                    $catalogProduct->setProduct($product);
                    $randomLocal = $localList[array_rand($localList)];
                    $catalogProduct->setLocalSupplier($randomLocal);

                    $product->addCatalog($catalogProduct); 
                    

                    $productsList[] = $product;
                    $manager->persist($catalogProduct);
                }

            $usersList[] = $user;
            $manager->persist($user);
        }

        $manager->flush();
    }
}
