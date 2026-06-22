<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!$request->user() || !$request->user()->role) {
            return redirect('/dashboard')->with('error', 'Access Denied: You do not have the required permissions.');
        }

        $userRole = $request->user()->role->role_name;

        if (!in_array($userRole, $roles)) {
            return redirect('/dashboard')->with('error', 'Access Denied: You do not have the required permissions.');
        }

        return $next($request);
    }
}
