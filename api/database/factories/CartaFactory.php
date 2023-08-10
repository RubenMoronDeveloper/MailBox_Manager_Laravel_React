<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Carta>
 */
class CartaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'remitente' =>  fake()->name(),
            'contenido' => fake()->text(),
            'id_piso' => fake()->numberBetween(14,18),
        ];
    }
}
