<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class RolesController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Role::class);


        return RoleResource::collection(
            Role::get()
        );
    }

    public function show(Request $request, Role $role)
    {
        Gate::authorize('view', $role);

        $role->load('permissions');

        return RoleResource::make($role);
    }

    public function store(Request $request)
    {
        Gate::authorize('create', Role::class);

        $request->validate([
            'name' => ['required', 'string'],
            config('permission.column_names.team_foreign_key') => ['nullable', 'sometimes', 'integer'],
            'permissions' => ['nullable', 'sometimes', 'array'],
            'permissions.*' => ['exists:permissions,name'],
        ]);

        $role = Role::create(
            $request->only('name', config('permission.column_names.team_foreign_key'))
        );

        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return RoleResource::make($role, 201);
    }

    public function update(Request $request, Role $role)
    {
        Gate::authorize('update', $role);

        $request->validate([
            'name' => ['required', 'string'],
            config('permission.column_names.team_foreign_key') => ['nullable', 'sometimes', 'integer'],
            'permissions' => ['nullable', 'sometimes', 'array'],
            'permissions.*' => ['exists:permissions,name'],
        ]);

        $role->update($request->only('name', config('permission.column_names.team_foreign_key')));

        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return RoleResource::make($role);
    }

    public function destroy(Request $request, Role $role)
    {
        Gate::authorize('delete', $role);

        $role->delete();

        return response()->noContent();

    }
}
