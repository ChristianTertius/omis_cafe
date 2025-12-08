import { Checkbox } from "@/components/ui/checkbox";
import AppLayout from "@/layouts/AppLayout";
import { Category, Drink } from "@/types";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    drinks: Drink[];
    categories: Category[];
}

export default function Drinks({ drinks, categories }: Props) {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">("name");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const handleCategoryToggle = (categoryId: number) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
        setCurrentPage(1);
    };

    const filteredAndSortedDrinks = useMemo(() => {
        let result = [...drinks];

        if (selectedCategories.length > 0) {
            result = result.filter(drink =>
                drink.category_id && selectedCategories.includes(drink.category_id)
            );
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(drink =>
                drink.name.toLowerCase().includes(query) ||
                drink.ingredients.some(ing => ing.toLowerCase().includes(query))
            );
        }

        result.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        return result;
    }, [drinks, selectedCategories, searchQuery, sortBy]);

    const totalPages = Math.ceil(filteredAndSortedDrinks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedDrinks = filteredAndSortedDrinks.slice(startIndex, endIndex);

    return (
        <AppLayout title="Drinks" className="p-8">
            <div className="my-3 text-center">
                <h1 className="text-xl font-semibold">Our Drinks</h1>
            </div>

            <div className="flex gap-4 mb-6 items-center max-w-xl mx-auto">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        type="text"
                        placeholder="Search drinks by name or ingredients..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="pl-10 w-sm"
                    />
                </div>

                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                        <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                        <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                    </SelectContent>
                </Select>

            </div>

            <main className="flex gap-5 min-h-[800px]">
                {/* Sidebar Filter */}
                <div className="w-[15%] p-6 space-y-5 border rounded-sm h-fit sticky top-8">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-xl">Category</h1>
                        {selectedCategories.length > 0 && (
                            <button
                                onClick={() => {
                                    setSelectedCategories([]);
                                    setCurrentPage(1);
                                }}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col gap-4">
                        {categories.map((category) => (
                            <label
                                key={category.id}
                                className="flex gap-3 items-center text-sm cursor-pointer hover:text-blue-600 transition-colors"
                            >
                                <Checkbox
                                    className="scale-110"
                                    checked={selectedCategories.includes(category.id)}
                                    onCheckedChange={() => handleCategoryToggle(category.id)}
                                />
                                <span>{category.name}</span>
                            </label>
                        ))}
                    </div>

                    {/* Info jumlah hasil */}
                    <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">{filteredAndSortedDrinks.length}</span> of {drinks.length} drinks
                        </p>
                    </div>
                </div>

                {/* Drinks Grid */}
                <div className="flex-1 flex flex-col">
                    {paginatedDrinks.length > 0 ? (
                        <>
                            <div className="grid gap-5 grid-cols-4">
                                {paginatedDrinks.map((drink) => (
                                    <div
                                        key={drink.id}
                                        className="p-4 border dark:border-neutral-700 rounded-lg hover:shadow-lg transition-shadow"
                                    >
                                        <img
                                            src={`/storage/${drink.img_url}`}
                                            alt={drink.name}
                                            className="w-full h-64 object-cover rounded-md"
                                        />
                                        <h2 className="font-semibold text-lg mt-3">{drink.name}</h2>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {categories.find(c => c.id === drink.category_id)?.name}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {drink.ingredients.slice(0, 3).map((ing, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full"
                                                >
                                                    {ing}
                                                </span>
                                            ))}
                                            {drink.ingredients.length > 3 && (
                                                <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                                                    +{drink.ingredients.length - 3}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <p className="font-bold text-lg">
                                                Rp {drink.price.toLocaleString('id-ID')}
                                            </p>
                                            <button className="cursor-pointer text-sm py-2 px-6 bg-yellow-700 text-white hover:bg-yellow-800 transition rounded">
                                                Buy
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-start items-center gap-2 mt-8">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft size={16} />
                                        Previous
                                    </Button>

                                    <div className="flex gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <Button
                                                key={page}
                                                variant={currentPage === page ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setCurrentPage(page)}
                                                className="w-10"
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                        <ChevronRight size={16} />
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-96">
                            <div className="text-center">
                                <p className="text-gray-500 text-lg mb-2">No drinks found</p>
                                <p className="text-gray-400 text-sm">
                                    Try adjusting your filters or search query
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </AppLayout>
    );
}
