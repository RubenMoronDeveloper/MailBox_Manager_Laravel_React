# Mailbox Manager 

This project consists of an api in Laravel 9 connected to a React application, which manages the messaging of a community of neighbors. It includes authentication with the Sanctum package in Laravel, tokens, cookies... etc.

## Installation

#### Dependencies

Use the package manager npm to install dependencies

```bash
npm i
```
#### Database
Move to the api folder and create an .env file based on the .env.example file I left in the root of the api folder. Create a new database according to your .env and then use composer to run migrations. (Open terminal in the api folder)
```bash
php artisan migrate || php artisan migrate:refresh 
```
Once the migrations have been executed, run the following commands in this order to populate the database with test data
```bash
php artisan db:seed --class=UserSeeder  
```
```bash
php artisan db:seed --class=MailSeeder  
```
#### Run app 
Use the following command to start back app.

```bash
php artisan serve
```
Use the following command to start front app.

```bash
npm start
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.


