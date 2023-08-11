<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Mail extends Model
{
    use HasFactory, HasApiTokens;
    protected $table = 'cartas';
    protected $fillable = ['remitente','contenido','piso_id'];


}
