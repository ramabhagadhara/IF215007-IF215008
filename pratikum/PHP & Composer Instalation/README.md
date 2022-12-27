# Hello World Package for PHP Composer #

ini adalah hello world package for php composer beginner untuk tutorial. baca lebih lanjut dari [klik link disini](https://packagist.org/packages/ehime/hello-world)
## Usage ##

```bash
$ composer require rama/hello-world
$ touch test.php
```

```php
<?php
require_once "vendor/autoload.php";
$hello = new rama\Demo\Hello();
echo $hello->hello();
```

```bash
$ php test.php
```

It will print "Hello World!" then exit.
