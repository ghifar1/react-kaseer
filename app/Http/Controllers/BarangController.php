<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BarangController extends Controller
{
    public function getBarang()
    {
        $items = Barang::all();

        return response()->json($items, 200);
    }

    public function tambahBarang(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'nama_barang' => 'required',
            'harga' => 'required',
            'stok' => 'required',
        ]);

        if($validate->fails())
        {
            return response()->json(['status' => 'error', 'reason' => $validate->errors()], 400);
        }

        $item = new Barang;
        $item->barcode = rand(1000000, 9999999);
        $item->kode_barang = $request->kode_barang;
        $item->nama_barang = $request->nama_barang;
        $item->harga = $request->harga;
        $item->stok = $request->stok != 0 ? $request->stok : 100;
        $item->created_by = $request->created_by;
        $item->save();

        return response()->json(['status' => 'success'], 200);
    }

    public function cariBarang(Request $request)
    {
        $barang = Barang::where('kode_barang', 'like', '%'.$request->nama_barang.'%')
            ->orWhere('nama_barang', 'like', '%'.$request->nama_barang.'%')
            ->orWhere('barcode', 'like', '%'.$request->nama_barang.'%')->get();

        return response()->json($barang);
    }

    public function editBarang(Request $request)
    {
        $barang = Barang::find($request->id);
        if(!$barang)
        {
            return response()->json(['status' => 'error', 'reason' => 'not found'], 400);
        }
        $barang->kode_barang = $request->kode_barang;
        $barang->nama_barang = $request->nama_barang;
        $barang->harga = $request->harga;
        $barang->stok = $request->stok;
        $barang->save();

        return response()->json(['status' => 'OK'], 200);
    }
}
