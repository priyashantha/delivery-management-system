import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

export default function RequestForm() {
    const [formData, setFormData] = useState({
        // delivery info
        pickup_name: '',
        pickup_address: '',
        pickup_contact_no: '',
        pickup_email: '',// optional
        delivery_name: '',
        delivery_address: '',
        delivery_contact_no: '',
        delivery_email: '',
        type_of_good: '',
        delivery_provider: '',
        pickup_date_time: '',
        // package info
        package_description: '',
        weight: 0,
        width: 0,
        height: 0,
        length: 0,
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState('');

    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/open-request') {
            // Reset form when this component is loaded
            setFormData({
                // delivery info
                pickup_name: '',
                pickup_address: '',
                pickup_contact_no: '',
                pickup_email: '',// optional
                delivery_name: '',
                delivery_address: '',
                delivery_contact_no: '',
                delivery_email: '',
                type_of_good: '',
                delivery_provider: '',
                pickup_date_time: '',
                // package info
                package_description: '',
                weight: 0,
                width: 0,
                height: 0,
                length: 0,
            });
            setSuccess(null);
            setErrors({});
        }
    }, [location]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess(null);
        setLoading(true);

        try {
            const response = await axios.post('/api/requests', {
                ...formData,
                recaptcha_token: recaptchaToken,
            });
            console.log('response.data', response.data)
            setSuccess('Your request has been submitted successfully.');
        } catch (error) {
            if (error.response?.status === 422) {
                console.log('error.response:', error.response.data.errors);
                setErrors(error.response.data.errors || {});
            } else {
                setErrors({ general: 'Something went wrong. Please try again.' });
            }
        } finally {
            setLoading(false);
        }
    };

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY; // Vite

    return (
        <section className="p-2">
            <h2 className="text-2xl text-center font-semibold mb-4">Open a Delivery Request</h2>

            {success ? (
                <div className="bg-green-100 text-green-800 p-3 mb-4 rounded">
                    {success}
                </div>
            ) : (
                <>
                    {errors.general && (
                        <div className="bg-red-100 text-red-800 p-3 mb-4 rounded">{errors.general}</div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">

                        {/* Delivery Info */}
                        <fieldset className="border p-4 rounded border-gray-300">
                            <legend className="text-lg font-semibold mb-2">Delivery Info</legend>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Pickup Fields */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Pickup Name</label>
                                    <input type="text" name="pickup_name" className="w-full border rounded p-2" required
                                           value={formData.pickup_name} onChange={handleChange} />
                                    {errors.pickup_name && <p className="text-red-600 text-sm">{errors.pickup_name[0]}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Pickup Contact No</label>
                                    <input type="tel" name="pickup_contact_no" className="w-full border rounded p-2" required
                                           value={formData.pickup_contact_no} onChange={handleChange} />
                                    {errors.pickup_contact_no && <p className="text-red-600 text-sm">{errors.pickup_contact_no[0]}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Pickup Email</label>
                                    <input type="email" name="pickup_email" className="w-full border rounded p-2"
                                           value={formData.pickup_email} onChange={handleChange} />
                                    {errors.pickup_email && <p className="text-red-600 text-sm">{errors.pickup_email[0]}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Pickup Address</label>
                                    <input type="text" name="pickup_address" className="w-full border rounded p-2" required
                                           value={formData.pickup_address} onChange={handleChange} />
                                    {errors.pickup_address && <p className="text-red-600 text-sm">{errors.pickup_address[0]}</p>}
                                </div>

                                {/* Delivery Fields */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Delivery Name</label>
                                    <input type="text" name="delivery_name" className="w-full border rounded p-2" required
                                           value={formData.delivery_name} onChange={handleChange} />
                                    {errors.delivery_name && <p className="text-red-600 text-sm">{errors.delivery_name[0]}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Delivery Contact No</label>
                                    <input type="tel" name="delivery_contact_no" className="w-full border rounded p-2" required
                                           value={formData.delivery_contact_no} onChange={handleChange} />
                                    {errors.delivery_contact_no && <p className="text-red-600 text-sm">{errors.delivery_contact_no[0]}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Delivery Email</label>
                                    <input type="email" name="delivery_email" className="w-full border rounded p-2"
                                           value={formData.delivery_email} onChange={handleChange} />
                                    {errors.delivery_email && <p className="text-red-600 text-sm">{errors.delivery_email[0]}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Delivery Address</label>
                                    <input type="text" name="delivery_address" className="w-full border rounded p-2" required
                                           value={formData.delivery_address} onChange={handleChange} />
                                    {errors.delivery_address && <p className="text-red-600 text-sm">{errors.delivery_address[0]}</p>}
                                </div>

                                {/* Enums */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Type of Good</label>
                                    <select name="type_of_good" className="w-full border rounded p-2"
                                            value={formData.type_of_good} onChange={handleChange} required>
                                        <option value="">Select type</option>
                                        <option value="Document">Document</option>
                                        <option value="Parcel">Parcel</option>
                                    </select>
                                    {errors.type_of_good && <p className="text-red-600 text-sm">{errors.type_of_good[0]}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Delivery Provider</label>
                                    <select name="delivery_provider" className="w-full border rounded p-2"
                                            value={formData.delivery_provider} onChange={handleChange} required>
                                        <option value="">Select provider</option>
                                        <option value="DHL">DHL</option>
                                        <option value="STARTRACK">STARTRACK</option>
                                        <option value="ZOOM2U">ZOOM2U</option>
                                        <option value="TGE">TGE</option>
                                    </select>
                                    {errors.delivery_provider && <p className="text-red-600 text-sm">{errors.delivery_provider[0]}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Pickup Date & Time</label>
                                    <input type="datetime-local" name="pickup_date_time" className="w-full border rounded p-2"
                                           value={formData.pickup_date_time} onChange={handleChange} />
                                    {errors.pickup_date_time && <p className="text-red-600 text-sm">{errors.pickup_date_time[0]}</p>}
                                </div>
                            </div>
                        </fieldset>

                        {/* Package Info */}
                        <fieldset className="border p-4 rounded border-gray-300">
                            <legend className="text-lg font-semibold mb-2">Package Info</legend>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Package Description</label>
                                    <textarea name="package_description" rows="3" className="w-full border rounded p-2"
                                              value={formData.package_description} onChange={handleChange}></textarea>
                                    {errors.package_description && <p className="text-red-600 text-sm">{errors.package_description[0]}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                                    <input type="number" name="weight" min="0" className="w-full border rounded p-2"
                                           value={formData.weight} onChange={handleChange} />
                                    {errors.weight && <p className="text-red-600 text-sm">{errors.weight[0]}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Length (cm)</label>
                                    <input type="number" name="length" min="0" className="w-full border rounded p-2"
                                           value={formData.length} onChange={handleChange} />
                                    {errors.length && <p className="text-red-600 text-sm">{errors.length[0]}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Width (cm)</label>
                                    <input type="number" name="width" min="0" className="w-full border rounded p-2"
                                           value={formData.width} onChange={handleChange} />
                                    {errors.width && <p className="text-red-600 text-sm">{errors.width[0]}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Height (cm)</label>
                                    <input type="number" name="height" min="0" className="w-full border rounded p-2"
                                           value={formData.height} onChange={handleChange} />
                                    {errors.height && <p className="text-red-600 text-sm">{errors.height[0]}</p>}
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="border p-4 rounded border-gray-300">
                            <ReCAPTCHA
                                sitekey={siteKey}
                                onChange={(token) => setRecaptchaToken(token)}
                            />
                            {errors.recaptcha_token && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.recaptcha_token[0]}
                                </p>
                            )}

                        </fieldset>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Delivery Request'}
                        </button>
                    </form>

                </>
            )}

        </section>
    );
}
