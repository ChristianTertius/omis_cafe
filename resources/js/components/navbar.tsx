import { dashboard, login, register } from '@/routes';
import { Link, router, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { about, contactus, drinks, findus, welcome, gallery } from '@/semuaroutes';
import { useState, useEffect, useRef } from 'react';

export default function Navbar({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage<SharedData>().props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    return (
        <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl flex items-center justify-between">
            <Link href={welcome()} className='text-xl'>Omi's Cafe</Link>
            <nav className="flex items-center justify-end gap-4">
                <Link href={drinks()}>Drinks</Link>
                <Link href={about()}>About</Link>
                <Link href={gallery()}>Gallery</Link>
                <Link href={contactus()}>Contact Us</Link>
                <Link href={findus()}>Find Us</Link>
                {auth.user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 rounded-sm border border-transparena transition-all duration-150 px-3 py-1.5 hover:border-[#19140035] dark:hover:border-[#3E3E3A]"
                        >
                            <span>👋 {auth.user.name}</span>
                            <svg
                                className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[#1b1b18] border border-[#19140035] dark:border-[#3E3E3A] z-50">
                                <div className="py-1">
                                    <Link
                                        href={dashboard()}
                                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#2a2a26]"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#2a2a26] text-red-600 dark:text-red-400"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link
                            href={login()}
                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                        >
                            Log in
                        </Link>
                        {/* {canRegister && ( */}
                        {/*     <Link */}
                        {/*         href={register()} */}
                        {/*         className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]" */}
                        {/*     > */}
                        {/*         Register */}
                        {/*     </Link> */}
                        {/* )} */}
                    </>
                )}
            </nav>
        </header>
    );
}
