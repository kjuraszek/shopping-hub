<?php

namespace App\Http\Controllers;

use App\ShoppingList;
use Illuminate\Http\Request;

class ShoppingListController extends Controller{
    public function index(){
        $shopping_lists = ShoppingList::orderBy('id', 'ASC')->select('id', 'name', 'completed', 'priority')->get();

        return $shopping_lists->toJson();
    }

    public function store(Request $request){
        $validatedData = $request->validate([
          'name' => 'required',
          'completed' => 'required',
          'priority' => 'required',
        ]);

        $shopping_list = ShoppingList::create([
          'name' => $validatedData['name'],
          'completed' => $validatedData['completed'],
          'priority' => $validatedData['priority'],
        ]);

        return response()->json($shopping_list);
    }

    public function deleteShoppingList($id){
        $shopping_list = ShoppingList::find($id)->delete();
    }

    public function saveShoppingList(Request $request){
        $validatedData = $request->validate([
          'id' => 'required',
          'name' => 'required',
          'completed' => 'required',
          'priority' => 'required',
          'items' => 'present|array',
        ]);

        $shopping_list = ShoppingList::find($validatedData['id']);
        $shopping_list->name = $validatedData['name'];
        $shopping_list->completed = $validatedData['completed'];
        $shopping_list->priority = $validatedData['priority'];
        $shopping_list->save();
    }
}
