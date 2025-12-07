import { Checkbox } from "@/components/ui/checkbox";
import AppLayout from "@/layouts/AppLayout";
import { Category, Drink } from "@/types";
import { useState, useMemo } from "react";

interface Props {
    drinks: Drink[];
    categories: Category[];
}

export default function Drinks({ drinks, categories }: Props) {
    // State untuk menyimpan category yang dipilih
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    // Toggle category selection
    const handleCategoryToggle = (categoryId: number) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId) // Remove jika sudah ada
                : [...prev, categoryId] // Tambah jika belum ada
        );
    };

    // Filter drinks berdasarkan selected categories
    const filteredDrinks = useMemo(() => {
        // Jika tidak ada category yang dipilih, tampilkan semua
        if (selectedCategories.length === 0) {
            return drinks;
        }

        // Filter drinks yang category_id-nya ada di selectedCategories
        return drinks.filter(drink =>
            drink.category_id && selectedCategories.includes(drink.category_id)
        );
    }, [drinks, selectedCategories]);

    return (
        <AppLayout title="Drinks" className="p-8">
            <div className="my-3 text-center">
                <h1 className="text-xl font-semibold">Our Drinks</h1>
            </div>
            <main className="flex gap-5 min-h-[800px]">
                {/* Sidebar Filter */}
                <div className="w-[15%] p-10 space-y-5 border rounded-sm">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-2xl">Category</h1>
                        {selectedCategories.length > 0 && (
                            <button
                                onClick={() => setSelectedCategories([])}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col gap-5">
                        {categories.map((category) => (
                            <label
                                key={category.id}
                                className="flex gap-3 items-center text-md cursor-pointer"
                            >
                                <Checkbox
                                    className="scale-125"
                                    checked={selectedCategories.includes(category.id)}
                                    onCheckedChange={() => handleCategoryToggle(category.id)}
                                />
                                <span>{category.name}</span>
                            </label>
                        ))}
                    </div>

                    {/* Info jumlah hasil */}
                    <p className="text-sm text-gray-600 mt-4">
                        Showing {filteredDrinks.length} of {drinks.length} drinks
                    </p>
                </div>

                {/* Drinks Grid */}
                <div className="flex-1">
                    {filteredDrinks.length > 0 ? (
                        <div className="grid gap-5 grid-cols-4">
                            {filteredDrinks.map((drink) => (
                                <div
                                    key={drink.id}
                                    className="p-4 dark:border-neutral-700 max-w-2xl"
                                >
                                    <img
                                        src={`/storage/${drink.img_url}`}
                                        alt={drink.name}
                                        className="w-full h-80 object-cover"
                                    />
                                    <h2 className="font-semibold text-lg mt-2">{drink.name}</h2>
                                    {/* <p className="text-sm opacity-70 mb-1"> */}
                                    {/*     Category: {drink.category?.name} */}
                                    {/* </p> */}
                                    <p className="text-sm mt-2 opacity-60">
                                        Ingredients: {drink.ingredients.join(', ')}
                                    </p>
                                    <div className="flex justify-between items-center my-3">
                                        <p className="font-semibold">
                                            Rp {drink.price.toLocaleString('id-ID')}
                                        </p>
                                        <button className="cursor-pointer text-sm py-1 px-8 bg-yellow-700 text-white hover:bg-yellow-800 transition">
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-gray-500 text-lg">
                                No drinks found for selected categories
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </AppLayout>
    );
}
