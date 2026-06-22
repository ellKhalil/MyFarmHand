import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Pagination from '@/Components/Pagination';
import Dropdown from '@/Components/Dropdown';
import { useState } from 'react';

export default function Payroll({ users = [], currentMonthPayrolls = {}, currentMonth, filters = {} }) {
    const [processing, setProcessing] = useState(false);
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('payroll.index'), { search, sort_field: filters.sort_field, sort_direction: filters.sort_direction }, { preserveState: true, replace: true });
    };

    const handleSort = (field) => {
        let direction = 'asc';
        if (filters.sort_field === field && filters.sort_direction === 'asc') {
            direction = 'desc';
        }
        router.get(route('payroll.index'), { search, sort_field: field, sort_direction: direction }, { preserveState: true, replace: true });
    };

    const payEmployee = (userId, basePay) => {
        if (confirm("Are you sure you want to mark this salary as paid? This will automatically post an Expense to the Ledger.")) {
            setProcessing(true);
            router.post(route('payroll.pay'), {
                user_id: userId,
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                base_pay: basePay,
                allowances: [],
                deductions: [],
                bonuses: 0
            }, { 
                preserveScroll: true,
                onFinish: () => setProcessing(false)
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
                        <div className="p-6 border-b bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Staff Salary Payment Tracking</h3>
                                <p className="text-sm text-gray-500">Showing payroll status for {currentMonth}</p>
                            </div>
                            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                                <div className="flex w-full sm:w-64">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search name or dept..."
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
                                            <button type="button" onClick={() => router.get(route('payroll.index'), { search, sort_field: 'name', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'name' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Name (A-Z)</button>
                                            <button type="button" onClick={() => router.get(route('payroll.index'), { search, sort_field: 'name', sort_direction: 'desc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'name' && filters.sort_direction === 'desc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Name (Z-A)</button>
                                            <button type="button" onClick={() => router.get(route('payroll.index'), { search, sort_field: 'department', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'department' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Department (A-Z)</button>
                                            <button type="button" onClick={() => router.get(route('payroll.index'), { search, sort_field: 'base_salary', sort_direction: 'desc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'base_salary' && filters.sort_direction === 'desc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Salary (High-Low)</button>
                                            <button type="button" onClick={() => router.get(route('payroll.index'), { search, sort_field: 'base_salary', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'base_salary' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Salary (Low-High)</button>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </form>
                        </div>
                        <div className="hidden md:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('name')}>
                                            Employee {filters.sort_field === 'name' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('department')}>
                                            Department / Role {filters.sort_field === 'department' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('base_salary')}>
                                            Base Salary (N) {filters.sort_field === 'base_salary' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.data.length === 0 ? (
                                        <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No employees found.</td></tr>
                                    ) : (
                                        users.data.map((user) => {
                                            const payroll = currentMonthPayrolls[user.id];
                                            
                                            return (
                                                <tr key={user.id}>
                                                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                                    <td className="px-6 py-4 text-gray-500">{user.department || 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">₦{parseFloat(user.base_salary).toLocaleString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {!payroll ? (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Unpaid</span>
                                                        ) : (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                                                        )}
                                                    </td>
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
                                                                <Dropdown.Content align="left" width="48">
                                                                    <div className="py-1">
                                                                        <button 
                                                                            onClick={() => payEmployee(user.id, user.base_salary)}
                                                                            disabled={!!payroll || processing}
                                                                            className={`block w-full px-4 py-2 text-start text-sm leading-5 font-medium transition duration-150 ease-in-out ${!payroll ? 'text-green-600 hover:bg-gray-100 focus:bg-gray-100' : 'text-gray-400 cursor-not-allowed'}`}
                                                                        >
                                                                            {payroll ? 'Payment Completed' : 'Pay Employee'}
                                                                        </button>
                                                                        <a 
                                                                            href={payroll ? route('payroll.slip', payroll.id) : '#'} 
                                                                            target={payroll ? "_blank" : "_self"}
                                                                            rel="noopener noreferrer"
                                                                            className={`block w-full px-4 py-2 text-start text-sm leading-5 font-medium transition duration-150 ease-in-out ${payroll ? 'text-blue-600 hover:bg-gray-100 focus:bg-gray-100' : 'text-gray-400 cursor-not-allowed pointer-events-none'}`}
                                                                        >
                                                                            Print Payslip
                                                                        </a>
                                                                    </div>
                                                                </Dropdown.Content>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden divide-y divide-gray-200">
                            {users.data.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">No employees found.</div>
                            ) : (
                                users.data.map((user) => {
                                    const payroll = currentMonthPayrolls[user.id];
                                    
                                    return (
                                        <div key={user.id} className="p-4 space-y-3 bg-white">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-md font-bold text-gray-900">{user.name}</h4>
                                                    <p className="text-sm text-gray-500">{user.department || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    {!payroll ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Unpaid</span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-sm pt-2">
                                                <span className="text-gray-500 block">Base Salary:</span>
                                                <span className="font-bold text-gray-900">₦{parseFloat(user.base_salary).toLocaleString()}</span>
                                            </div>
                                            <div className="pt-3 border-t border-gray-100">
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
                                                        <div className="py-1">
                                                            <button 
                                                                onClick={() => payEmployee(user.id, user.base_salary)}
                                                                disabled={!!payroll || processing}
                                                                className={`block w-full px-4 py-3 text-start text-sm leading-5 font-medium transition duration-150 ease-in-out ${!payroll ? 'text-green-600 hover:bg-gray-100 focus:bg-gray-100' : 'text-gray-400 cursor-not-allowed'}`}
                                                            >
                                                                {payroll ? 'Payment Completed' : 'Pay Employee'}
                                                            </button>
                                                            <a 
                                                                href={payroll ? route('payroll.slip', payroll.id) : '#'} 
                                                                target={payroll ? "_blank" : "_self"}
                                                                rel="noopener noreferrer"
                                                                className={`block w-full px-4 py-3 text-start text-sm leading-5 font-medium transition duration-150 ease-in-out ${payroll ? 'text-blue-600 hover:bg-gray-100 focus:bg-gray-100' : 'text-gray-400 cursor-not-allowed pointer-events-none'}`}
                                                            >
                                                                Print Payslip
                                                            </a>
                                                        </div>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        <Pagination links={users.links} />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
