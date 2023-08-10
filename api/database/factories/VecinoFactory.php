<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vecino>
 */
class VecinoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' =>  fake()->name(),
            'apellido' => fake()->name(),
            'floor' => strval(fake()->randomDigit()) . Str::random(1),
            'email' => fake()->email(),
            'password' => fake()->password(),
        ];
    }
}
