<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Mail>
 */
class MailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $id_floor = fake()->numberBetween(1,14);

        return [
            'mail_sender' =>  fake()->name(),
            'content' => fake()->text(),
            'id_floor' => fake()->numberBetween(1,14),
        ];
    }
}
