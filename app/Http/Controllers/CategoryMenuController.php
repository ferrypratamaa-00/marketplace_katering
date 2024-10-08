<?php

namespace App\Http\Controllers;

use App\Models\CategoryMenu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryMenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoryMenu = CategoryMenu::all();
        return Inertia::render('CategoryMenu/Index', [
            'categoryMenu' => $categoryMenu
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CategoryMenu/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        CategoryMenu::create($request->only('name'));

        return redirect()->route('category-menus.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(CategoryMenu $categoryMenu, $id)
    {
        $categoryMenu = CategoryMenu::findOrFail($id);
        return Inertia::render('CategoryMenu/Edit', [
            'category$categoryMenu' => $categoryMenu
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CategoryMenu $categoryMenu)
    {
        return Inertia::render('CategoryMenu/Edit', [
            'categoryMenu' => $categoryMenu
        ]);
    }


    /**
     * Update the specified resource in storage.
     */ public function update(Request $request, CategoryMenu $categoryMenu)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $categoryMenu->update($request->only('name', 'description'));

        return redirect()->route('category-menus.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoryMenu $categoryMenu)
    {
        $categoryMenu->delete();

        return redirect()->route('category-menus.index');
    }
}
