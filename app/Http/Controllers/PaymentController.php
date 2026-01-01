<?php

namespace App\Http\Controllers;

use App\Services\MidtransService;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    protected $midtransService;

    public function __construct(MidtransService $midtransService)
    {
        $this->midtransService = $midtransService;
    }

    public function createPayment($orderId)
    {
        try {
            $order = Order::with('items')->findOrFail($orderId);

            $snapToken = $this->midtransService->createTransaction($order);

            $order->snap_token = $snapToken;
            $order->save();

            return view('payment.checkout', [
                'snapToken' => $snapToken,
                'order' => $order,
                'clientKey' => config('midstrans.client_key')
            ]);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public  function callback(Request $request)
    {
        try {
            $serverKey = config('midtrans.server_key');
            $hashed = hash('sha512', $request->order_id . $request->status_code . $request->gross_amount . $serverKey);

            if ($hashed !== $request->signatue_key) {
                return response()->json(['message' => 'Invalid signature'], 403);
            }

            $order = Order::where('order_id', $request->order_id)->first();

            if (!$order) {
                return response()->json(['message' => 'Order not found'], 404);
            }

            $transactionStatus = $request->transaction_status;
            $fraudStatus = $request->fraud_status;

            if ($transactionStatus == 'capture') {
                if ($fraudStatus == 'accept') {
                    $order->payment_status = 'paid';
                }
            } else if ($transactionStatus == 'settlement') {
                $order->payment_status = 'paid';
            } else if ($transactionStatus == 'pending') {
                $order->payment_status = 'pending';
            } else if ($transactionStatus == 'deny' || $transactionStatus == 'expire' || $transactionStatus == 'cancel') {
                $order->payment_status = 'failed';
            }

            $order->save();

            Log::info('Midtrans notification processed', ['order_id' => $request->order_id]);

            return response()->json(['message' => 'Notification Proccessed']);
        } catch (\Exception $e) {
            Log::error('Midtrans callback error: ' . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }

    public function finish(Request $request)
    {
        $orderId = $request->order_id;
        return redirect()->route('order.success', $orderId);
    }

    public function unfinish(Request $reques)
    {
        return redirect()->route('order.pending');
    }

    public function error(Request $request)
    {
        return redirect()->route('order.failed');
    }
}
