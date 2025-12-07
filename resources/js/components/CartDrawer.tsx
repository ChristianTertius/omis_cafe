import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: isOpen ? 0 : '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl dark:bg-[#191400]"
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-[#3E3E3A]">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            Shopping Cart
                        </h2>
                        <button
                            onClick={onClose}
                            className="rounded-sm p-2 transition-colors hover:bg-gray-100 dark:hover:bg-[#2A2400]"
                        >
                            <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </button>
                    </div>

                    {/* Cart Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
                            Your cart is empty
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-6 dark:border-[#3E3E3A]">
                        <div className="mb-4 flex items-center justify-between text-lg font-bold">
                            <span className="text-gray-900 dark:text-gray-100">Total:</span>
                            <span className="text-gray-900 dark:text-gray-100">Rp 0</span>
                        </div>
                        <button className="w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
                            Checkout
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
