import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function StorekeeperDashboard({ user, inventory = [] }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        item_name: '',
        category: 'Feed',
        quantity: '',
        unit: '',
        cost_per_unit: '',
        low_stock_threshold: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('inventory.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Store Keeper Operations
                </h2>
            }
        >
            <Head title="Storekeeper Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Add New Item Form */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Register New Inventory Item</h3>
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <InputLabel htmlFor="item_name" value="Item Name" />
                                <TextInput id="item_name" className="mt-1 block w-full" value={data.item_name} onChange={(e) => setData('item_name', e.target.value)} required />
                            </div>
                            <div>
                                <InputLabel htmlFor="category" value="Category" />
                                <select id="category" className="mt-1 block w-full border-gray-300 focus:border-green-600 focus:ring-green-600 rounded-sm shadow-sm" value={data.category} onChange={(e) => setData('category', e.target.value)} required>
                                    <option>Feed</option>
                                    <option>Livestock</option>
                                    <option>Produce</option>
                                    <option>Medicine</option>
                                    <option>Equipment</option>
                                    <option>Consumable</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <InputLabel htmlFor="unit" value="Unit of Measurement (e.g. kg, bags)" />
                                <TextInput id="unit" className="mt-1 block w-full" value={data.unit} onChange={(e) => setData('unit', e.target.value)} required />
                            </div>
                            <div>
                                <InputLabel htmlFor="quantity" value="Initial Quantity" />
                                <TextInput id="quantity" type="number" className="mt-1 block w-full" value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} required />
                            </div>
                            <div>
                                <InputLabel htmlFor="cost_per_unit" value="Cost per Unit" />
                                <TextInput id="cost_per_unit" type="number" step="0.01" className="mt-1 block w-full" value={data.cost_per_unit} onChange={(e) => setData('cost_per_unit', e.target.value)} required />
                            </div>
                            <div>
                                <InputLabel htmlFor="low_stock_threshold" value="Low Stock Alert Threshold" />
                                <TextInput id="low_stock_threshold" type="number" className="mt-1 block w-full" value={data.low_stock_threshold} onChange={(e) => setData('low_stock_threshold', e.target.value)} required />
                            </div>
                            <div className="md:col-span-3 flex justify-end">
                                <PrimaryButton disabled={processing}>Register Item</PrimaryButton>
                            </div>
                        </form>
                    </div>

                    {/* Inventory Table */}
                    <div className="bg-white shadow-sm border border-gray-200 rounded-sm overflow-hidden">
                        <div className="p-6 border-b bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-800">Current Stock Levels</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {inventory.length === 0 ? (
                                        <tr><td colSpan="6" className="px-6 py-4 text-center text-gray-500">No items found in inventory.</td></tr>
                                    ) : (
                                        inventory.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.item_name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{item.quantity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.unit}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.quantity <= item.low_stock_threshold ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Low Stock</span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Healthy</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-green-600 hover:text-green-900">Log Usage</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
