import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Payroll({ users = [], currentMonthPayrolls = {}, currentMonth }) {
    const { post, processing } = useForm();

    const generatePayroll = (userId, basePay) => {
        post(route('payroll.generate'), {
            data: {
                user_id: userId,
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                base_pay: basePay,
                allowances: [],
                deductions: [],
                bonuses: 0
            },
            preserveScroll: true
        });
    };

    const markAsPaid = (payrollId) => {
        if (confirm("Are you sure you want to mark this salary as paid? This will automatically post an Expense to the Ledger.")) {
            post(route('payroll.paid', payrollId), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Payroll Management ({currentMonth})
                    </h2>
                    <a
                        href={route('payroll.export')}
                        className="inline-flex items-center px-4 py-2 bg-green-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Export Salary Structure (CSV)
                    </a>
                </div>
            }
        >
            <Head title="Payroll Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    <div className="bg-white shadow-sm border border-gray-200 rounded-sm overflow-hidden">
                        <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">Staff Salary Payment Tracking</h3>
                            <p className="text-sm text-gray-500">Showing payroll status for {currentMonth}</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department / Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Salary (N)</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.length === 0 ? (
                                        <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No employees found.</td></tr>
                                    ) : (
                                        users.map((user) => {
                                            const payroll = currentMonthPayrolls[user.id];
                                            
                                            return (
                                                <tr key={user.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.department || 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">₦{parseFloat(user.base_salary).toLocaleString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {!payroll ? (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Not Generated</span>
                                                        ) : payroll.payment_status === 'Paid' ? (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                                                        ) : (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        {!payroll ? (
                                                            <button 
                                                                onClick={() => generatePayroll(user.id, user.base_salary)}
                                                                disabled={processing}
                                                                className="text-indigo-600 hover:text-indigo-900 font-bold"
                                                            >
                                                                Generate Slip
                                                            </button>
                                                        ) : payroll.payment_status === 'Pending' ? (
                                                            <button 
                                                                onClick={() => markAsPaid(payroll.id)}
                                                                disabled={processing}
                                                                className="text-green-600 hover:text-green-900 font-bold"
                                                            >
                                                                Mark as Paid
                                                            </button>
                                                        ) : (
                                                            <span className="text-gray-400">Completed</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
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
