# o'Local - Back End :

### Install Project dependencies :
```sh
cd Symfony/
```
```sh
composer install
```

### .env.local at Symfony/ :
Create file .env.local at Symfony/
And copy/paste this code after replace with your PMA login and password
```sh
DATABASE_URL=mysql://PMALOGIN:PMAPASSWORD@127.0.0.1:3306/olocal_dev?serverVersion=5.7
```

### Generate the SSH keys for JWT Token (first time only):
Go to Symfony/
```sh
mkdir -p config/jwt
```
One of these two commands ask you to create a secret phrase you have to make for security. Remember it !
```sh
openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
```
```sh
openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout
```
And copy/paste this code in .env.local after replace with your secret phrase you make when generating keys :
```sh
JWT_PASSPHRASE=yoursecretphrase
```

### Create database :
```sh
bin/console doctrine:database:create
```
or
```sh
bin/console d:d:c
```

### Database migration :
```sh
bin/console doctrine:migrations:migrate
```
or
```sh
bin/console d:m:m
```

### Fixtures creation :
```sh
bin/console doctrine:fixtures:load
```
or
```sh
bin/console d:f:l
```