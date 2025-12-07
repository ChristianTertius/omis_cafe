import DrinkModal from '@/components/DrinkModal';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Pencil, TrashIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Drinks', href: dashboard().url },
];

interface Category {
    id: number;
    name: string;
}

interface Drink {
    id: number;
    category_id: number;
    category?: Category;
    name: string;
    ingredients: string[] | null;
    price: number;
    description: string;
    img_url: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    drinks: Drink[];
    categories: Category[];
}

export default function Create({ drinks, categories }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);

    const { flash } = usePage<SharedData>().props;

    const handleDelete = (drink: Drink) => {
        if (confirm(`Delete "${drink.name}"?`)) {
            router.delete(`/drinks/${drink.id}`);
        }
    };

    const handleEdit = (drink: Drink) => {
        setSelectedDrink(drink);
        setModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedDrink(null);
        setModalOpen(true);
    };

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Drinks" />
            <Toaster position="top-center" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='p-5 w-7xl'>
                    <Button onClick={handleCreate}>
                        Add New Drink
                    </Button>

                    <div className="relative my-2 mx-auto overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                        <table className="w-full text-sm">
                            <thead className="bg-neutral-secondary-soft border-b border-default">
                                <tr>
                                    <th className="px-6 py-3">No</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3">Ingredients</th>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3">Price</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {drinks.map((drink, index) => (
                                    <tr key={drink.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4 font-medium">{drink.name}</td>
                                        <td className="px-6 py-4">{drink.category?.name}</td>
                                        <td className="px-6 py-4">{drink.ingredients?.join(', ')}</td>
                                        <td className="px-6 py-4">{drink.description}</td>
                                        <td className="px-6 py-4">{drink.price}</td>

                                        <td className="px-6 py-4 flex gap-2 justify-center">
                                            <Button variant={'outline'} size="sm" onClick={() => handleEdit(drink)}>
                                                <Pencil />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(drink)}
                                            >
                                                <TrashIcon />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <DrinkModal
                categories={categories}
                drink={selectedDrink}     // null → create, object → edit
                open={modalOpen}
                onOpenChange={setModalOpen}
            />
        </AppLayout>
    );
}
