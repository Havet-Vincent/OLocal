<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface, \Serializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("user_get")
     * @Groups("results_get")
     * @Groups("user_login")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups("user_get")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("user_get")
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("user_get")
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isEmailChecked;

    /**
     * @ORM\Column(type="json", nullable=true)
     * @Groups("user_get")
     * @Groups("user_login")
     */
    private $userRole = [];

    /**
     * @ORM\Column(type="boolean")
     * @Groups("user_get")
     */
    private $isActive;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("user_get")
     */
    private $additionalAddress;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @Groups("user_get")
     */
    private $repeatIndex;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups("user_get")
     */
    private $wayNumber;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @Groups("user_get")
     */
    private $wayType;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("user_get")
     */
    private $wayName;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups("user_get")
     * @Groups("results_get")
     */
    private $postalCode;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("user_get")
     * @Groups("results_get")
     */
    private $city;

    /**
     * @ORM\Column(type="bigint", nullable=true, unique=true)
     * @Groups("user_get")
     */
    private $siret;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("user_get")
     * @Groups("results_get")
     */
    private $companyName;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups("user_get")
     * @Groups("results_get")
     */
    private $companyDescription;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("user_get")
     * @Groups("results_get")
     */
    private $logoPicture;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $folderPicture;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     * @Groups("user_get")
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("user_get")
     */
    private $website;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Product", mappedBy="users")
     * @Groups("user_get")
     */
    private $products;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Region", inversedBy="users")
     * @Groups("user_get")
     * @Groups("results_get")
     */
    private $region;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Catalog", mappedBy="user", orphanRemoval=true, cascade={"persist"})
     * @Groups("user_get")
     * @Groups("results_get")
     */
    private $catalogs;

    public function __construct()
    {
        $this->products = new ArrayCollection();
        $this->catalogs = new ArrayCollection();
        $this->createdAt= new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(?string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function getIsEmailChecked(): ?bool
    {
        return $this->isEmailChecked;
    }

    public function setIsEmailChecked(bool $isEmailChecked): self
    {
        $this->isEmailChecked = $isEmailChecked;

        return $this;
    }

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getAdditionalAddress(): ?string
    {
        return $this->additionalAddress;
    }

    public function setAdditionalAddress(?string $additionalAddress): self
    {
        $this->additionalAddress = $additionalAddress;

        return $this;
    }

    public function getRepeatIndex(): ?string
    {
        return $this->repeatIndex;
    }

    public function setRepeatIndex(?string $repeatIndex): self
    {
        $this->repeatIndex = $repeatIndex;

        return $this;
    }

    public function getWayNumber(): ?int
    {
        return $this->wayNumber;
    }

    public function setWayNumber(?int $wayNumber): self
    {
        $this->wayNumber = $wayNumber;

        return $this;
    }

    public function getWayType(): ?string
    {
        return $this->wayType;
    }

    public function setWayType(?string $wayType): self
    {
        $this->wayType = $wayType;

        return $this;
    }

    public function getWayName(): ?string
    {
        return $this->wayName;
    }

    public function setWayName(?string $wayName): self
    {
        $this->wayName = $wayName;

        return $this;
    }

    public function getPostalCode(): ?int
    {
        return $this->postalCode;
    }

    public function setPostalCode(?int $postalCode): self
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getSiret(): ?int
    {
        return $this->siret;
    }

    public function setSiret(?int $siret): self
    {
        $this->siret = $siret;

        return $this;
    }

    public function getCompanyName(): ?string
    {
        return $this->companyName;
    }

    public function setCompanyName(?string $companyName): self
    {
        $this->companyName = $companyName;

        return $this;
    }

    public function getCompanyDescription(): ?string
    {
        return $this->companyDescription;
    }

    public function setCompanyDescription(?string $companyDescription): self
    {
        $this->companyDescription = $companyDescription;

        return $this;
    }

    public function getLogoPicture(): ?string
    {
        return $this->logoPicture;
    }

    public function setLogoPicture(?string $logoPicture): self
    {
        $this->logoPicture = $logoPicture;

        return $this;
    }

    public function getFolderPicture(): ?string
    {
        return $this->folderPicture;
    }

    public function setFolderPicture(?string $folderPicture): self
    {
        $this->folderPicture = $folderPicture;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): self
    {
        $this->website = $website;

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
            $product->addUser($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->contains($product)) {
            $this->products->removeElement($product);
            $product->removeUser($this);
        }

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
            $catalog->setUser($this);
        }

        return $this;
    }

    public function removeCatalog(Catalog $catalog): self
    {
        if ($this->catalogs->contains($catalog)) {
            $this->catalogs->removeElement($catalog);
            // set the owning side to null (unless already changed)
            if ($catalog->getUser() === $this) {
                $catalog->setUser(null);
            }
        }

        return $this;
    }

    public function __toString() {
        return $this->email;
    }

    public function getSalt()
    {
        // you *may* need a real salt depending on your encoder
        // see section on salt below
        return null;
    }

    public function eraseCredentials()
    {
    }

    /** @see \Serializable::serialize() */
    public function serialize()
    {
        return serialize(array(
            $this->id,
            $this->email,
            $this->password,
            // see section on salt below
            // $this->salt,
        ));
    }

    /** @see \Serializable::unserialize() */
    public function unserialize($serialized)
    {
        list (
            $this->id,
            $this->email,
            $this->password,
            // see section on salt below
            // $this->salt
        ) = unserialize($serialized, array('allowed_classes' => false));
    }

    public function setPassword(?string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $userRole = $this->userRole;
        // guarantee every user at least has ROLE_USER
        //$userRole[] = 'ROLE_USER';

        //$userRole = [];

        return $userRole;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function getUserRole(): ?array
    {
        return $this->userRole;
    }

    public function setUserRole(?array $userRole): self
    {
        $this->userRole = $userRole;

        return $this;
    }
}
