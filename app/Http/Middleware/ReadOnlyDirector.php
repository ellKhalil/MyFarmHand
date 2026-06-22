<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ReadOnlyDirector
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Check if user exists and is a Managing Director
        if ($user && $user->role && $user->role->role_name === 'Managing Director') {
            // Block any state-changing requests, except for logout which is a POST
            $method = $request->method();
            if (in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE']) && !$request->is('logout')) {
                // Return to the previous page with an error
                return redirect()->back()->with('error', 'Access Denied: Directors have read-only access to preserve data integrity.');
            }
        }

        return $next($request);
    }
}
