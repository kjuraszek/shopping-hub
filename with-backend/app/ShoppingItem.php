<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShoppingItem extends Model
{
    protected $fillable = ['name', 'shopping_list_id', 'completed'];

}
