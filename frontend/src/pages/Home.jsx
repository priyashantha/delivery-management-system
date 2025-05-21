import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function DeliveryRequestList() {
    const [requests, setRequests] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, last: 1 });
    const [loading, setLoading] = useState(true);

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/requests?page=${page}`);
            const { data, meta } = response.data;

            setRequests(data);
            setPagination({
                current: meta.current_page,
                last: meta.last_page,
            });
        } catch (error) {
            console.error('Error fetching delivery requests:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCancel = async (refID) => {
        if (!window.confirm('Are you sure you want to cancel this request?')) return;

        try {
            await axios.patch(`/api/requests/${refID}/cancel`);
            fetchData(pagination.current); // reload list
        } catch (error) {
            console.error('Cancel failed', error);
            alert('Could not cancel request. Please try again.');
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold mb-6">All Delivery Requests</h2>

            {loading ? (
                <p>Loading requests...</p>
            ) : requests.length === 0 ? (
                <p className="text-gray-500">No requests yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-2 border">Pickup Name</th>
                            <th className="p-2 border">Pickup Contact</th>
                            <th className="p-2 border">Delivery Name</th>
                            <th className="p-2 border">Type</th>
                            <th className="p-2 border">Provider</th>
                            <th className="p-2 border">Pickup Time</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Created</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {requests.map((ticket) => {
                            let rowClass = '';

                            switch (ticket.status) {
                                case 'pending':
                                    rowClass = 'bg-yellow-50';
                                    break;
                                case 'processed':
                                    rowClass = 'bg-blue-50';
                                    break;
                                case 'shipped':
                                    rowClass = 'bg-green-50';
                                    break;
                                case 'cancelled':
                                    rowClass = 'bg-red-50';
                                    break;
                                default:
                                    rowClass = '';
                            }

                            return (
                                <tr key={ticket.ref_id} className={`${rowClass}`}>
                                    <td className="p-2 border">{ticket.pickup_name}</td>
                                    <td className="p-2 border">{ticket.pickup_contact_no}</td>
                                    <td className="p-2 border">{ticket.delivery_name}</td>
                                    <td className="p-2 border">{ticket.type_of_good}</td>
                                    <td className="p-2 border">{ticket.delivery_provider}</td>
                                    <td className="p-2 border text-sm">
                                        {ticket.pickup_date_time
                                            ? new Date(ticket.pickup_date_time).toLocaleString()
                                            : '—'}
                                    </td>
                                    <td className="p-2 border capitalize">{ticket.status}</td>
                                    <td className="p-2 border text-sm">
                                        {new Date(ticket.created_at).toLocaleString()}
                                    </td>
                                    <td className="p-2 border">
                                        {!['processed', 'shipped', 'cancelled'].includes(ticket.status) && (
                                            <button
                                                onClick={() => handleCancel(ticket.ref_id)}
                                                className="text-red-600 hover:underline text-sm"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className="mt-4 flex flex-wrap gap-2">
                {Array.from({ length: pagination.last }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => fetchData(i + 1)}
                        className={`px-3 py-1 border rounded ${
                            i + 1 === pagination.current ? 'bg-blue-600 text-white' : ''
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
