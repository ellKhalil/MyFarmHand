import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Dropdown from '@/Components/Dropdown';
import { useState } from 'react';

export default function Users({ users, roles = [], departments = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('users.index'), { search, sort_field: filters.sort_field, sort_direction: filters.sort_direction }, { preserveState: true, replace: true });
    };

    const handleSort = (field) => {
        let direction = 'asc';
        if (filters.sort_field === field && filters.sort_direction === 'asc') {
            direction = 'desc';
        }
        router.get(route('users.index'), { search, sort_field: field, sort_direction: direction }, { preserveState: true, replace: true });
    };
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
                    
                    {/* Employee Directory */}
                    <div className="bg-white shadow-sm border border-gray-200 rounded-sm overflow-visible">
                        <div className="p-6 border-b bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <h3 className="text-lg font-bold text-gray-800">Employee Directory</h3>
                            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                                <div className="flex w-full sm:w-64">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search by name, email, or dept..."
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
                                            <button type="button" onClick={() => router.get(route('users.index'), { search, sort_field: 'created_at', sort_direction: 'desc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'created_at' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Newest</button>
                                            <button type="button" onClick={() => router.get(route('users.index'), { search, sort_field: 'name', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'name' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Name (A-Z)</button>
                                            <button type="button" onClick={() => router.get(route('users.index'), { search, sort_field: 'name', sort_direction: 'desc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'name' && filters.sort_direction === 'desc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Name (Z-A)</button>
                                            <button type="button" onClick={() => router.get(route('users.index'), { search, sort_field: 'department', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'department' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Department (A-Z)</button>
                                            <button type="button" onClick={() => router.get(route('users.index'), { search, sort_field: 'base_salary', sort_direction: 'desc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'base_salary' && filters.sort_direction === 'desc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Salary (High-Low)</button>
                                            <button type="button" onClick={() => router.get(route('users.index'), { search, sort_field: 'base_salary', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'base_salary' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Salary (Low-High)</button>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </form>
                        </div>
                        <div className="hidden md:block overflow-visible">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('name')}>
                                            Employee {filters.sort_field === 'name' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('department')}>
                                            Department {filters.sort_field === 'department' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('base_salary')}>
                                            Base Salary {filters.sort_field === 'base_salary' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {!users.data || users.data.length === 0 ? (
                                        <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No users found.</td></tr>
                                    ) : (
                                        users.data.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0">
                                                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                                <span className="text-green-800 font-bold text-lg">{user.name.charAt(0)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="font-medium text-gray-900">{user.name}</div>
                                                            <div className="text-sm text-gray-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {user.role ? user.role.role_name : 'No Role'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {user.department || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                                                    ₦{parseFloat(user.base_salary).toLocaleString()}
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
                                                        <Dropdown.Content align="right" width="48">
                                                            <button className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                                                Edit Profile
                                                            </button>
                                                            <button className="block w-full px-4 py-2 text-start text-sm leading-5 text-red-600 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                                                Deactivate
                                                            </button>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden divide-y divide-gray-200">
                            {!users.data || users.data.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">No users found.</div>
                            ) : (
                                users.data.map((user) => (
                                    <div key={user.id} className="p-4 space-y-3 bg-white">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                <span className="text-green-800 font-bold text-xl">{user.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-md font-bold text-gray-900">{user.name}</h4>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm pt-2">
                                            <div>
                                                <span className="text-gray-500 block">Role:</span>
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {user.role ? user.role.role_name : 'No Role'}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block">Department:</span>
                                                <span className="font-medium text-gray-900">{user.department || 'N/A'}</span>
                                            </div>
                                        </div>
                                        <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                                            <span className="text-gray-500 text-sm">Salary:</span>
                                            <span className="font-bold text-gray-900">₦{parseFloat(user.base_salary).toLocaleString()}</span>
                                        </div>
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
                                                    <button className="block w-full px-4 py-3 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                                        Edit Profile
                                                    </button>
                                                    <button className="block w-full px-4 py-3 text-start text-sm leading-5 text-red-600 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                                        Deactivate
                                                    </button>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <Pagination links={users.links} />
                    </div>

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
                                <select id="department" className="mt-1 block w-full border-gray-300 focus:border-green-600 focus:ring-green-600 rounded-sm shadow-sm" value={data.department} onChange={(e) => setData('department', e.target.value)} required>
                                    <option value="" disabled>Select Department...</option>
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                                    ))}
                                </select>
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

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
