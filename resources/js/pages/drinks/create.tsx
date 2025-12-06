import CreateDrinkModal from '@/components/createDrinkModal';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

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
    categories: Category[];
}

export default function Create({ drinks, categories }: Props) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleDelete = (drink: Drink) => {
        if (confirm(`Delete "${drink.name}"?`)) {
            router.delete(`/drinks/${drink.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Drinks" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    Add New Drink
                </Button>

                {drinks.map((drink) => (
                    <div
                        key={drink.id}
                        className='flex gap-10'
                    >
                        <h1>{drink.name}</h1>
                        <h1>{drink.category.name}</h1>
                        <h1>Rp {drink.price.toLocaleString('id-ID')}</h1>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(drink)}
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </div>

            <CreateDrinkModal
                categories={categories}
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
            />
        </AppLayout>
    );
}
