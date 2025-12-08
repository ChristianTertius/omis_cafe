import { Gallery } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    gallery?: Gallery | null
}
export default function GalleryModal({ open, onOpenChange, gallery }: Props) {
    const isEdit = !!gallery

    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: '',
        image: null as File | null,
        date: ''
    });

    useEffect(() => {
        if (gallery) {
            setData({
                name: gallery.name,
                date: gallery.date,
                description: gallery.description,
                image: null
            })

            setImagePreview(gallery.img_url ? `/storage/${gallery.img_url}` : null);
        } else {
            // create
            reset();
            setImagePreview(null);
        }
    }, [gallery, open])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setData('image', file);
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        reset();
        setImagePreview(null);
        onOpenChange(false);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = {
            _method: isEdit ? 'PUT' : 'POST',
            name: data.name,
            description: data.description,
            date: data.date,
            image: data.image,
        };

        router.post(
            isEdit ? `/galleries/${gallery!.id}` : '/galleries',
            formData,
            {
                forceFormData: true,
                onSuccess: () => handleClose(),
                preserveScroll: true,
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Edit Gallery' : 'Add New Gallery Image'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <Input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g., Cashier Photo"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description *</label>
                        <Textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={4}
                            placeholder="Describe the drink..."
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Photo Date *</label>
                        <Input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                            className="[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                            placeholder="Select date"
                        />
                        {errors.date && (
                            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Image {isEdit ? '(optional)' : '*'}</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full text-sm text-gray-500 dark:text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-gray-50 file:text-gray-700
                                hover:file:bg-gray-100
                                dark:file:bg-gray-900 dark:file:text-gray-300"
                        />

                        {imagePreview && (
                            <div className="mt-4">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-48 h-48 object-cover rounded-lg"
                                />
                            </div>
                        )}

                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update Drink' : 'Save Drink'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}
