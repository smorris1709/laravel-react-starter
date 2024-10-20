<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Seeder::call([
            RolesSeeder::class,
        ]);

        $user = User::factory()->create([
            'name' => 'Simon Morris',
            'email' => 'admin@example.dev',
            'password' => '$2y$12$dm5BPYh0KJbXc4fI8M.PAezXmvf4mlRVxnN6vrI3Lhx1qQP9.Q9oO', // secret
        ]);

        $user->assignRole('Admin');

    }
}
