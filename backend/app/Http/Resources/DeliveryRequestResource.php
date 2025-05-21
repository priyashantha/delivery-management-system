<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,

            // Pickup Info
            'pickup_address' => $this->pickup_address,
            'pickup_name' => $this->pickup_name,
            'pickup_contact_no' => $this->pickup_contact_no,
            'pickup_email' => $this->pickup_email,

            // Delivery Info
            'delivery_address' => $this->delivery_address,
            'delivery_name' => $this->delivery_name,
            'delivery_contact_no' => $this->delivery_contact_no,
            'delivery_email' => $this->delivery_email,

            // Enums
            'type_of_good' => $this->type_of_good,
            'delivery_provider' => $this->delivery_provider,

            // DateTime
            'pickup_date_time' => $this->pickup_date_time,

            // Package Info
            'package_description' => $this->package_description,
            'weight' => $this->weight,
            'length' => $this->length,
            'width' => $this->width,
            'height' => $this->height,

            // Timestamps
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
