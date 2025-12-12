import Navbar from '@/components/navbar';
import { PropsWithChildren, useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Footer from '@/components/footer';
import { motion, AnimatePresence } from 'framer-motion';

interface AppLayoutProps {
    title?: string;
    className?: string;
}

export default function AppLayout({ title, children, className }: PropsWithChildren<AppLayoutProps>) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Wait for all images to load
        const handleLoad = () => {
            const images = document.querySelectorAll('img');
            let loadedCount = 0;
            const totalImages = images.length;

            if (totalImages === 0) {
                // No images, finish loading
                setTimeout(() => setIsLoading(false), 800);
                return;
            }

            const checkAllLoaded = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    setTimeout(() => setIsLoading(false), 500);
                }
            };

            images.forEach((img) => {
                if (img.complete) {
                    checkAllLoaded();
                } else {
                    img.addEventListener('load', checkAllLoaded);
                    img.addEventListener('error', checkAllLoaded);
                }
            });

            // Fallback timeout - force finish after 3 seconds
            const fallbackTimer = setTimeout(() => {
                setIsLoading(false);
            }, 3000);

            return () => {
                clearTimeout(fallbackTimer);
                images.forEach((img) => {
                    img.removeEventListener('load', checkAllLoaded);
                    img.removeEventListener('error', checkAllLoaded);
                });
            };
        };

        // Start checking after a small delay to ensure DOM is ready
        const timer = setTimeout(handleLoad, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head title={title ?? ''}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            {/* Loading Overlay */}
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFDFC] dark:bg-[#0a0a0a]"
                    >
                        {/* Animated Coffee Cup */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8 text-8xl"
                        >
                            ☕
                        </motion.div>

                        {/* Brand Name */}
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6"
                        >
                            Omi's Cafe
                        </motion.h1>

                        {/* Animated Dots */}
                        <div className="flex gap-2">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{
                                        scale: [0, 1, 0],
                                        backgroundColor: ["#4d6443", "#8b6341", "#4d6443"]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut"
                                    }}
                                    className="w-3 h-3 rounded-full"
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <motion.div
                className="flex relative flex-col items-center bg-[#FDFDFC] text-[#1b1b18] lg:justify-center dark:bg-[#0a0a0a]"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.5 }}
            >
                <Navbar canRegister={true} />
                <div className={`flex flex-col w-full opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 pt-10 ${className}`}>
                    {children}
                </div>
            </motion.div>
        </>
    );
}
