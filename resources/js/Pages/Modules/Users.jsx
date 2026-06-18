import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function Users({ users = [], roles = [] }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        role_id: '',
        department: '',
        base_salary: '',
        hire_date: '',
        phone_number: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Team & Users
                </h2>
            }
        >
            <Head title="Team & Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Onboard New Employee Form */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Onboard New Employee</h3>
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <InputLabel htmlFor="name" value="Full Name" />
                                <TextInput id="name" className="mt-1 block w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <InputLabel htmlFor="email" value="Email Address" />
                                <TextInput id="email" type="email" className="mt-1 block w-full" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                            </div>
                            <div>
                                <InputLabel htmlFor="role_id" value="System Role" />
                                <select id="role_id" className="mt-1 block w-full border-gray-300 focus:border-green-600 focus:ring-green-600 rounded-sm shadow-sm" value={data.role_id} onChange={(e) => setData('role_id', e.target.value)} required>
                                    <option value="" disabled>Select Role...</option>
                                    {roles.map(role => (
                                        <option key={role.id} value={role.id}>{role.role_name}</option>
                                    ))}
                                </select>
                                {errors.role_id && <div className="text-red-500 text-sm mt-1">{errors.role_id}</div>}
                            </div>
                            <div>
                                <InputLabel htmlFor="department" value="Department" />
                                <TextInput id="department" className="mt-1 block w-full" value={data.department} onChange={(e) => setData('department', e.target.value)} />
                            </div>
                            <div>
                                <InputLabel htmlFor="base_salary" value="Base Salary ($)" />
                                <TextInput id="base_salary" type="number" step="0.01" className="mt-1 block w-full" value={data.base_salary} onChange={(e) => setData('base_salary', e.target.value)} />
                            </div>
                            <div>
                                <InputLabel htmlFor="hire_date" value="Hire Date" />
                                <TextInput id="hire_date" type="date" className="mt-1 block w-full" value={data.hire_date} onChange={(e) => setData('hire_date', e.target.value)} />
                            </div>
                            <div>
                                <InputLabel htmlFor="phone_number" value="Phone Number" />
                                <TextInput id="phone_number" className="mt-1 block w-full" value={data.phone_number} onChange={(e) => setData('phone_number', e.target.value)} />
                            </div>
                            <div className="md:col-span-3 flex justify-end">
                                <PrimaryButton disabled={processing}>Register Employee</PrimaryButton>
                            </div>
                        </form>
                    </div>

                    {/* Employee Directory */}
                    <div className="bg-white shadow-sm border border-gray-200 rounded-sm overflow-hidden">
                        <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">Employee Directory</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Salary</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.length === 0 ? (
                                        <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No employees found.</td></tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{user.name}</div>
                                                    <div className="text-sm text-gray-500">Hired: {user.hire_date || 'N/A'}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {user.role?.role_name || 'Unassigned'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.department || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{user.email}</div>
                                                    <div className="text-sm text-gray-500">{user.phone_number || 'No phone'}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">${parseFloat(user.base_salary).toFixed(2)}</td>
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
