<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RegionRepository")
 */
class Region
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("regions_get")
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
     * @ORM\OneToMany(targetEntity="App\Entity\LocalSupplier", mappedBy="region")
     * 
     */
    private $localSuppliers;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\User", mappedBy="region")
     * 
     */
    private $users;

    public function __construct()
    {
        $this->localSuppliers = new ArrayCollection();
        $this->users = new ArrayCollection();
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
            $localSupplier->setRegion($this);
        }

        return $this;
    }

    public function removeLocalSupplier(LocalSupplier $localSupplier): self
    {
        if ($this->localSuppliers->contains($localSupplier)) {
            $this->localSuppliers->removeElement($localSupplier);
            // set the owning side to null (unless already changed)
            if ($localSupplier->getRegion() === $this) {
                $localSupplier->setRegion(null);
            }
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
            $user->setRegion($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            // set the owning side to null (unless already changed)
            if ($user->getRegion() === $this) {
                $user->setRegion(null);
            }
        }

        return $this;
    }
}
