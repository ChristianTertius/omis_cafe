<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('galleries/index', [
            'galleries' => Gallery::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('galleries/create', [
            'galleries' => Gallery::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('galleries', 'public');
            $validated['img_url'] = $path;
        }

        // Remove 'image' key and keep 'img_url'
        unset($validated['image']);

        Gallery::create($validated);

        return redirect()->route('galleries.create')
            ->with('success', 'Gallery created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Gallery $gallery)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gallery $gallery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Update data
        $gallery->name = $validated['name'];
        $gallery->description = $validated['description'];
        $gallery->date = $validated['date'];

        // Handle image upload if new image provided
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($gallery->img_url) {
                Storage::delete('public/' . $gallery->img_url);
            }

            // Store new image
            $path = $request->file('image')->store('galleries', 'public');
            $gallery->img_url = $path;
        }

        $gallery->save();

        return redirect()->back()->with('success', 'Gallery updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery)
    {
        if ($gallery->img_url) {
            $imagePath = storage_path('app/public/' . $gallery->img_url);
            if (File::exists($imagePath)) {
                File::delete($imagePath);
            }
        }

        $gallery->delete();

        return redirect()->route('galleries.create')
            ->with('success', 'Gallery deleted successfully!');
    }
}
