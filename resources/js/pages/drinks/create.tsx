import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Category, PageProps } from '@/types';
import { Button } from '@/components/ui/button';

interface Props extends PageProps {
    categories: Category[];
}

export default function Create({ categories }: Props) {
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name: '',
        ingredients: [] as string[],
        price: '',
        description: '',
        image: null as File | null,
    });

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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/drinks');
    };

    return (
        <>
            <Head title="Add New Drink" />

            <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Button variant="outline" asChild>
                        <Link href="/drinks">← Back to Drinks</Link>
                    </Button>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                        Add New Drink
                    </h1>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category *
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>
                            )}
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="e.g., Caramel Macchiato"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Ingredients */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Ingredients
                            </label>
                            <div className="space-y-2">
                                {ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={ingredient}
                                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                                            className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Price (Rp) *
                            </label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="25000"
                                min="0"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description *
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                rows={4}
                                placeholder="Describe the drink..."
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Image *
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full text-sm text-gray-500 dark:text-gray-400
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-indigo-50 file:text-indigo-700
                                    hover:file:bg-indigo-100
                                    dark:file:bg-indigo-900 dark:file:text-indigo-300"
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

                        {/* Submit Button */}
                        <div className="flex items-center justify-end gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                asChild
                            >
                                <Link href="/drinks">Cancel</Link>
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save Drink'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
