<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GuestController extends Controller
{
    public function index()
    {
        if(Auth::check())
        {
            return redirect('/home');
        }
        return Inertia::render('Login');
    }
}
