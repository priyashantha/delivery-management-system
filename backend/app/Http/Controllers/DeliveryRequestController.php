<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeliveryRequestFormRequest;
use App\Http\Resources\DeliveryRequestResource;
use App\Models\DeliveryRequest;
use Illuminate\Http\Request;

class DeliveryRequestController extends Controller
{
    public function index(Request $request)
    {
        return DeliveryRequestResource::collection(
            DeliveryRequest::latest()->paginate(10)
        );
    }

    public function store(DeliveryRequestFormRequest $request)
    {
        $data = $request->validated();

        $deliveryRequest = DeliveryRequest::create($data);
        $deliveryRequest->refresh();

        return new DeliveryRequestResource($deliveryRequest);
    }

    public function cancel($ref)
    {
        $request = DeliveryRequest::where('ref_id', $ref)->firstOrFail();

        if (in_array($request->status, ['processed', 'shipped'])) {
            return response()->json(['message' => 'Request cannot be cancelled.'], 422);
        }

        $request->status = 'cancelled';
        $request->save();

        return response()->json(['message' => 'Request cancelled successfully.']);
    }
}
