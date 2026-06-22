import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Pagination from '@/Components/Pagination';
import Dropdown from '@/Components/Dropdown';
import { useState } from 'react';

export default function Finance({ transactions, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('finance.index'), { search, sort_field: filters.sort_field, sort_direction: filters.sort_direction }, { preserveState: true, replace: true });
    };

    const handleSort = (field) => {
        let direction = 'asc';
        if (filters.sort_field === field && filters.sort_direction === 'asc') {
            direction = 'desc';
        }
        router.get(route('finance.index'), { search, sort_field: field, sort_direction: direction }, { preserveState: true, replace: true });
    };
    const { data, setData, post, processing, reset } = useForm({
        type: 'Income',
        amount: '',
        category: '',
        description: '',
        transaction_date: new Date().toISOString().split('T')[0]
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('finance.transaction.store'), {
            onSuccess: () => reset('amount', 'category', 'description'),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Financial Ledger & Payroll
                </h2>
            }
        >
            <Head title="Finance" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Recent Transactions Table */}
                    <div className="bg-white shadow-sm border border-gray-200 rounded-sm overflow-visible">
                        <div className="p-6 border-b bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
                            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                                <div className="flex w-full sm:w-64">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search description or category..."
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
                                            <button type="button" onClick={() => router.get(route('finance.index'), { search, sort_field: 'transaction_date', sort_direction: 'desc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'transaction_date' && filters.sort_direction === 'desc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Newest</button>
                                            <button type="button" onClick={() => router.get(route('finance.index'), { search, sort_field: 'transaction_date', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'transaction_date' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Oldest</button>
                                            <button type="button" onClick={() => router.get(route('finance.index'), { search, sort_field: 'amount', sort_direction: 'desc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'amount' && filters.sort_direction === 'desc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Amount (High-Low)</button>
                                            <button type="button" onClick={() => router.get(route('finance.index'), { search, sort_field: 'amount', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'amount' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Amount (Low-High)</button>
                                            <button type="button" onClick={() => router.get(route('finance.index'), { search, sort_field: 'type', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'type' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Type</button>
                                            <button type="button" onClick={() => router.get(route('finance.index'), { search, sort_field: 'category', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'category' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Category (A-Z)</button>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </form>
                        </div>
                        <div className="hidden md:block overflow-visible">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('transaction_date')}>
                                            Date {filters.sort_field === 'transaction_date' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('type')}>
                                            Type {filters.sort_field === 'type' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('category')}>
                                            Category {filters.sort_field === 'category' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('amount')}>
                                            Amount {filters.sort_field === 'amount' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {!transactions.data || transactions.data.length === 0 ? (
                                        <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No transactions recorded.</td></tr>
                                    ) : (
                                        transactions.data.map((tx) => (
                                            <tr key={tx.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{new Date(tx.transaction_date).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {tx.type === 'Income' ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Income</span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expense</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-gray-500">{tx.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">${parseFloat(tx.amount).toFixed(2)}</td>
                                                <td className="px-6 py-4 text-gray-500">{tx.description}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden divide-y divide-gray-200">
                            {!transactions.data || transactions.data.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">No transactions recorded.</div>
                            ) : (
                                transactions.data.map((tx) => (
                                    <div key={tx.id} className="p-4 space-y-3 bg-white">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">{tx.category}</h4>
                                                <p className="text-xs text-gray-500">{new Date(tx.transaction_date).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                {tx.type === 'Income' ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Income</span>
                                                ) : (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expense</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-bold text-gray-900">${parseFloat(tx.amount).toFixed(2)}</span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {tx.description}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {transactions.links && <Pagination links={transactions.links} />}
                    </div>

                    {/* Log Transaction */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Record Financial Transaction</h3>
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="type" value="Transaction Type" />
                                <select id="type" className="mt-1 block w-full border-gray-300 focus:border-green-600 focus:ring-green-600 rounded-sm shadow-sm" value={data.type} onChange={(e) => setData('type', e.target.value)} required>
                                    <option>Income</option>
                                    <option>Expense</option>
                                </select>
                            </div>
                            <div>
                                <InputLabel htmlFor="amount" value="Amount ($)" />
                                <TextInput id="amount" type="number" step="0.01" className="mt-1 block w-full" value={data.amount} onChange={(e) => setData('amount', e.target.value)} required />
                            </div>
                            <div>
                                <InputLabel htmlFor="category" value="Category (e.g. Sales, Utilities)" />
                                <TextInput id="category" className="mt-1 block w-full" value={data.category} onChange={(e) => setData('category', e.target.value)} required />
                            </div>
                            <div>
                                <InputLabel htmlFor="transaction_date" value="Date" />
                                <TextInput id="transaction_date" type="date" className="mt-1 block w-full" value={data.transaction_date} onChange={(e) => setData('transaction_date', e.target.value)} required />
                            </div>
                            <div className="md:col-span-2">
                                <InputLabel htmlFor="description" value="Description / Notes" />
                                <TextInput id="description" className="mt-1 block w-full" value={data.description} onChange={(e) => setData('description', e.target.value)} required />
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <PrimaryButton disabled={processing}>Post to Ledger</PrimaryButton>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
