<?php
$logPath = __DIR__ . '/../storage/logs/laravel.log';
if (!file_exists($logPath)) {
    echo "No log file found at $logPath";
} else {
    echo "<pre>";
    $lines = @file($logPath);
    if ($lines === false) {
        echo "Could not read log file. Check permissions. Try running: chmod -R 775 storage";
    } else {
        $lastLines = array_slice($lines, -100);
        echo htmlspecialchars(implode("", $lastLines));
    }
    echo "</pre>";
}
