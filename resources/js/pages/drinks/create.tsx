import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Drinks',
        href: dashboard().url,
    },
];

interface Category {
    id: number;
    name: string;
}

interface Drink {
    id: number;
    name: string;
    description: string;
    img_url: string;
    price: number;
    ingredients: string[];
    category: Category;
}

interface Props {
    drinks: Drink[];
}

export default function Create({ drinks }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Drinks" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <h1>Drink Data</h1>
                <div className='p-3 shadow-sm'>
                    {drinks.map((drink) => (
                        <div className='flex gap-4 my-5'>
                            <h1>{drink.name}</h1>
                            <h1>{drink.category.name}</h1>
                            <h1>{drink.price}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
