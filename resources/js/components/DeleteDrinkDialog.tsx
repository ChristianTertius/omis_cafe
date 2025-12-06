import { router } from '@inertiajs/react';
import { Drink } from '@/types';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteDrinkDialogProps {
    drink: Drink | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteDrinkDialog({ drink, open, onOpenChange }: DeleteDrinkDialogProps) {
    const handleDelete = () => {
        if (!drink) return;

        router.delete(`/drinks/${drink.id}`, {
            onSuccess: () => {
                onOpenChange(false);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete{' '}
                        <span className="font-semibold">{drink?.name}</span> from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
