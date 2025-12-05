import { dashboard, login, register } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { about, contactus, drinks, findus, welcome } from '@/semuaroutes';
export default function Navbar({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage<SharedData>().props;
    return (
        <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl flex items-center justify-between">
            <Link href={welcome()} className='text-xl'>Omi's Cafe</Link>
            <nav className="flex items-center justify-end gap-4">


                <Link href={drinks()}>Drinks</Link>
                <Link href={about()}>About</Link>
                <Link href={contactus()}>Contact Us</Link>
                <Link href={findus()}>Find Us</Link>
                {auth.user ? (
                    <Link
                        href={dashboard()}
                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                    >
                        Dashboard
                    </Link>
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
    )
}
