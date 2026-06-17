import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function Finance({ transactions = [] }) {
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

                    {/* Recent Transactions Table */}
                    <div className="bg-white shadow-sm border border-gray-200 rounded-sm overflow-hidden">
                        <div className="p-6 border-b bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {transactions.length === 0 ? (
                                        <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No transactions recorded.</td></tr>
                                    ) : (
                                        transactions.map((tx) => (
                                            <tr key={tx.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{new Date(tx.transaction_date).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {tx.type === 'Income' ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Income</span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expense</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{tx.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">${parseFloat(tx.amount).toFixed(2)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{tx.description}</td>
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
