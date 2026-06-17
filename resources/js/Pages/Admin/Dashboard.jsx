import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AdminDashboard({ user }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Administrator Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold mb-4">Welcome back, {user.name}!</h3>
                            <p>You have full system access. Use the sidebar to manage users, assign roles, and configure system settings.</p>
                            
                            {/* Placeholder for Admin Widgets */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                                    <h4 className="font-bold text-green-800 text-lg mb-2">Staff Directory</h4>
                                    <p className="text-green-700">Manage all employee records and access levels.</p>
                                </div>
                                <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                                    <h4 className="font-bold text-blue-800 text-lg mb-2">System Audit Logs</h4>
                                    <p className="text-blue-700">View recent activity across all departments.</p>
                                </div>
                                <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
                                    <h4 className="font-bold text-purple-800 text-lg mb-2">Global Settings</h4>
                                    <p className="text-purple-700">Configure global application parameters.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
