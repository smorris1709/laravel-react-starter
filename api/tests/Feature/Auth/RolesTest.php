<?php

use App\Models\Role;
use App\Models\User;

test('a guest cannot view roles', function () {
    $response = $this->get('/roles', [
        'Accept' => 'application/json',
    ]);

    $response->assertStatus(401);
});


test('a user without permission cannot view roles', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/roles', [
        'Accept' => 'application/json',
    ]);

    $response->assertStatus(403);
});

test('a user with admin role can view roles', function () {
    $user = User::factory()->create();
    $user->assignRole('Admin');


    $response = $this->actingAs($user)->get('/roles', [
        'Accept' => 'application/json',
    ]);

    $response->assertStatus(200);
});


// generate for all the other actions

test('a guest cannot create a role', function () {
    $response = $this->post('/roles', [
        'name' => 'Admin',
        'permissions' => ['roles.view', 'roles.create', 'roles.update', 'roles.delete'],
    ], [
        'Accept' => 'application/json',
    ]);

    $response->assertStatus(401);
});

test('a user without permission cannot create a role', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/roles', [
        'name' => 'Admin',
        'permissions' => ['roles.view', 'roles.create', 'roles.update', 'roles.delete'],
    ], [
        'Accept' => 'application/json',
    ]);

    $response->assertStatus(403);
});


test('a user with admin role can create a role', function () {
    $user = User::factory()->create();
    $user->assignRole('Admin');

    $response = $this->actingAs($user)->post('/roles', [
        'name' => 'Admin',
        'permissions' => ['roles.view', 'roles.create', 'roles.update', 'roles.delete'],
    ], [
        'Accept' => 'application/json',
    ]);

    $response->assertStatus(201);
});


test('a guest cannot update a role', function () {
    $response = $this->put('/roles/1', [
        'name' => 'Admin',
        'permissions' => ['roles.view', 'roles.create', 'roles.update', 'roles.delete'],
    ], [
        'Accept' => 'application/json',
    ]);

    $response->assertStatus(401);
});

test('a user without permission cannot update a role', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->put('/roles/1', [
        'name' => 'Admin',
        'permissions' => ['roles.view', 'roles.create', 'roles.update', 'roles.delete'],
    ], [
        'Accept' => 'application/json',
    ]);

    $response->assertStatus(403);
});


test('a user with admin role can update a role', function () {
    $user = User::factory()->create();
    $user->assignRole('Admin');

    $role = Role::factory()->create([
        'name' => 'Standard User',
    ]);

    $response = $this->actingAs($user)->put('/roles/' . $role->id, [
        'name' => 'Standard User 2',
        'permissions' => ['roles.view', 'roles.create', 'roles.update', 'roles.delete'],
    ], [
        'Accept' => 'application/json',
    ]);

    $response->assertStatus(200);
    $response->assertJson([
        'data' => [
            'name' => 'Standard User 2',
        ],
    ]);
});
