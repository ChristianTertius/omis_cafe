import { Category } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: Category | null
}

export default function CategoryModal({ open, onOpenChange, category }: Props) {
    const isEdit = !!category

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: ''
    });

    useEffect(() => {
        if (category) {
            setData({
                name: category.name,
                description: category.description
            })
        } else {
            // create
            reset();
        }
    }, [category, open])

    const handleClose = () => {
        reset();
        onOpenChange(false);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(`/categories/${category!.id}`, {
                onSuccess: () => handleClose(),
                preserveScroll: true,
            });
        } else {
            post('/categories', {
                onSuccess: () => handleClose(),
                preserveScroll: true,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Edit Category' : 'Add New Category'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <Input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g., Coffee, Tea, Snacks"
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
                            placeholder="Describe the category..."
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update Category' : 'Save Category'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
