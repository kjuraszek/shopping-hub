<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShoppingList extends Model
{
    protected $fillable = ['name', 'priority', 'completed'];

    public function items()
    {
        return $this->hasMany(ShoppingItem::class);
    }
}
