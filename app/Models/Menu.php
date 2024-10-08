<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Menu extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids;

    protected $table = 'menus';
    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'photo',
        'category_menu_id'
    ];

    public function categoryMenu()
    {
        return $this->belongsTo(CategoryMenu::class, 'category_menu_id', 'id');
    }
}
