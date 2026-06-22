import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { useState } from 'react';

export default function Settings({ departments = [] }) {
    const userRole = usePage().props.auth.user?.role?.role_name;
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        base_salary: ''
    });

    const [editingDept, setEditingDept] = useState(null);
    const [editSalary, setEditSalary] = useState('');

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.departments.store'), {
            onSuccess: () => reset('name', 'base_salary'),
        });
    };

    const deleteDepartment = (id) => {
        if (confirm('Are you sure you want to delete this department?')) {
            router.delete(route('settings.departments.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const handleEditSave = (id) => {
        router.put(route('settings.departments.update', id), { base_salary: editSalary }, {
            preserveScroll: true,
            onSuccess: () => setEditingDept(null)
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    System Settings & Configuration
                </h2>
            }
        >
            <Head title="Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Manage Departments</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Add or remove departments, and set their fixed Base Salary. Updating a department's salary will automatically synchronize the salaries of all employees within that department.
                        </p>

                        <div className={userRole !== 'Managing Director' ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "max-w-3xl mx-auto"}>
                            {/* Add Department Form */}
                            {userRole !== 'Managing Director' && (
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-3">Add New Department</h4>
                                <form onSubmit={submit} className="space-y-4">
                                    <div>
                                        <InputLabel htmlFor="name" value="Department Name" />
                                        <TextInput 
                                            id="name" 
                                            className="mt-1 block w-full" 
                                            value={data.name} 
                                            onChange={(e) => setData('name', e.target.value)} 
                                            required 
                                        />
                                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="base_salary" value="Fixed Base Salary (₦)" />
                                        <TextInput 
                                            id="base_salary" 
                                            type="number"
                                            step="0.01"
                                            className="mt-1 block w-full" 
                                            value={data.base_salary} 
                                            onChange={(e) => setData('base_salary', e.target.value)} 
                                            required 
                                        />
                                        {errors.base_salary && <div className="text-red-500 text-sm mt-1">{errors.base_salary}</div>}
                                    </div>
                                    <div className="flex justify-end">
                                        <PrimaryButton disabled={processing}>Add Department</PrimaryButton>
                                    </div>
                                </form>
                            </div>
                            )}

                            {/* Departments List */}
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-3">Existing Departments</h4>
                                <div className="bg-gray-50 border border-gray-200 rounded-md max-h-[500px] overflow-y-auto">
                                    <ul className="divide-y divide-gray-200">
                                        {departments.length === 0 ? (
                                            <li className="p-4 text-sm text-gray-500">No departments found.</li>
                                        ) : (
                                            departments.map((dept) => (
                                                <li key={dept.id} className="p-4 flex flex-col hover:bg-gray-100 transition">
                                                    <div className="flex items-center justify-between w-full">
                                                        <div>
                                                            <span className="font-medium text-gray-900">{dept.name}</span>
                                                            <div className="text-sm text-gray-500 mt-1">
                                                                Salary: ₦{parseFloat(dept.base_salary || 0).toLocaleString()}
                                                            </div>
                                                        </div>
                                                        {userRole !== 'Managing Director' && (
                                                        <div className="flex space-x-3">
                                                            <button 
                                                                onClick={() => {
                                                                    setEditingDept(dept.id);
                                                                    setEditSalary(dept.base_salary);
                                                                }}
                                                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium focus:outline-none"
                                                            >
                                                                Edit Salary
                                                            </button>
                                                            <button 
                                                                onClick={() => deleteDepartment(dept.id)}
                                                                className="text-red-600 hover:text-red-800 text-sm font-medium focus:outline-none"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                        )}
                                                    </div>
                                                    
                                                    {editingDept === dept.id && (
                                                        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center space-x-2">
                                                            <TextInput 
                                                                type="number"
                                                                step="0.01"
                                                                className="w-1/2 text-sm"
                                                                value={editSalary}
                                                                onChange={(e) => setEditSalary(e.target.value)}
                                                            />
                                                            <button 
                                                                onClick={() => handleEditSave(dept.id)}
                                                                className="bg-green-600 text-white px-3 py-1.5 rounded-sm text-sm hover:bg-green-700"
                                                            >
                                                                Save
                                                            </button>
                                                            <button 
                                                                onClick={() => setEditingDept(null)}
                                                                className="text-gray-500 px-2 py-1.5 text-sm hover:text-gray-700"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    )}
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
