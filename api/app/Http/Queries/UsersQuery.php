<?php

namespace App\Http\Queries;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class UsersQuery extends QueryBuilder
{
    public function __construct(Request $request)
    {
        parent::__construct(User::query());
    }
}
