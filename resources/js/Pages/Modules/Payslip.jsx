import { Head, usePage } from '@inertiajs/react';

export default function Payslip({ payroll }) {
    const auth = usePage().props.auth;
    const farmLogo = auth.user?.farm?.logo_path || '/logo.png';
    const farmName = auth.user?.farm?.name || 'Rahinatu Farms LTD';
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <Head title={`Payslip - ${payroll.user.name}`} />
            
            <div className="max-w-3xl mx-auto">
                <div className="mb-6 flex justify-between items-center print:hidden">
                    <button 
                        onClick={() => window.history.back()}
                        className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                        &larr; Back
                    </button>
                    <button 
                        onClick={handlePrint}
                        className="px-4 py-2 bg-green-800 text-white rounded shadow hover:bg-green-700"
                    >
                        Print Payslip
                    </button>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-8 print:shadow-none print:border-none print:p-0">
                    {/* Header */}
                    <div className="border-b-2 border-green-800 pb-6 mb-6 flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <img src={farmLogo} alt="Farm Logo" className="h-16 w-auto object-contain" />
                            <div>
                                <h1 className="text-3xl font-bold text-green-900">{farmName}</h1>
                                <p className="text-gray-500 mt-1">Official Employee Payslip</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {payroll.month}/{payroll.year}
                            </h2>
                            <p className="text-sm font-medium mt-1">
                                Status: 
                                <span className={`ml-2 px-2 py-1 rounded text-xs ${payroll.payment_status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {payroll.payment_status}
                                </span>
                            </p>
                            <p className="text-xs text-gray-400 mt-2">Slip ID: #{payroll.id.toString().padStart(6, '0')}</p>
                        </div>
                    </div>

                    {/* Employee Details */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Employee Details</h3>
                            <p className="font-semibold text-gray-900 text-lg">{payroll.user.name}</p>
                            <p className="text-gray-600">{payroll.user.department || 'General Staff'}</p>
                            <p className="text-gray-600">{payroll.user.email}</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Payment Period</h3>
                            <p className="text-gray-800 font-medium">{new Date(payroll.year, payroll.month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>

                    {/* Salary Breakdown */}
                    <table className="w-full text-left border-collapse mb-8">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="py-3 font-bold text-gray-700">Description</th>
                                <th className="py-3 font-bold text-gray-700 text-right">Amount (₦)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <td className="py-3 text-gray-800">Basic Salary</td>
                                <td className="py-3 text-right text-gray-800">{parseFloat(payroll.base_pay).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-3 text-gray-800">Bonuses / Allowances</td>
                                <td className="py-3 text-right text-gray-800">{parseFloat(payroll.bonuses || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-3 text-red-600">Deductions</td>
                                <td className="py-3 text-right text-red-600">-{parseFloat(0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-50 border-t-2 border-gray-300">
                                <th className="py-4 px-2 text-lg font-bold text-gray-900">Net Payable</th>
                                <th className="py-4 px-2 text-right text-xl font-bold text-green-800">
                                    ₦{parseFloat(payroll.net_payable).toLocaleString(undefined, {minimumFractionDigits: 2})}
                                </th>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Footer */}
                    <div className="text-center text-sm text-gray-500 mt-12 pt-6 border-t border-gray-200">
                        <p>This is a system generated payslip.</p>
                        <p className="mt-1">{farmName} Enterprise Resource Planning System</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
