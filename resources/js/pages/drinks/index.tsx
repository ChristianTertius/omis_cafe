import AppLayout from "@/layouts/AppLayout";

interface Category {
    id: number;
    name: string;
}

interface Drink {
    id: number;
    name: string;
    description: string;
    img_url: string;
    price: number;
    ingredients: string[];
    category: Category;
}

interface Props {
    drinks: Drink[];
}

export default function Drinks({ drinks }: Props) {
    return (
        <AppLayout title="Drinks">
            <div className="my-3 text-center">
                <h1 className="text-xl font-semibold">THIS IS OMI'S CAFEE || DRINKS PAGE</h1>
                <p>Drink List</p>
            </div>
            <div className="grid gap-5 grid-cols-4">
                {drinks.map((drink) => (
                    <div
                        key={drink.id}
                        className="rounded-xl border p-4 dark:border-neutral-700 max-w-2xl"
                    >
                        <img
                            src={`/storage/${drink.img_url}`}
                            alt={drink.name}
                            className="w-full h-48 object-cover"
                        />
                        <img
                            src={drink.img_url}
                            alt={drink.name}
                            className="w-full h-40 object-cover rounded-lg mb-3"
                        />
                        <h2 className="font-semibold text-lg">{drink.name}</h2>
                        <p className="text-sm opacity-70 mb-1">
                            Category: {drink.category?.name}
                        </p>
                        <p className="text-sm">{drink.description}</p>

                        <p className="text-xs mt-2 opacity-60">
                            Ingredients: {drink.ingredients.join(', ')}
                        </p>

                        <div className="flex justify-between items-center my-3">
                            <p>
                                {drink.price}
                            </p>
                            <button className="text-sm py-1 px-8 bg-yellow-700 text-white rounded-md">Buy</button>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
