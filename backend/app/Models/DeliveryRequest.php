<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'pickup_address',
        'pickup_name',
        'pickup_contact_no',
        'pickup_email',
        'delivery_address',
        'delivery_name',
        'delivery_contact_no',
        'delivery_email',
        'type_of_good',
        'delivery_provider',
        'pickup_date_time',
        'package_description',
        'weight',
        'length',
        'width',
        'height',
    ];
}
