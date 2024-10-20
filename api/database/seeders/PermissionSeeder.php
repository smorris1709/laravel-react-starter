<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;
use Spatie\Permission\Exceptions\PermissionAlreadyExists;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $auth = [
            'roles.viewAny',
            'roles.view',
            'roles.create',
            'roles.update',
            'roles.delete',

            'users.viewAny',
            'users.view',
            'users.create',
            'users.update',
            'users.delete',
        ];

        $all = array_merge($auth);

        foreach ($all as $permission) {
            try {
                Permission::create(['name' => $permission]);
            } catch (PermissionAlreadyExists $e) {
                // do nothing
            }
        }


    }
}
