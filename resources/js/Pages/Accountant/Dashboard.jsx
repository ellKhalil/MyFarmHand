import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function AccountantDashboard({ user }) {
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
                    Financial Ledgers & Payroll
                </h2>
            }
        >
            <Head title="Accountant Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
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
                                <InputLabel htmlFor="amount" value="Amount" />
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Generate Payroll Shortcut */}
                        <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Payroll Management</h3>
                            <p className="text-sm text-gray-600 mb-4">Calculate salaries, deduct absences, and generate pay slips.</p>
                            <button className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-sm border border-gray-300 transition">
                                Open Payroll Engine
                            </button>
                        </div>
                        
                        {/* Reports Shortcut */}
                        <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Export Reports</h3>
                            <p className="text-sm text-gray-600 mb-4">Export ledgers, income statements, and tax sheets.</p>
                            <button className="w-full text-center bg-green-50 hover:bg-green-100 text-green-800 font-bold py-3 rounded-sm border border-green-200 transition">
                                Generate Monthly Report
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
