<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Drink;
use App\Models\Gallery;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'christian160103@gmail.com'],
            [
                'name' => 'Anton Budi Wawan',
                'password' => 'jjjjjjjjj',
                'email_verified_at' => now(),
            ]
        );
        // Seed categories
        $coffee = Category::firstOrCreate(['name' => 'Coffee', 'description' => 'this is coffee']);
        $matcha = Category::firstOrCreate(['name' => 'Matcha', 'description' => 'this is matcha']);

        // Seed drinks
        Drink::firstOrCreate(
            ['name' => 'Cappuccino'],
            [
                'category_id' => $coffee->id,
                'ingredients' => ['espresso', 'milk', 'foam'],
                'description' => 'Classic cappuccino',
                'price' => 30000,
                'img_url' => 'https://noir.web.id/wp-content/uploads/2022/04/jual-cappucino-terdekat.jpg',
            ]
        );

        Drink::firstOrCreate(
            ['name' => 'Americano'],
            [
                'category_id' => $coffee->id,
                'ingredients' => ['espresso', 'water'],
                'description' => 'Classic Americano',
                'price' => 22000,
                'img_url' => 'https://mocktail.net/wp-content/uploads/2022/03/homemade-Iced-Americano-recipe_1ig.jpg',
            ]
        );

        Drink::firstOrCreate(
            ['name' => 'Cafe Latte'],
            [
                'category_id' => $coffee->id,
                'ingredients' => ['espresso', 'steamed milk'],
                'description' => 'Cafe Latte',
                'price' => 23000,
                'img_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR8Q_RrELDLpBSuhHF9CEAWgSBo9mRQtSy-g&s',
            ]
        );

        Drink::firstOrCreate(
            ['name' => 'Vanila Latte'],
            [
                'category_id' => $coffee->id,
                'ingredients' => ['espresso', 'steamed milk', 'vanila'],
                'description' => 'Vanila Latte',
                'price' => 25000,
                'img_url' => 'https://carmyy.com/wp-content/uploads/2022/12/iced-coffee.jpg',
            ]
        );

        Drink::firstOrCreate(
            ['name' => 'Green Tea'],
            [
                'category_id' => $matcha->id,
                'ingredients' => ['green tea leaves', 'hot water'],
                'description' => 'Refreshing green tea',
                'price' => 25000,
                'img_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ33qilIUR3yAi0q3fqhcrlh3mO4KHmmAqWg&s',
            ]
        );

        // seeder by gpt
        // =====================
        // COFFEE DRINKS (20)
        // =====================
        $coffeeDrinks = [
            [
                'name' => 'Mocha',
                'ingredients' => ['espresso', 'milk', 'chocolate'],
                'price' => 27000,
                'description' => 'Mocha with chocolate flavor',
                'img_url' => 'https://images.unsplash.com/photo-1587017531659-3d8c3ad3ec22',
            ],
            [
                'name' => 'Caramel Latte',
                'ingredients' => ['espresso', 'milk', 'caramel'],
                'price' => 28000,
                'description' => 'Latte with caramel syrup',
                'img_url' => 'https://images.unsplash.com/photo-1621372071468-d9333c2a3daa',
            ],
            [
                'name' => 'Hazelnut Latte',
                'ingredients' => ['espresso', 'milk', 'hazelnut syrup'],
                'price' => 28000,
                'description' => 'Hazelnut flavored latte',
                'img_url' => 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13',
            ],
            [
                'name' => 'Flat White',
                'ingredients' => ['espresso', 'milk'],
                'price' => 26000,
                'description' => 'Smooth flat white coffee',
                'img_url' => 'https://images.unsplash.com/photo-1511920170033-f8396924c348',
            ],
            [
                'name' => 'Macchiato',
                'ingredients' => ['espresso', 'milk foam'],
                'price' => 23000,
                'description' => 'Espresso marked with milk foam',
                'img_url' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
            ],
            [
                'name' => 'Caramel Macchiato',
                'ingredients' => ['espresso', 'milk', 'caramel'],
                'price' => 30000,
                'description' => 'Caramel-flavored macchiato',
                'img_url' => 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e4b',
            ],
            [
                'name' => 'Cold Brew',
                'ingredients' => ['coffee', 'water'],
                'price' => 24000,
                'description' => 'Cold brew coffee',
                'img_url' => 'https://images.unsplash.com/photo-1561882468-9110e03e0f78',
            ],
            [
                'name' => 'Iced Coffee Milk',
                'ingredients' => ['coffee', 'milk', 'sugar'],
                'price' => 20000,
                'description' => 'Sweet iced coffee with milk',
                'img_url' => 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13',
            ],
            [
                'name' => 'Double Espresso',
                'ingredients' => ['espresso'],
                'price' => 22000,
                'description' => 'Strong double espresso',
                'img_url' => 'https://images.unsplash.com/photo-1558392141-7a8c6c35e2a4',
            ],
            [
                'name' => 'Affogato',
                'ingredients' => ['espresso', 'ice cream'],
                'price' => 32000,
                'description' => 'Espresso with ice cream',
                'img_url' => 'https://images.unsplash.com/photo-1600271886742-f0445c27958a',
            ],
            [
                'name' => 'Brown Sugar Latte',
                'ingredients' => ['espresso', 'milk', 'brown sugar'],
                'price' => 28000,
                'description' => 'Latte with brown sugar',
                'img_url' => 'https://images.unsplash.com/photo-1530041681819-7af55ed9d874',
            ],
            [
                'name' => 'Creamy Ice Coffee',
                'ingredients' => ['coffee', 'cream', 'milk'],
                'price' => 25000,
                'description' => 'Creamy iced coffee',
                'img_url' => 'https://images.unsplash.com/photo-1541167760496-1628856ab772',
            ],
            [
                'name' => 'Butterscotch Latte',
                'ingredients' => ['espresso', 'milk', 'butterscotch'],
                'price' => 30000,
                'description' => 'Butterscotch flavored latte',
                'img_url' => 'https://images.unsplash.com/photo-1621372071468-d9333c2a3daa',
            ],
            [
                'name' => 'Tiramisu Latte',
                'ingredients' => ['espresso', 'milk', 'tiramisu syrup'],
                'price' => 32000,
                'description' => 'Latte with tiramisu flavor',
                'img_url' => 'https://images.unsplash.com/photo-1598170845058-32a9e1a27a0f',
            ],
            [
                'name' => 'Irish Coffee (Non-Alcohol)',
                'ingredients' => ['coffee', 'cream', 'brown sugar'],
                'price' => 30000,
                'description' => 'Irish-style non-alcoholic coffee',
                'img_url' => 'https://images.unsplash.com/photo-1612197525949-63da7aee1e90',
            ],
            [
                'name' => 'Espresso Con Panna',
                'ingredients' => ['espresso', 'whipped cream'],
                'price' => 26000,
                'description' => 'Espresso topped with cream',
                'img_url' => 'https://images.unsplash.com/photo-1527168457795-09401c8c7f56',
            ],
            [
                'name' => 'Iced Caramel Coffee',
                'ingredients' => ['coffee', 'milk', 'caramel'],
                'price' => 26000,
                'description' => 'Iced coffee with caramel',
                'img_url' => 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13',
            ],
            [
                'name' => 'Honey Latte',
                'ingredients' => ['espresso', 'milk', 'honey'],
                'price' => 27000,
                'description' => 'Latte sweetened with honey',
                'img_url' => 'https://images.unsplash.com/photo-1587934743871-0a1b1a2b6a5d',
            ],
            [
                'name' => 'Cinnamon Latte',
                'ingredients' => ['espresso', 'milk', 'cinnamon'],
                'price' => 27000,
                'description' => 'Latte with cinnamon',
                'img_url' => 'https://images.unsplash.com/photo-1541167760496-1628856ab772',
            ],
            [
                'name' => 'Salted Caramel Coffee',
                'ingredients' => ['coffee', 'milk', 'salted caramel'],
                'price' => 30000,
                'description' => 'Coffee with salted caramel',
                'img_url' => 'https://images.unsplash.com/photo-1600271886742-f0445c27958a',
            ],
        ];

        foreach ($coffeeDrinks as $drink) {
            Drink::firstOrCreate(
                ['name' => $drink['name']],
                array_merge($drink, ['category_id' => $coffee->id])
            );
        }


        // =====================
        // MATCHA DRINKS (20)
        // =====================
        $matchaDrinks = [
            [
                'name' => 'Matcha Latte',
                'ingredients' => ['matcha', 'milk'],
                'price' => 25000,
                'description' => 'Smooth matcha latte',
                'img_url' => 'https://images.unsplash.com/photo-1584270354949-1c611a25f89a',
            ],
            [
                'name' => 'Iced Matcha Latte',
                'ingredients' => ['matcha', 'milk', 'ice'],
                'price' => 25000,
                'description' => 'Refreshing iced matcha latte',
                'img_url' => 'https://images.unsplash.com/photo-1543353071-873f17a7a088',
            ],
            [
                'name' => 'Matcha Milkshake',
                'ingredients' => ['matcha', 'milk', 'ice cream'],
                'price' => 28000,
                'description' => 'Matcha blended with ice cream',
                'img_url' => 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee',
            ],
            [
                'name' => 'Matcha Smoothie',
                'ingredients' => ['matcha', 'milk', 'ice'],
                'price' => 26000,
                'description' => 'Thick matcha smoothie',
                'img_url' => 'https://images.unsplash.com/photo-1520591799316-6c67cf3633a1',
            ],
            [
                'name' => 'Matcha Float',
                'ingredients' => ['matcha', 'ice cream'],
                'price' => 27000,
                'description' => 'Matcha + ice cream float',
                'img_url' => 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
            ],
            [
                'name' => 'Matcha Lemonade',
                'ingredients' => ['matcha', 'lemon', 'water'],
                'price' => 24000,
                'description' => 'Matcha mixed with lemon water',
                'img_url' => 'https://images.unsplash.com/photo-1562158070-59b16d9bb1f9',
            ],
            [
                'name' => 'Matcha Soda',
                'ingredients' => ['matcha', 'soda'],
                'price' => 24000,
                'description' => 'Sparkling matcha drink',
                'img_url' => 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc',
            ],
            [
                'name' => 'Matcha Coconut Latte',
                'ingredients' => ['matcha', 'coconut milk'],
                'price' => 28000,
                'description' => 'Creamy coconut matcha latte',
                'img_url' => 'https://images.unsplash.com/photo-1590149107331-bf7c035b2d47',
            ],
            [
                'name' => 'Matcha Pandan Latte',
                'ingredients' => ['matcha', 'pandan', 'milk'],
                'price' => 28000,
                'description' => 'Pandan-infused matcha latte',
                'img_url' => 'https://images.unsplash.com/photo-1568043210943-842a9a0605a0',
            ],
            [
                'name' => 'Matcha Espresso Fusion',
                'ingredients' => ['matcha', 'milk', 'espresso'],
                'price' => 30000,
                'description' => 'Matcha layered with espresso',
                'img_url' => 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
            ],
            [
                'name' => 'Honey Matcha',
                'ingredients' => ['matcha', 'milk', 'honey'],
                'price' => 26000,
                'description' => 'Matcha sweetened with honey',
                'img_url' => 'https://images.unsplash.com/photo-1584270354949-1c611a25f89a',
            ],
            [
                'name' => 'Matcha Brown Sugar',
                'ingredients' => ['matcha', 'milk', 'brown sugar'],
                'price' => 29000,
                'description' => 'Matcha with brown sugar',
                'img_url' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
            ],
            [
                'name' => 'Strawberry Matcha Latte',
                'ingredients' => ['matcha', 'milk', 'strawberry'],
                'price' => 30000,
                'description' => 'Aesthetic strawberry + matcha mix',
                'img_url' => 'https://images.unsplash.com/photo-1551022370-1d47a0e43c6f',
            ],
            [
                'name' => 'Matcha Avocado',
                'ingredients' => ['matcha', 'avocado', 'milk'],
                'price' => 32000,
                'description' => 'Creamy avocado matcha',
                'img_url' => 'https://images.unsplash.com/photo-1551022370-1d47a0e43c6f',
            ],
            [
                'name' => 'Matcha Banana Smoothie',
                'ingredients' => ['matcha', 'banana', 'milk'],
                'price' => 30000,
                'description' => 'Matcha + banana blend',
                'img_url' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
            ],
            [
                'name' => 'Matcha Oreo',
                'ingredients' => ['matcha', 'milk', 'oreo'],
                'price' => 30000,
                'description' => 'Oreo blended with matcha',
                'img_url' => 'https://images.unsplash.com/photo-1543353071-873f17a7a088',
            ],
            [
                'name' => 'Vanilla Matcha Latte',
                'ingredients' => ['matcha', 'milk', 'vanilla'],
                'price' => 26000,
                'description' => 'Matcha with vanilla',
                'img_url' => 'https://images.unsplash.com/photo-1543353071-873f17a7a088',
            ],
            [
                'name' => 'Matcha Cream Cheese',
                'ingredients' => ['matcha', 'milk', 'cream cheese'],
                'price' => 32000,
                'description' => 'Matcha topped with cheese foam',
                'img_url' => 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
            ],
            [
                'name' => 'Matcha Jelly Latte',
                'ingredients' => ['matcha', 'milk', 'jelly'],
                'price' => 28000,
                'description' => 'Matcha latte with jelly',
                'img_url' => 'https://images.unsplash.com/photo-1563963460485-289a2b3253bf',
            ],
            [
                'name' => 'Matcha Almond Milk',
                'ingredients' => ['matcha', 'almond milk'],
                'price' => 30000,
                'description' => 'Lactose-free almond matcha',
                'img_url' => 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853',
            ],
        ];

        foreach ($matchaDrinks as $drink) {
            Drink::firstOrCreate(
                ['name' => $drink['name']],
                array_merge($drink, ['category_id' => $matcha->id])
            );
        }
        // end seeder by gpt

        Gallery::firstOrCreate(
            ['name' => 'Cafe Gallery'],
            [
                'img_url' => 'https://img.freepik.com/foto-premium/secangkir-kopi-latte-panas-di-atas-meja-di-kafe-dengan-kedalaman-bidang-yang-dangkal_258743-129.jpg?semt=ais_se_enriched&w=740&q=80',
                'description' => 'This is a cafe gallery',
                'date' => '2022-12-01',
            ]
        );
        Gallery::firstOrCreate(
            ['name' => 'Casier Cafe'],
            [
                'img_url' => 'https://img.freepik.com/free-photo/smiley-business-woman-working-cashier_23-2148366564.jpg?semt=ais_se_enriched&w=740&q=80',
                'description' => 'our cashier',
                'date' => '2022-12-08',
            ]
        );


        Role::firstOrCreate(['name' => 'owner']);
        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'customer']);
    }
}
