<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use PDF;
use Illuminate\Http\Request;

class PrinterController extends Controller
{
    public function print($type)
    {
        $barangs = Barang::all();
        $pdf = PDF::loadView('pdf.file', compact('barangs', 'type'));

        return $pdf->stream();
    }

    public function printWeb($type)
    {
        $barangs = Barang::all();
        return view('pdf.file', compact('barangs', 'type'));
    }

}
