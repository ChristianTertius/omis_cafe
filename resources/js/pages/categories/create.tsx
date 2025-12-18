import DrinkModal from '@/components/DrinkModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast, { Toaster } from 'react-hot-toast';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Pencil, TrashIcon, Download, Search, Filter } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Drinks', href: dashboard().url },
];

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

export default function Create({ categories }: Props) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <Toaster position="top-center" />

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
                            categories.map((category, index) => (
                        <tr key={category.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                            <td className="px-6 py-4">{startIndex + index + 1}</td>
                            <td className="px-6 py-4 font-medium">{category.name}</td>

                            <td className="px-6 py-4 flex gap-2 justify-center">
                                <Button variant={'outline'} size="sm" onClick={() => handleEdit(category)}>
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
                        ))
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
