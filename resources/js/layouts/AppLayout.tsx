import Navbar from '@/components/navbar';
import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';
import Footer from '@/components/footer';

interface AppLayoutProps {
    title?: string;
    className?: string;
}

export default function AppLayout({ title, children, className }: PropsWithChildren<AppLayoutProps>) {
    return (
        <>
            <Head title={title ?? ''}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex flex-col items-center bg-[#FDFDFC] text-[#1b1b18] lg:justify-center dark:bg-[#0a0a0a]">
                <Navbar canRegister={true} />

                <div className={`flex flex-col w-full opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 pt-10 ${className}`}>
                    {children}
                </div>

                <div className="hidden h-14.5 lg:block"></div>
            </div>
            <Footer />
        </>
    );
}
