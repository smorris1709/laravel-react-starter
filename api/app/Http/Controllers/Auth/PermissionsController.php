<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\PermissionResource;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PermissionsController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Role::class);

        return PermissionResource::collection(
            Permission::get()
        );
    }
}
