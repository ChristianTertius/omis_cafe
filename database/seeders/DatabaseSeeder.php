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
                'img_url' => 'https://example.com/cappuccino.jpg',
            ]
        );

        Drink::firstOrCreate(
            ['name' => 'Green Tea'],
            [
                'category_id' => $matcha->id,
                'ingredients' => ['green tea leaves', 'hot water'],
                'description' => 'Refreshing green tea',
                'img_url' => 'https://example.com/greentea.jpg',
            ]
        );
    }
}
