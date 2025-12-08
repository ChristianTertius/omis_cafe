import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { Category, Drink } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from './ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from './ui/textarea';
import { X } from 'lucide-react';

interface Props {
    categories: Category[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    drink?: Drink | null;
}

export default function DrinkModal({ categories, open, onOpenChange, drink }: Props) {
    const isEdit = !!drink;

    const [ingredients, setIngredients] = useState<string[]>([]);
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        category_id: '',
        name: '',
        ingredients: [] as string[],
        price: '',
        description: '',
        image: null as File | null,
    });

    // Load data on edit or reset on create
    useEffect(() => {
        if (drink) {
            // EDIT MODE
            setData({
                category_id: drink.category_id.toString(),
                name: drink.name,
                ingredients: drink.ingredients,
                price: drink.price.toString(),
                description: drink.description,
                image: null,
            });

            setIngredients(drink.ingredients);
            setImagePreview(drink.img_url ? `/storage/${drink.img_url}` : null);
        } else {
            // CREATE MODE
            reset();
            setIngredients([]);
            setImagePreview(null);
        }
        setCurrentIngredient('');
    }, [drink, open]);

    const handleAddIngredient = () => {
        const trimmed = currentIngredient.trim();
        if (trimmed && !ingredients.includes(trimmed)) {
            const newIngredients = [...ingredients, trimmed];
            setIngredients(newIngredients);
            setData('ingredients', newIngredients);
            setCurrentIngredient('');
        }
    };

    const handleRemoveIngredient = (index: number) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
        setData('ingredients', newIngredients);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddIngredient();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        reset();
        setIngredients([]);
        setImagePreview(null);
        setCurrentIngredient('');
        onOpenChange(false);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEdit) {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('category_id', data.category_id);
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('description', data.description);

            data.ingredients.forEach((ingredient, index) => {
                formData.append(`ingredients[${index}]`, ingredient);
            });

            if (data.image) {
                formData.append('image', data.image);
            }

            post(`/drinks/${drink!.id}`, {
                data: formData,
                forceFormData: true,
                onSuccess: handleClose,
                preserveScroll: true,
            });
        } else {
            post('/drinks', {
                forceFormData: true,
                onSuccess: handleClose,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Edit Drink' : 'Add New Drink'}
                    </DialogTitle>
                </DialogHeader>

                <div onSubmit={submit} className="space-y-4">

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Category *</label>

                        <Select
                            value={data.category_id}
                            onValueChange={(value) => setData('category_id', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id.toString()}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {errors.category_id && (
                            <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>
                        )}
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <Input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g., Caramel Macchiato"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Ingredients with Badge */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Ingredients *</label>

                        <div className="flex gap-2 mb-3">
                            <Input
                                type="text"
                                value={currentIngredient}
                                onChange={(e) => setCurrentIngredient(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type ingredient and press Enter"
                                className="flex-1"
                            />
                            <Button
                                type="button"
                                onClick={handleAddIngredient}
                                size="sm"
                            >
                                Add
                            </Button>
                        </div>

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
                        )}
                        {/* Badge Container */}
                        <div className="flex flex-wrap gap-2 rounded-md">
                            {ingredients.length === 0 ? (
                                <span className="text-muted-foreground text-sm">No ingredients added yet</span>
                            ) : (
                                ingredients.map((ingredient, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center py-1 px-2 bg-black/5 border text-primary rounded-full text-xs font-medium"
                                    >
                                        {ingredient}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveIngredient(index)}
                                            className="cursor-pointer ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                                        >
                                            <X size={10} />
                                        </button>
                                    </span>
                                ))
                            )}
                        </div>

                        {errors.ingredients && (
                            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Price (Rp) *</label>
                        <Input
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            placeholder="25000"
                            min="0"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                        )}
                    </div>

                    {/* Description */}
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

                    {/* Image */}
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
                        <Button type="button" onClick={submit} disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update Drink' : 'Save Drink'}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
