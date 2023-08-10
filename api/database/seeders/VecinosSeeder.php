<?php

namespace Database\Seeders;

use App\Models\Vecino;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VecinosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Vecino::factory()
        ->count(10)
        ->create();
       /*  DB::table('vecinos')->insert([
            'nombre' => Str::random(10),
            'apellido' => Str::random(10),
            'piso' => Str::random(2),
        ]); */
    }
}
