<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductRepository")
 */
class Product
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("get_products")
     * @Groups("user_get")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("user_get")
     * @Groups("get_products")
     */
    private $name;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Category", inversedBy="products")
     * @Groups("user_get")
     * @Groups("results_get")
     */
    private $category;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\LocalSupplier", mappedBy="products")
     */
    private $localSuppliers;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", inversedBy="products")
     */
    private $users;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Catalog", mappedBy="product", orphanRemoval=true, cascade={"persist"})
     */
    private $catalogs;

    public function __construct()
    {
        $this->localSuppliers = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->catalogs = new ArrayCollection();
        $this->createdAt = new \DateTime;
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

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection|LocalSupplier[]
     */
    public function getLocalSuppliers(): Collection
    {
        return $this->localSuppliers;
    }

    public function addLocalSupplier(LocalSupplier $localSupplier): self
    {
        if (!$this->localSuppliers->contains($localSupplier)) {
            $this->localSuppliers[] = $localSupplier;
            $localSupplier->addProduct($this);
        }

        return $this;
    }

    public function removeLocalSupplier(LocalSupplier $localSupplier): self
    {
        if ($this->localSuppliers->contains($localSupplier)) {
            $this->localSuppliers->removeElement($localSupplier);
            $localSupplier->removeProduct($this);
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
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
            $catalog->setProduct($this);
        }

        return $this;
    }

    public function removeCatalog(Catalog $catalog): self
    {
        if ($this->catalogs->contains($catalog)) {
            $this->catalogs->removeElement($catalog);
            // set the owning side to null (unless already changed)
            if ($catalog->getProduct() === $this) {
                $catalog->setProduct(null);
            }
        }

        return $this;
    }
}
