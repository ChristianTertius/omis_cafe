import DrinkModal from '@/components/DrinkModal';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Gallery, SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Pencil, TrashIcon } from 'lucide-react';
import GalleryModal from '@/components/GalleryModal';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Galleries', href: dashboard().url },
];

interface Props {
    galleries: Gallery[];
}

export default function Create({ galleries }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null) // buat detect edit/create galleries, null -> create, !null -> updated

    const { flash } = usePage<SharedData>().props;

    const handleCreate = () => {
        setSelectedGallery(null);
        setModalOpen(true);
    }

    const handleEdit = (gallery: Gallery) => {
        setSelectedGallery(gallery)
        setModalOpen(true);
    }

    const handleDelete = (gallery: Gallery) => {
        if (confirm(`Delete "${gallery.name}"?`)) {
            router.delete(`/galleries/${gallery.id}`)
        }
    }

    useEffect(() => {
        if (flash?.success) toast.success(flash.success)
        if (flash?.error) toast.error(flash.error)
    }, [flash])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galleries" />
            <Toaster position="top-center" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='p-5 w-7xl'>
                    <Button onClick={handleCreate}>
                        Add New Gallery
                    </Button>
                    <div className='relative my-2 mx-auto overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default'>
                        <table className="w-full text-sm text-center">
                            <thead className="bg-neutral-secondary-soft border-b border-default">
                                <tr>
                                    <th className="px-6 py-3 w-10">No</th>
                                    <th className="px-6 py-3">Image</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {galleries.map((gallery, index) => (
                                    <tr key={gallery.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                        <td className="px-6 py-4">{index + 1}</td>

                                        <td className="px-6 py-4 flex justify-center">
                                            <img
                                                src={gallery.img_url ? `/storage/${gallery.img_url}` : `/default-img.png`}
                                                alt={gallery.name}
                                                className="w-14 h-14 object-cover rounded-lg border"
                                            />
                                        </td>

                                        <td className="px-6 py-4 font-medium">{gallery.name}</td>
                                        <td className="px-6 py-4">{gallery.description}</td>
                                        <td className="px-6 py-4">{gallery.date}</td>

                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 justify-center items-center">
                                                <Button variant={'outline'} size="sm" onClick={() => handleEdit(gallery)}>
                                                    <Pencil />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(gallery)}
                                                >
                                                    <TrashIcon />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <GalleryModal
                onOpenChange={setModalOpen}
                gallery={selectedGallery}
                open={modalOpen}
            />

        </AppLayout>
    );
}
