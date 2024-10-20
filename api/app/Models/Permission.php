<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission
{
    protected function getDefaultGuardName(): string
    {
        return 'web';
    }
}
