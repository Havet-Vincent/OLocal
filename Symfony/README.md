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
And copy/paste this code after replace your PMA login and password
```sh
DATABASE_URL=mysql://PMALOGIN:PMAPASSWORD@127.0.0.1:3306/olocal_dev?serverVersion=5.7
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