<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class FarmScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        // If there's an authenticated user and they have a farm_id, scope the query
        if (Auth::hasUser() && Auth::user()->farm_id) {
            $builder->where($model->getTable() . '.farm_id', Auth::user()->farm_id);
        }
    }
}
