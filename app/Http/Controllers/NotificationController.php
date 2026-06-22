<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function markRead(Notification $notification, Request $request)
    {
        if ($notification->user_id === $request->user()->id) {
            $notification->update(['is_read' => true]);
        }
        
        return back();
    }
}
