<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Drink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DrinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('drinks/index', [
            'drinks' => Drink::with('category')->get(),
            'categories' => Category::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('drinks/create', [
            'drinks' => Drink::with('category')->get(),
            'categories' => Category::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'ingredients' => 'nullable|array',
            'ingredients.*' => 'string',
            'price' => 'required|integer|min:0',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('drinks', 'public');
            $validated['img_url'] = $path;
        }

        // Remove 'image' key and keep 'img_url'
        unset($validated['image']);

        Drink::create($validated);

        return redirect()->route('drinks.create')
            ->with('success', 'Drink created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Drink $drink)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Drink $drink)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Drink $drink)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'ingredients' => 'nullable|array',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Update data
        $drink->category_id = $validated['category_id'];
        $drink->name = $validated['name'];
        $drink->ingredients = $validated['ingredients'] ?? [];
        $drink->price = $validated['price'];
        $drink->description = $validated['description'];

        // Handle image upload if new image provided
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($drink->img_url) {
                Storage::delete('public/' . $drink->img_url);
            }

            // Store new image
            $path = $request->file('image')->store('drinks', 'public');
            $drink->img_url = $path;
        }

        $drink->save();

        return redirect()->back()->with('success', 'Drink updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Drink $drink)
    {
        // Hapus image dari storage
        if ($drink->img_url) {
            $imagePath = storage_path('app/public/' . $drink->img_url);
            if (File::exists($imagePath)) {
                File::delete($imagePath);
            }
        }

        $drink->delete();

        return redirect()->route('drinks.create')
            ->with('success', 'Drink deleted successfully!');
    }
}
