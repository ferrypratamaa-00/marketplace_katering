<?php

namespace App\Http\Controllers;

use App\Models\CategoryMenu;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menu = Menu::with('categoryMenu')->get();
        return Inertia::render('Menu/Index', [
            'menus' => $menu
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categoryMenu = CategoryMenu::all();
        return Inertia::render('Menu/Create', [
            'categoryMenu' => $categoryMenu
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_menu_id' => 'required|uuid|exists:category_menus,id',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only('name', 'category_menu_id', 'price', 'description');

        if ($request->hasFile('photo')) {
            $fileName = time() . '.' . $request->photo->extension();
            $request->photo->move(public_path('uploads'), $fileName);
            $data['photo'] = $fileName;
        }

        Menu::create($data);

        return redirect()->route('menus.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        $categoryMenu = CategoryMenu::all();
        return Inertia::render('Menu/Edit', [
            'menu' => $menu,
            'categoryMenu' => $categoryMenu
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_menu_id' => 'required|uuid|exists:category_menus,id',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only('name', 'category_menu_id', 'price', 'description');

        if ($request->hasFile('photo')) {
            if ($menu->photo) {
                File::delete(public_path('uploads/' . $menu->photo));
            }

            $fileName = time() . '.' . $request->photo->extension();
            $request->photo->move(public_path('uploads'), $fileName);
            $data['photo'] = $fileName;
        }

        $menu->update($data);

        return redirect()->route('menus.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        $menu->delete();

        return redirect()->route('menu.index');
    }
}
