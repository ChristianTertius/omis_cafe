import Navbar from '@/components/navbar';
import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';
import Footer from '@/components/footer';

interface AppLayoutProps {
    title?: string;
}

export default function AppLayout({ title, children }: PropsWithChildren<AppLayoutProps>) {
    return (
        <>
            <Head title={title ?? ''}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <Navbar canRegister={true} />

                <div className="flex flex-col w-full opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 pt-10">
                    {children}
                </div>

                <div className="hidden h-14.5 lg:block"></div>
            </div>
            <Footer />
        </>
    );
}
