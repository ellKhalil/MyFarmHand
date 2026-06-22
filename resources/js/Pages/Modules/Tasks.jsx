import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Pagination from '@/Components/Pagination';
import Dropdown from '@/Components/Dropdown';
import { useState } from 'react';

export default function Tasks({ tasks, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('tasks.index'), { search, sort_field: filters.sort_field, sort_direction: filters.sort_direction }, { preserveState: true, replace: true });
    };

    const handleSort = (field) => {
        let direction = 'asc';
        if (filters.sort_field === field && filters.sort_direction === 'asc') {
            direction = 'desc';
        }
        router.get(route('tasks.index'), { search, sort_field: field, sort_direction: direction }, { preserveState: true, replace: true });
    };
    const { data, setData, post, processing, reset } = useForm({
        title: '',
        description: '',
        due_date: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tasks & Orders
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Task List */}
                    <div className="bg-white shadow-sm border border-gray-200 rounded-sm overflow-visible">
                        <div className="p-6 border-b bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <h3 className="text-lg font-bold text-gray-800">Active Tasks</h3>
                            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                                <div className="flex w-full sm:w-64">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search tasks..."
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
                                            <button type="button" onClick={() => router.get(route('tasks.index'), { search, sort_field: 'created_at', sort_direction: 'desc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'created_at' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Newest</button>
                                            <button type="button" onClick={() => router.get(route('tasks.index'), { search, sort_field: 'title', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'title' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Title (A-Z)</button>
                                            <button type="button" onClick={() => router.get(route('tasks.index'), { search, sort_field: 'title', sort_direction: 'desc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'title' && filters.sort_direction === 'desc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Title (Z-A)</button>
                                            <button type="button" onClick={() => router.get(route('tasks.index'), { search, sort_field: 'due_date', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'due_date' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Due Date (Earliest)</button>
                                            <button type="button" onClick={() => router.get(route('tasks.index'), { search, sort_field: 'due_date', sort_direction: 'desc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'due_date' && filters.sort_direction === 'desc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Due Date (Latest)</button>
                                            <button type="button" onClick={() => router.get(route('tasks.index'), { search, sort_field: 'status', sort_direction: 'asc' }, { preserveState: true, replace: true })} className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ${filters.sort_field === 'status' && filters.sort_direction === 'asc' ? 'font-bold bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>Status</button>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </form>
                        </div>
                        <div className="hidden md:block overflow-visible">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('title')}>
                                            Task Title {filters.sort_field === 'title' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('due_date')}>
                                            Due Date {filters.sort_field === 'due_date' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200" onClick={() => handleSort('status')}>
                                            Status {filters.sort_field === 'status' && (filters.sort_direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {!tasks.data || tasks.data.length === 0 ? (
                                        <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No tasks assigned.</td></tr>
                                    ) : (
                                        tasks.data.map((task) => (
                                            <tr key={task.id}>
                                                <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
                                                <td className="px-6 py-4 text-gray-500">{task.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{task.due_date || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {task.status}
                                                    </span>
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
                                                            {task.status !== 'Completed' && (
                                                                <button className="block w-full px-4 py-2 text-start text-sm leading-5 text-green-600 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                                                    Mark Complete
                                                                </button>
                                                            )}
                                                            <button className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                                                Edit Task
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
                            {!tasks.data || tasks.data.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">No tasks assigned.</div>
                            ) : (
                                tasks.data.map((task) => (
                                    <div key={task.id} className="p-4 space-y-3 bg-white">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">{task.title}</h4>
                                                <p className="text-xs text-gray-500">Due: {task.due_date || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {task.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {task.description}
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
                                                    {task.status !== 'Completed' && (
                                                        <button className="block w-full px-4 py-3 text-start text-sm leading-5 text-green-600 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                                            Mark Complete
                                                        </button>
                                                    )}
                                                    <button className="block w-full px-4 py-3 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                                        Edit Task
                                                    </button>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {tasks.links && <Pagination links={tasks.links} />}
                    </div>

                    {/* Add New Task */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Create New Task</h3>
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="title" value="Task Title" />
                                <TextInput id="title" className="mt-1 block w-full" value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                            </div>
                            <div>
                                <InputLabel htmlFor="due_date" value="Due Date" />
                                <TextInput id="due_date" type="date" className="mt-1 block w-full" value={data.due_date} onChange={(e) => setData('due_date', e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                                <InputLabel htmlFor="description" value="Description" />
                                <TextInput id="description" className="mt-1 block w-full" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <PrimaryButton disabled={processing}>Assign Task</PrimaryButton>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
