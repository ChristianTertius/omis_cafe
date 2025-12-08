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

    // Filter & Search States
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [priceRangeFilter, setPriceRangeFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('name-asc');

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

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

    // Filter & Search Logic
    const getFilteredAndSortedDrinks = () => {
        let filtered = [...drinks];

        // Search
        if (searchQuery) {
            filtered = filtered.filter(drink =>
                drink.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                drink.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                drink.ingredients?.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Category Filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(drink => drink.category_id === parseInt(categoryFilter));
        }

        // Price Range Filter
        if (priceRangeFilter !== 'all') {
            filtered = filtered.filter(drink => {
                switch (priceRangeFilter) {
                    case 'low': return drink.price < 50000;
                    case 'medium': return drink.price >= 50000 && drink.price < 100000;
                    case 'high': return drink.price >= 100000;
                    default: return true;
                }
            });
        }

        // Sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc': return a.name.localeCompare(b.name);
                case 'name-desc': return b.name.localeCompare(a.name);
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'newest': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case 'oldest': return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                default: return 0;
            }
        });

        return filtered;
    };

    const filteredDrinks = getFilteredAndSortedDrinks();

    // Pagination Logic
    const totalPages = Math.ceil(filteredDrinks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedDrinks = filteredDrinks.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, categoryFilter, priceRangeFilter, sortBy, itemsPerPage]);

    // Export to CSV
    const handleExportCSV = () => {
        const headers = ['No', 'Name', 'Category', 'Ingredients', 'Description', 'Price'];
        const csvContent = [
            headers.join(','),
            ...filteredDrinks.map((drink, index) => [
                index + 1,
                `"${drink.name}"`,
                `"${drink.category?.name || ''}"`,
                `"${drink.ingredients?.join('; ') || ''}"`,
                `"${drink.description}"`,
                drink.price
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `drinks_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        toast.success('Data exported successfully!');
    };

    // Export to JSON
    const handleExportJSON = () => {
        const jsonContent = JSON.stringify(filteredDrinks, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `drinks_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        toast.success('Data exported successfully!');
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
                <div className='p-5'>
                    {/* Header Actions */}
                    <div className="flex justify-between items-center mb-4">
                        <Button onClick={handleCreate}>
                            Add New Drink
                        </Button>

                        <div className="flex gap-2">
                            <Button variant="outline" onClick={handleExportCSV}>
                                <Download className="mr-2 h-4 w-4" />
                                Export CSV
                            </Button>
                            <Button variant="outline" onClick={handleExportJSON}>
                                <Download className="mr-2 h-4 w-4" />
                                Export JSON
                            </Button>
                        </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="bg-neutral-primary-soft border border-default rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search drinks..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Category Filter */}
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map(cat => (
                                        <SelectItem key={cat.id} value={cat.id.toString()}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Price Range Filter */}
                            <Select value={priceRangeFilter} onValueChange={setPriceRangeFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Price Range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Prices</SelectItem>
                                    <SelectItem value="low">&lt; 50,000</SelectItem>
                                    <SelectItem value="medium">50,000 - 100,000</SelectItem>
                                    <SelectItem value="high">&gt; 100,000</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Sort By */}
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                                    <SelectItem value="price-asc">Price (Low-High)</SelectItem>
                                    <SelectItem value="price-desc">Price (High-Low)</SelectItem>
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Results Info */}
                        <div className="mt-3 text-sm text-gray-600">
                            Showing {paginatedDrinks.length} of {filteredDrinks.length} drinks
                            {filteredDrinks.length !== drinks.length && ` (filtered from ${drinks.length} total)`}
                        </div>
                    </div>

                    {/* Table */}
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
                                {paginatedDrinks.length > 0 ? (
                                    paginatedDrinks.map((drink, index) => (
                                        <tr key={drink.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                            <td className="px-6 py-4">{startIndex + index + 1}</td>
                                            <td className="px-6 py-4 font-medium">{drink.name}</td>
                                            <td className="px-6 py-4">{drink.category?.name}</td>
                                            <td className="px-6 py-4">{drink.ingredients?.join(', ')}</td>
                                            <td className="px-6 py-4">{drink.description}</td>
                                            <td className="px-6 py-4">Rp {drink.price.toLocaleString('id-ID')}</td>

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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                            No drinks found matching your filters
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredDrinks.length > 0 && (
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Items per page:</span>
                                <Select value={itemsPerPage.toString()} onValueChange={(v) => setItemsPerPage(parseInt(v))}>
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>

                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(page => {
                                            // Show first, last, current, and pages around current
                                            return page === 1 ||
                                                page === totalPages ||
                                                Math.abs(page - currentPage) <= 1;
                                        })
                                        .map((page, index, array) => {
                                            // Add ellipsis if there's a gap
                                            const showEllipsisBefore = index > 0 && page - array[index - 1] > 1;
                                            return (
                                                <div key={page} className="flex items-center">
                                                    {showEllipsisBefore && <span className="px-2">...</span>}
                                                    <Button
                                                        variant={currentPage === page ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setCurrentPage(page)}
                                                    >
                                                        {page}
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <DrinkModal
                categories={categories}
                drink={selectedDrink}
                open={modalOpen}
                onOpenChange={setModalOpen}
            />
        </AppLayout>
    );
}
