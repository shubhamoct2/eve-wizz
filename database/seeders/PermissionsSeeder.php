<?php

namespace Database\Seeders;

use App\Models\Auth\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Config;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = Config::get('permission.default_permissions');
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
    }
}
