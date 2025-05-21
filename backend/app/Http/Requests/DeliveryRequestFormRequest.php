<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Http;

class DeliveryRequestFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => 'in:pending,cancelled',

            'pickup_address' => 'required|string|max:255',
            'pickup_name' => 'required|string|max:255',
            'pickup_contact_no' => 'required|string|max:20',
            'pickup_email' => 'nullable|email|max:255',

            // Delivery Info
            'delivery_address' => 'required|string|max:255',
            'delivery_name' => 'required|string|max:255',
            'delivery_contact_no' => 'required|string|max:20',
            'delivery_email' => 'nullable|email|max:255',

            'type_of_good' => 'required|in:Document,Parcel',
            'delivery_provider' => 'required|in:DHL,STARTRACK,ZOOM2U,TGE',
            'pickup_date_time' => 'required|date|after:now',

            // Package Info
            'package_description' => 'required|string|min:5',
            'weight' => 'required|integer|min:0',
            'length' => 'required|integer|min:0',
            'width' => 'required|integer|min:0',
            'height' => 'required|integer|min:0',
            'recaptcha_token' => ['required', function ($attribute, $value, $fail) {
                $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                    'secret' => config('services.recaptcha.secret'),
                    'response' => $value,
                ]);

                if (!data_get($response->json(), 'success')) {
                    $fail('reCAPTCHA verification failed.');
                }
            }],
        ];
    }

    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}
