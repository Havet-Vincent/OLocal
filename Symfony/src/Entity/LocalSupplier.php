<?php

namespace App\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LocalSupplierRepository")
 */
class LocalSupplier
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("user_get")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("user_get")
     * @Groups("local_by_region_get")
     * @Groups("add_local_supplier")
     */
    private $name;

    /**
     * @ORM\Column(type="bigint", unique=true)
     * @Groups("add_local_supplier")
     */
    private $siret;

    /**
     * @ORM\Column(type="integer")
     * @Groups("add_local_supplier")
     * @Groups("user_get")
     */
    private $postalCode;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("add_local_supplier")
     * @Groups("user_get")
     */
    private $city;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("add_local_supplier")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Region", inversedBy="localSuppliers")
     * @Groups("add_local_supplier")
     */
    private $region;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Product", inversedBy="localSuppliers")
     */
    private $products;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Catalog", mappedBy="localSupplier", orphanRemoval=true, cascade={"persist"})
     */
    private $catalogs;

    public function __construct()
    {
        $this->products = new ArrayCollection();
        $this->catalogs = new ArrayCollection();
        $this->createdAt= new DateTime();
    }

    public function __toString() {
        return $this->name;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSiret(): ?int
    {
        return $this->siret;
    }

    public function setSiret(int $siret): self
    {
        $this->siret = $siret;

        return $this;
    }

    public function getPostalCode(): ?int
    {
        return $this->postalCode;
    }

    public function setPostalCode(int $postalCode): self
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getRegion(): ?Region
    {
        return $this->region;
    }

    public function setRegion(?Region $region): self
    {
        $this->region = $region;

        return $this;
    }

    /**
     * @return Collection|Product[]
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->contains($product)) {
            $this->products->removeElement($product);
        }

        return $this;
    }

    /**
     * @return Collection|Catalog[]
     */
    public function getCatalogs(): Collection
    {
        return $this->catalogs;
    }

    public function addCatalog(Catalog $catalog): self
    {
        if (!$this->catalogs->contains($catalog)) {
            $this->catalogs[] = $catalog;
            $catalog->setLocalSupplier($this);
        }

        return $this;
    }

    public function removeCatalog(Catalog $catalog): self
    {
        if ($this->catalogs->contains($catalog)) {
            $this->catalogs->removeElement($catalog);
            // set the owning side to null (unless already changed)
            if ($catalog->getLocalSupplier() === $this) {
                $catalog->setLocalSupplier(null);
            }
        }

        return $this;
    }
}
