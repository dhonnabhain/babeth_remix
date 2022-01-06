<?php

use App\Models\{Person, Picture};
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        $people = Person::factory()
            ->count(30)
            ->has(Picture::factory()->count(random_int(0, 10)))
            ->create()
            ->take(20);

        $people->map(
            fn (Person $person) =>
            $person->people()->syncWithoutDetaching([$people->random()->id => ['kind' => $faker->word]])
        );
    }
}
