<?php
$packagesPath = __DIR__ . '/../bootstrap/cache/packages.php';
$servicesPath = __DIR__ . '/../bootstrap/cache/services.php';

if (file_exists($packagesPath)) {
    unlink($packagesPath);
    echo "Deleted bootstrap/cache/packages.php<br>";
}

if (file_exists($servicesPath)) {
    unlink($servicesPath);
    echo "Deleted bootstrap/cache/services.php<br>";
}

echo "Cache cleared! You can now visit your homepage.";
