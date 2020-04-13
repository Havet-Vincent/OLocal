<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass="App\Repository\CatalogRepository")
 */
class Catalog
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("user_get")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="catalogs", cascade={"persist"})
     * @ORM\JoinColumn(nullable=true)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Product", inversedBy="catalogs", cascade={"persist"})
     * @ORM\JoinColumn(nullable=true)
     * @Groups("user_get")
     */
    private $product;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\LocalSupplier", inversedBy="catalogs", cascade={"persist"})
     * @ORM\JoinColumn(nullable=true)
     * @Groups("user_get")
     */
    private $localSupplier;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getLocalSupplier(): ?LocalSupplier
    {
        return $this->localSupplier;
    }

    public function setLocalSupplier(?LocalSupplier $localSupplier): self
    {
        $this->localSupplier = $localSupplier;

        return $this;
    }
}
