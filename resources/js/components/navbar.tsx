import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { dashboard, login, register } from '@/routes';
import { Link, router, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { about, contactus, drinks, findus, welcome, gallery } from '@/semuaroutes';
import { useState, useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartDrawer } from './CartDrawer';

export default function Navbar({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage().props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const dropdownRef = useRef(null);

    // framer motion
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (latest > lastScrollY && latest > 50) {
            setHidden(true);
        } else if (latest < lastScrollY) {
            setHidden(false);
        }
        setLastScrollY(latest);
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        router.post('/logout');
    };

    // Smooth scroll handler untuk About
    const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const aboutElement = document.getElementById('about');

        if (aboutElement) {
            // Jika elemen about ada di halaman saat ini, scroll ke sana
            const elementPosition = aboutElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 665;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            // Jika elemen about tidak ada, redirect ke halaman welcome
            router.visit(welcome(), {
                onSuccess: () => {
                    // Setelah halaman welcome ter-load, scroll ke about
                    setTimeout(() => {
                        const aboutElement = document.getElementById('about');
                        if (aboutElement) {
                            const elementPosition = aboutElement.getBoundingClientRect().top + window.pageYOffset;
                            const offsetPosition = elementPosition - 665;
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                }
            });
        }
    };

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: '-120%' },
                }}
                animate={hidden ? 'hidden' : 'visible'}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="sticky min-w-5xl mx-auto top-3 z-50 border-gray-200 p-1 bg-white/70 backdrop-blur-lg dark:border-[#3E3E3A] dark:bg-[#191400]/80 rounded-full"
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 gap-10">
                    <Link href={welcome()}>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Omi's Cafe
                        </h1>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link
                            href={drinks()}
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                        >
                            Drinks
                        </Link>
                        <a
                            href="#about"
                            onClick={scrollToAbout}
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 cursor-pointer"
                        >
                            About
                        </a>
                        <Link
                            href={gallery()}
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                        >
                            Gallery
                        </Link>
                        <Link
                            href={findus()}
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                        >
                            Find Us
                        </Link>

                        {/* Cart Button */}
                        <button
                            onClick={() => setCartOpen(true)}
                            className="relative rounded-sm border border-transparent p-2 transition-all duration-150 hover:border-[#19140035] dark:hover:border-[#3E3E3A]"
                        >
                            <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                            {/* Cart badge */}
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                0
                            </span>
                        </button>

                        {auth.user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 rounded-sm border border-transparent px-3 py-1.5 transition-all duration-150 hover:border-[#19140035] dark:hover:border-[#3E3E3A]"
                                >
                                    👋 {auth.user.name}
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-[#3E3E3A] dark:bg-[#191400]">
                                        <Link
                                            href={dashboard()}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2A2400]"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2A2400]"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </motion.nav>

            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}
