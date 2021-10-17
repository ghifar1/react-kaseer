<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function createTransaction(Request $request)
    {
        $trx = new Transaction;
        $trx->detail_barang = json_encode($request->detail_barang);
        $trx->total_harga = $request->total_harga;
        $trx->tipe = "cash";
        $trx->created_by = $request->created_by;
        $trx->save();

        return response()->json(['status' => 'success'], 200);
    }

}
