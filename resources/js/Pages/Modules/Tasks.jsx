import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function Tasks({ tasks = [] }) {
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

                    {/* Task List */}
                    <div className="bg-white shadow-sm border border-gray-200 rounded-sm overflow-hidden">
                        <div className="p-6 border-b bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-800">Active Tasks</h3>
                        </div>
                        <div className="p-6">
                            {tasks.length === 0 ? (
                                <p className="text-gray-500 text-center">No tasks assigned.</p>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {tasks.map((task) => (
                                        <li key={task.id} className="py-4 flex justify-between items-center">
                                            <div>
                                                <h4 className="text-lg font-medium text-gray-900">{task.title}</h4>
                                                <p className="text-sm text-gray-500">{task.description}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm font-medium text-gray-500">Due: {task.due_date || 'N/A'}</span>
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {task.status}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
