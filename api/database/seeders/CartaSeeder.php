<?php

namespace Database\Seeders;

use App\Models\Carta;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CartaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Carta::factory()
        ->count(50)
        ->create();

    }
}
