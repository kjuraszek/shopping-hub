<?php

namespace App\Http\Controllers;

use App\ShoppingItem;
use Illuminate\Http\Request;

class ShoppingItemController extends Controller{
    public function index(){
        $shopping_items = ShoppingItem::orderBy('id', 'ASC')->select('name', 'completed', 'shopping_list_id')->get();

        return $shopping_items->toJson();
    }

    public function deleteShoppingItems($id){
        $shopping_items = ShoppingItem::where('shopping_list_id', $id)->delete();
    }

    public function saveShoppingItems(Request $request){
        $validatedData = $request->validate([
          'id' => 'required',
          'items' => 'present|array',
        ]);

        $old_shopping_items = ShoppingItem::where('shopping_list_id', $validatedData['id'])->delete();
        
        foreach($validatedData['items'] as $new_shopping_item){
            $item = ShoppingItem::create([
                'name' => $new_shopping_item['name'],
                'shopping_list_id' => $validatedData['id'],
                'completed' => $new_shopping_item['completed'],
              ]);
        }
    }
}
