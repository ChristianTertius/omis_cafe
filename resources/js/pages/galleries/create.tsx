import GalleryModal from '@/components/GalleryModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast, { Toaster } from 'react-hot-toast';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Gallery, SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Pencil, TrashIcon, Download, Search, Calendar } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Galleries', href: dashboard().url },
];

interface Props {
    galleries: Gallery[];
}

export default function Create({ galleries }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);

    // Filter & Search States
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { flash } = usePage<SharedData>().props;

    const handleCreate = () => {
        setSelectedGallery(null);
        setModalOpen(true);
    };

    const handleEdit = (gallery: Gallery) => {
        setSelectedGallery(gallery);
        setModalOpen(true);
    };

    const handleDelete = (gallery: Gallery) => {
        if (confirm(`Delete "${gallery.name}"?`)) {
            router.delete(`/galleries/${gallery.id}`);
        }
    };

    // Get unique years from galleries
    const getAvailableYears = () => {
        const years = galleries
            .map(g => new Date(g.date).getFullYear())
            .filter((year, index, self) => self.indexOf(year) === index)
            .sort((a, b) => b - a);
        return years;
    };

    // Filter & Search Logic
    const getFilteredAndSortedGalleries = () => {
        let filtered = [...galleries];

        // Search
        if (searchQuery) {
            filtered = filtered.filter(gallery =>
                gallery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                gallery.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Date/Year Filter
        if (dateFilter !== 'all') {
            if (dateFilter === 'this-year') {
                const currentYear = new Date().getFullYear();
                filtered = filtered.filter(gallery =>
                    new Date(gallery.date).getFullYear() === currentYear
                );
            } else if (dateFilter === 'last-year') {
                const lastYear = new Date().getFullYear() - 1;
                filtered = filtered.filter(gallery =>
                    new Date(gallery.date).getFullYear() === lastYear
                );
            } else if (dateFilter.startsWith('year-')) {
                const year = parseInt(dateFilter.split('-')[1]);
                filtered = filtered.filter(gallery =>
                    new Date(gallery.date).getFullYear() === year
                );
            }
        }

        // Sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'newest':
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                case 'oldest':
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const filteredGalleries = getFilteredAndSortedGalleries();

    // Pagination Logic
    const totalPages = Math.ceil(filteredGalleries.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedGalleries = filteredGalleries.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, dateFilter, sortBy, itemsPerPage]);

    // Format date for display
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Export to CSV
    const handleExportCSV = () => {
        const headers = ['No', 'Name', 'Description', 'Date', 'Image URL'];
        const csvContent = [
            headers.join(','),
            ...filteredGalleries.map((gallery, index) => [
                index + 1,
                `"${gallery.name}"`,
                `"${gallery.description}"`,
                `"${gallery.date}"`,
                `"${gallery.img_url || ''}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `galleries_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        toast.success('Data exported successfully!');
    };

    // Export to JSON
    const handleExportJSON = () => {
        const jsonContent = JSON.stringify(filteredGalleries, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `galleries_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        toast.success('Data exported successfully!');
    };

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const availableYears = getAvailableYears();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galleries" />
            <Toaster position="top-center" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='p-5'>
                    {/* Header Actions */}
                    <div className="flex justify-between items-center mb-4">
                        <Button onClick={handleCreate}>
                            Add New Gallery
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search galleries..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Date/Year Filter */}
                            <Select value={dateFilter} onValueChange={setDateFilter}>
                                <SelectTrigger>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <SelectValue placeholder="All Dates" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Dates</SelectItem>
                                    <SelectItem value="this-year">This Year</SelectItem>
                                    <SelectItem value="last-year">Last Year</SelectItem>
                                    {availableYears.length > 0 && (
                                        <>
                                            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">
                                                Specific Years
                                            </div>
                                            {availableYears.map(year => (
                                                <SelectItem key={year} value={`year-${year}`}>
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </>
                                    )}
                                </SelectContent>
                            </Select>

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
                            Showing {paginatedGalleries.length} of {filteredGalleries.length} galleries
                            {filteredGalleries.length !== galleries.length && ` (filtered from ${galleries.length} total)`}
                        </div>
                    </div>

                    {/* Table */}
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
                                {paginatedGalleries.length > 0 ? (
                                    paginatedGalleries.map((gallery, index) => (
                                        <tr key={gallery.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                            <td className="px-6 py-4">{startIndex + index + 1}</td>

                                            <td className="px-6 py-4 flex justify-center">
                                                <img
                                                    src={gallery.img_url ? `/storage/${gallery.img_url}` : `/default-img.png`}
                                                    alt={gallery.name}
                                                    className="w-14 h-14 object-cover rounded-lg border"
                                                />
                                            </td>

                                            <td className="px-6 py-4 font-medium">{gallery.name}</td>
                                            <td className="px-6 py-4">{gallery.description}</td>
                                            <td className="px-6 py-4">{formatDate(gallery.date)}</td>

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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                            No galleries found matching your filters
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredGalleries.length > 0 && (
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

            <GalleryModal
                onOpenChange={setModalOpen}
                gallery={selectedGallery}
                open={modalOpen}
            />

        </AppLayout>
    );
}
