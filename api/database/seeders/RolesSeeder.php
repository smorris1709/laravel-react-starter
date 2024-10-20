<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Exceptions\RoleAlreadyExists;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Seeder::call([
            PermissionSeeder::class,
        ]);

        try {
            $admin = Role::create(['name' => 'Admin']);
            $admin->givePermissionTo(Permission::all());
        } catch (RoleAlreadyExists $e) {
            // do nothing
        }

    }
}
