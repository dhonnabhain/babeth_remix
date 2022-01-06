<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PersonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'avatar' => $this->faker->url,
            'birthday' => $this->faker->dateTimeThisCentury(),
            'city' => $this->faker->city,
            'work' => $this->faker->jobTitle,
            'biography' => $this->faker->realText,
        ];
    }
}
