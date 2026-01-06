import CategoryModal from '@/components/CategoryModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast, { Toaster } from 'react-hot-toast';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Category, SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Pencil, TrashIcon, Download, Search } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Categories', href: dashboard().url },
];

interface Props {
    categories: Category[];
}

export default function Index({ categories }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    // Filter & Search States
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<string>('newest');

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { flash } = usePage<SharedData>().props;

    const handleCreate = () => {
        setSelectedCategory(null);
        setModalOpen(true);
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setModalOpen(true);
    };

    const handleDelete = (category: Category) => {
        if (confirm(`Delete "${category.name}"?`)) {
            router.delete(`/categories/${category.id}`);
        }
    };

    // Filter & Search Logic
    const getFilteredAndSortedCategories = () => {
        let filtered = [...categories];

        // Search
        if (searchQuery) {
            filtered = filtered.filter(category =>
                category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                category.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'newest':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case 'oldest':
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const filteredCategories = getFilteredAndSortedCategories();

    // Pagination Logic
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, sortBy, itemsPerPage]);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <Toaster position="top-center" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='p-5'>
                    {/* Header Actions */}
                    <div className="flex justify-between items-center mb-4">
                        <Button onClick={handleCreate}>
                            Add New Category
                        </Button>
                    </div>

                    {/* Filters & Search */}
                    <div className="bg-neutral-primary-soft border border-default rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search categories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Sort By */}
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Results Info */}
                        <div className="mt-3 text-sm text-gray-600">
                            Showing {paginatedCategories.length} of {filteredCategories.length} categories
                            {filteredCategories.length !== categories.length && ` (filtered from ${categories.length} total)`}
                        </div>
                    </div>

                    {/* Table */}
                    <div className='relative my-2 mx-auto overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default'>
                        <table className="w-full text-sm text-center">
                            <thead className="bg-neutral-secondary-soft border-b border-default">
                                <tr>
                                    <th className="px-6 py-3 w-10">No</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedCategories.length > 0 ? (
                                    paginatedCategories.map((category, index) => (
                                        <tr key={category.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                            <td className="px-6 py-4">{startIndex + index + 1}</td>
                                            <td className="px-6 py-4 font-medium">{category.name}</td>
                                            <td className="px-6 py-4">{category.description}</td>

                                            <td className="px-6 py-4">
                                                <div className="flex gap-2 justify-center items-center">
                                                    <Button variant={'outline'} size="sm" onClick={() => handleEdit(category)}>
                                                        <Pencil />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDelete(category)}
                                                    >
                                                        <TrashIcon />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                            No categories found matching your filters
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredCategories.length > 0 && (
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
                                            return page === 1 ||
                                                page === totalPages ||
                                                Math.abs(page - currentPage) <= 1;
                                        })
                                        .map((page, index, array) => {
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

            <CategoryModal
                onOpenChange={setModalOpen}
                category={selectedCategory}
                open={modalOpen}
            />

        </AppLayout>
    );
}
