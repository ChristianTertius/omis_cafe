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

interface Props {
    categories: Category[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    drink?: Drink | null;
}

export default function DrinkModal({
    categories,
    open,
    onOpenChange,
    drink,
}: Props) {
    const isEdit = !!drink;

    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // FIXED: Remove _method from initial data
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
            setIngredients(['']);
            setImagePreview(null);
        }
    }, [drink, open]);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleRemoveIngredient = (index: number) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
        setData('ingredients', newIngredients.filter(ing => ing.trim() !== ''));
    };

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
        setData('ingredients', newIngredients.filter(ing => ing.trim() !== ''));
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
        setIngredients(['']);
        setImagePreview(null);
        onOpenChange(false);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEdit) {
            // Use POST with _method=PUT for file uploads
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('category_id', data.category_id);
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('description', data.description);

            // Add ingredients as array
            data.ingredients.forEach((ingredient, index) => {
                formData.append(`ingredients[${index}]`, ingredient);
            });

            // Add image only if new file selected
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
            <DialogContent className="max-w-2xl max-h-[100vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Edit Drink' : 'Add New Drink'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">

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

                    {/* Ingredients */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Ingredients</label>

                        <div className="space-y-2">
                            {ingredients.map((ingredient, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        type="text"
                                        value={ingredient}
                                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                                        placeholder={`Ingredient ${index + 1}`}
                                    />
                                    {ingredients.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleRemoveIngredient(index)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleAddIngredient}
                            className="mt-2"
                        >
                            + Add Ingredient
                        </Button>

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
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update Drink' : 'Save Drink'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
