<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsToMany, HasMany};

class Person extends Model
{
    use HasFactory;

    public function pictures(): HasMany
    {
        return $this->hasMany(Picture::class);
    }

    public function people(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'relationships', 'person_from', 'person_to');
    }
}
