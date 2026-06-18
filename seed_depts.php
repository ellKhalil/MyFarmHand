<?php
$depts = ["Administration", "Poultry", "Aquaculture", "Dairy", "Crops", "Logistics", "Maintenance", "Finance"];
foreach ($depts as $dept) {
    App\Models\Department::firstOrCreate(['name' => $dept]);
}
echo "Seeded departments.\n";
