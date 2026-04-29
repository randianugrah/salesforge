<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesPage extends Model
{
    /** @use HasFactory<\Database\Factories\SalesPageFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_name',
        'product_description',
        'features',
        'target_audience',
        'price',
        'template',
        'usp',
        'headline',
        'sub_headline',
        'generated_content',
        'generated_html',
        'slug',
    ];

    protected $casts = [
        'generated_content' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
