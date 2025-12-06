<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Drink;
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
    }
}
