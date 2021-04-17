# ShoppingHub with backend

Extending my ShoppingHub app with Laravel backend. It is now possible to add/edit/delete shopping lists - all changes are permanently saved in the database.

## How to run this app ?
Install composer dependencies:
#### `git clone https://github.com/kjuraszek/shopping-hub`

Install npm dependencies:
#### `npm install`

Create `.env` file from `.env.example` file
Set your local database and fill credentials( `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` ) in `.env` file, eg. :
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=MY_DATABASE
DB_USERNAME=MY_USERNAME
DB_PASSWORD=MY_PASSWORD
```

Generate an app encryption key:
#### `php artisan key:generate`

Migrate the database:
#### `php artisan migrate`

Run:
#### `npm run dev`

Start server in development mode:
#### `php artisan serve`
Open (by default) [http://localhost:8000](http://localhost:8000) to view app in the browser.


## How to use this app ?
- add a new list with a Add New List button
- manage each list using its control buttons: view / edit / mark as completed / delete

