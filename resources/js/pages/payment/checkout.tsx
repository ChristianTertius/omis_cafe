import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Order {
    id: number;
    order_id: string;
    total_amount: number;
    customer_name: string;
    customer_email: string;
    payment_status: string;
}

interface Props {
    snapToken: string;
    order: Order;
    clientKey: string;
    isProduction: boolean;
}

// Extend window type for snap
declare global {
    interface Window {
        snap: any;
    }
}

export default function Checkout({ snapToken, order, clientKey, isProduction }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        // Load Midtrans Snap script
        const snapScript = isProduction
            ? 'https://app.midtrans.com/snap/snap.js'
            : 'https://app.sandbox.midtrans.com/snap/snap.js';

        const script = document.createElement('script');
        script.src = snapScript;
        script.setAttribute('data-client-key', clientKey);
        script.onload = () => setScriptLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [clientKey, isProduction]);

    const handlePayment = () => {
        if (!window.snap || !scriptLoaded) {
            alert('Payment system is loading, please wait...');
            return;
        }

        setIsLoading(true);

        window.snap.pay(snapToken, {
            onSuccess: (result: any) => {
                console.log('Payment success:', result);
                router.get(`/payment/finish?order_id=${order.order_id}`);
            },
            onPending: (result: any) => {
                console.log('Payment pending:', result);
                router.get(`/payment/unfinish?order_id=${order.order_id}`);
            },
            onError: (result: any) => {
                console.error('Payment error:', result);
                router.get(`/payment/error?order_id=${order.order_id}`);
            },
            onClose: () => {
                console.log('Payment popup closed');
                setIsLoading(false);
            },
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <>
            <Head title={`Payment - Order #${order.order_id}`} />

            <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Complete Payment
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Secure payment powered by Midtrans
                        </p>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Order ID</span>
                                <span className="text-gray-800 font-semibold">
                                    {order.order_id}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Customer</span>
                                <span className="text-gray-800 font-semibold">
                                    {order.customer_name}
                                </span>
                            </div>

                            <div className="pt-3 border-t-2 border-gray-300">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-semibold">Total Amount</span>
                                    <span className="text-2xl font-bold text-indigo-600">
                                        {formatCurrency(order.total_amount)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <button
                        onClick={handlePayment}
                        disabled={isLoading || !scriptLoaded}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Opening payment...
                            </span>
                        ) : !scriptLoaded ? (
                            'Loading payment system...'
                        ) : (
                            'Proceed to Payment'
                        )}
                    </button>

                    {/* Security Badge */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 flex items-center justify-center">
                            <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Secured by SSL encryption
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
