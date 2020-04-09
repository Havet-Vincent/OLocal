<?php

namespace App\Repository;

use App\Entity\LocalSupplier;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method LocalSupplier|null find($id, $lockMode = null, $lockVersion = null)
 * @method LocalSupplier|null findOneBy(array $criteria, array $orderBy = null)
 * @method LocalSupplier[]    findAll()
 * @method LocalSupplier[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LocalSupplierRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LocalSupplier::class);
    }

    // /**
    //  * @return LocalSupplier[] Returns an array of LocalSupplier objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?LocalSupplier
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
