<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$logFile = __DIR__ . '/../storage/logs/laravel.log';

echo "<h1>MyFarmHand Debugger</h1>";

echo "<h2>Clearing Caches...</h2>";
$cacheFiles = [
    '/../bootstrap/cache/packages.php',
    '/../bootstrap/cache/services.php',
    '/../bootstrap/cache/config.php',
    '/../bootstrap/cache/routes-v7.php',
    '/../bootstrap/cache/events.php',
];

foreach ($cacheFiles as $file) {
    $path = __DIR__ . $file;
    if (file_exists($path)) {
        unlink($path);
        echo "Deleted " . basename($file) . "<br>";
    }
}
echo "<br><strong>Cache cleared successfully!</strong><br><hr>";

echo "<h2>Fixing Package Discovery...</h2>";
$baseDir = dirname(__DIR__);

// 1. Remove Dev Dependencies from installed.json to stop Laravel from looking for them
$installedJsonPath = $baseDir . '/vendor/composer/installed.json';
if (file_exists($installedJsonPath)) {
    $data = json_decode(file_get_contents($installedJsonPath), true);
    if (isset($data['packages'])) {
        $devPackages = ['laravel/breeze', 'laravel/tinker', 'nunomaduro/collision', 'laravel/pail', 'laravel/pao', 'fakerphp/faker', 'laravel/pint', 'mockery/mockery', 'phpunit/phpunit'];
        foreach ($data['packages'] as $k => $pkg) {
            if (in_array($pkg['name'], $devPackages)) {
                unset($data['packages'][$k]);
            }
        }
        $data['packages'] = array_values($data['packages']);
        file_put_contents($installedJsonPath, json_encode($data, JSON_PRETTY_PRINT));
        echo "Cleaned vendor/composer/installed.json successfully!<br>";
    }
}

// 2. Also clean installed.php if it exists
$installedPhpPath = $baseDir . '/vendor/composer/installed.php';
if (file_exists($installedPhpPath)) {
    $phpData = require $installedPhpPath;
    $devPackages = ['laravel/breeze', 'laravel/tinker', 'nunomaduro/collision', 'laravel/pail', 'laravel/pao', 'fakerphp/faker', 'laravel/pint', 'mockery/mockery', 'phpunit/phpunit'];
    if (isset($phpData['versions'])) {
        foreach ($phpData['versions'] as $pkg => $val) {
            if (in_array($pkg, $devPackages)) {
                unset($phpData['versions'][$pkg]);
            }
        }
    }
    file_put_contents($installedPhpPath, "<?php return " . var_export($phpData, true) . ";");
    echo "Cleaned vendor/composer/installed.php successfully!<br>";
}

// 3. Clear bootstrap/cache/packages.php
if (file_exists($baseDir . '/bootstrap/cache/packages.php')) {
    unlink($baseDir . '/bootstrap/cache/packages.php');
}
if (file_exists($baseDir . '/bootstrap/cache/services.php')) {
    unlink($baseDir . '/bootstrap/cache/services.php');
}

echo "<strong>Package discovery fixed!</strong><br><hr>";

echo "<h2>Running Database Migrations...</h2>";
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';

try {
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
    
    \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
    echo "<pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";
    echo "<strong>Migrations ran successfully!</strong><br><hr>";
} catch (\Throwable $e) {
    echo "<strong>Fatal/Migration Error: </strong>" . $e->getMessage() . " in " . $e->getFile() . " on line " . $e->getLine() . "<br><hr>";
}

echo "<h2>Latest Laravel Error Logs</h2>";
if (file_exists($logFile)) {
    // Get the last 100 lines of the log
    $lines = file($logFile);
    $lastLines = array_slice($lines, -100);
    echo "<pre style='background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto;'>";
    foreach ($lastLines as $line) {
        echo htmlspecialchars($line);
    }
    echo "</pre>";
} else {
    echo "No log file found at storage/logs/laravel.log";
}
