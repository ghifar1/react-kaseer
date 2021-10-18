<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
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

    public function getHistoryTransaction()
    {
        $trx = Transaction::all();

        return response()->json($trx, 200);

    }

    public function getDayTransaction()
    {
        $trx = Transaction::whereDate('created_at', Carbon::today())->get();

        return response()->json($trx);
    }

}
