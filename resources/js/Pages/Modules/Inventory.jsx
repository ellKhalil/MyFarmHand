import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Pagination from '@/Components/Pagination';
import Dropdown from '@/Components/Dropdown';
import { useState } from 'react';

export default function Inventory({ inventory, filters = {} }) {
    const userRole = usePage().props.auth.user?.role?.role_name;
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('inventory.index'), { search, sort_field: filters.sort_field, sort_direction: filters.sort_direction }, { preserveState: true, replace: true });
    };

    const handleSort = (field) => {
        let direction = 'asc';
        if (filters.sort_field === field && filters.sort_direction === 'asc') {
            direction = 'desc';
        }
        router.get(route('inventory.index'), { search, sort_field: field, sort_direction: direction }, { preserveState: true, replace: true });
    };
    const { data, setData, post, processing, reset } = useForm({
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
                    Inventory Management
                </h2>
            }
        >
            <Head title="Inventory" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Inventory Table */}
                    <div className="bg-white shadow-sm border border-gray-200 rounded-sm overflow-visible">
                        <div className="p-6 border-b bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div className="flex items-center gap-4">
                                <h3 className="text-lg font-bold text-gray-800">Current Stock Levels</h3>
                                <a href={route('inventory.export')} className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded shadow-sm transition-colors flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    Export CSV
                                </a>
                            </div>
                            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                                <div className="flex w-full sm:w-64">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search items..."
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-l-md shadow-sm sm:text-sm w-full"
                                    />
                                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 font-medium sm:text-sm transition-colors">Search</button>
                                </div>
                                <div className="w-full sm:w-auto">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button type="button" className="w-full sm:w-auto flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                                                <span className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                                    </svg>
                                                    Sort Options
                                                </span>
                                                <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content align="right" width="48">
                                            <button type="button" onClick={() => router.get(route('inventory.index'), { search, sort_field: 'item_name', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'item_name' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Name (A-Z)</button>
                                            <button type="button" onClick={() => router.get(route('inventory.index'), { search, sort_field: 'item_name', sort_direction: 'desc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'item_name' && filters.sort_direction === 'desc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Name (Z-A)</button>
                                            <button type="button" onClick={() => router.get(route('inventory.index'), { search, sort_field: 'category', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'category' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Category (A-Z)</button>
                                            <button type="button" onClick={() => router.get(route('inventory.index'), { search, sort_field: 'quantity', sort_direction: 'desc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'quantity' && filters.sort_direction === 'desc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Quantity (High-Low)</button>
                                            <button type="button" onClick={() => router.get(route('inventory.index'), { search, sort_field: 'quantity', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'quantity' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Quantity (Low-High)</button>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </form>
                        </div>
                        <div className="hidden md:block overflow-visible">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('item_name')}>
                                            Item Name {filters.sort_field === 'item_name' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('category')}>
                                            Category {filters.sort_field === 'category' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('quantity')}>
                                            Quantity {filters.sort_field === 'quantity' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        {userRole !== 'Managing Director' && (
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {!inventory.data || inventory.data.length === 0 ? (
                                        <tr><td colSpan="6" className="px-6 py-4 text-center text-gray-500">No items found in inventory.</td></tr>
                                    ) : (
                                        inventory.data.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 font-medium text-gray-900">{item.item_name}</td>
                                                <td className="px-6 py-4 text-gray-500">{item.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{item.quantity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.unit}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.quantity <= item.low_stock_threshold ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Low Stock</span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Healthy</span>
                                                    )}
                                                </td>
                                                {userRole !== 'Managing Director' && (
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <button type="button" className="inline-flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
                                                                <span>Actions</span>
                                                                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content align="right" width="48">
                                                            <button className="block w-full px-4 py-2 text-start text-sm leading-5 text-green-600 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                                                Log Usage
                                                            </button>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </td>
                                                )}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden divide-y divide-gray-200">
                            {!inventory.data || inventory.data.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">No items found in inventory.</div>
                            ) : (
                                inventory.data.map((item) => (
                                    <div key={item.id} className="p-4 space-y-3 bg-white">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">{item.item_name}</h4>
                                                <p className="text-xs text-gray-500">{item.category}</p>
                                            </div>
                                            <div>
                                                {item.quantity <= item.low_stock_threshold ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Low Stock</span>
                                                ) : (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Healthy</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-sm">
                                            <span className="text-gray-500 block">Quantity:</span>
                                            <span className="font-bold text-gray-900">{item.quantity} {item.unit}</span>
                                        </div>
                                        {userRole !== 'Managing Director' && (
                                        <div className="pt-2 border-t border-gray-100">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <button type="button" className="w-full flex justify-between items-center py-2 px-4 bg-gray-50 border border-gray-200 rounded text-gray-700 hover:bg-gray-100 text-sm font-medium focus:outline-none">
                                                        <span>Select Action</span>
                                                        <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </Dropdown.Trigger>
                                                <Dropdown.Content align="left" width="full">
                                                    <button className="block w-full px-4 py-3 text-start text-sm leading-5 text-green-600 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                                        Log Usage
                                                    </button>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                        {inventory.links && <Pagination links={inventory.links} />}
                    </div>

                    {/* Add New Item Form */}
                    {userRole !== 'Managing Director' && (
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
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
