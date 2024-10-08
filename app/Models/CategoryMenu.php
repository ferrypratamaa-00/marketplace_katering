<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class CategoryMenu extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'category_menus';
    protected $keyType = 'string';
    public $incrementing = false;


    protected $fillable = [
        'name',
    ];

     public function menu()
    {
        return $this->hasMany(Menu::class, 'category_menu', 'id');
    }

}
