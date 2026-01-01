<?php

namespace App\Services;

use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Transaction;

class MidtransService
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function createTransaction($order)
    {
        $params = [
            'transaction_details' => [
                'order_id' => $order->order_id,
                'gross_amount' => $order->total_amount,
            ],
            'customer_details' => [
                'first_name' => $order->customer_name,
                'email' => $order->customer_email,
                'phone' => $order->customer_phone,
            ],
            'item_details' => $this->getItemDetails($order),
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            return $snapToken;
        } catch (\Exception $e) {
            throw new \Exception('Failed to create transaction: ' . $e->getMessage());
        }
    }

    public function getTransactionStatus($orderId)
    {
        try {
            return Transaction::status($orderId);
        } catch (\Exception $e) {
            throw new \Exception('Failed to get transaction status: ' . $e->getMessage());
        }
    }

    private function getItemDetails($order)
    {
        $items = [];
        foreach ($order->items as $item) {
            $items[] = [
                'id' => $item->product_id,
                'price' => $item->price,
                'quantity' => $item->quantity,
                'name' => $item->product_name,
            ];
        }
        return $items;
    }
}
