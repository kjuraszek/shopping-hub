<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('shopping_lists', 'ShoppingListController@index');
Route::post('shopping_lists', 'ShoppingListController@store');
Route::post('shopping_lists/{id}/delete', 'ShoppingListController@deleteShoppingList');
Route::post('shopping_lists/save', 'ShoppingListController@saveShoppingList');

Route::get('shopping_items', 'ShoppingItemController@index');
Route::post('shopping_items/{id}/delete', 'ShoppingItemController@deleteShoppingItems');
Route::post('shopping_items/save', 'ShoppingItemController@saveShoppingItems');
