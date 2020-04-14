<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\BrowserKit\Request;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * @return User[] Returns an array of User objects
     */
    public function findByRegionAndCategory($regionId, $categoryId)
    {
        return $this->createQueryBuilder('u')
            ->innerJoin('App:Catalog', 'c', 'WITH', 'c.user = u.id')
            ->innerJoin('App:Product', 'p', 'WITH', 'c.product = p.id')
            ->innerJoin('App:Category', 'cat', 'WITH', 'p.category = cat.id')
            ->andWhere('u.region = :region')
            ->setParameter('region', $regionId)
            ->andWhere('cat.id = :category')
            ->setParameter('category', $categoryId)
            ->getQuery()
            ->getResult()
        ;
    }

    // SELECT * FROM `user` 
    // JOIN catalog ON catalog.user_id = user.id 
    // JOIN product ON catalog.product_id = product.id 
    // JOIN category ON category.id = product.category_id 
    // WHERE region_id = 924 AND category.id = 570
    

    /*
    public function findOneBySomeField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
