import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

export default function DirectorDashboard({ user }) {
    const [analytics, setAnalytics] = useState({ finance: [], mortality: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/analytics')
            .then(res => res.json())
            .then(data => {
                setAnalytics(data);
                setLoading(false);
            })
            .catch(err => console.error("Failed to fetch analytics", err));
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Director Analytics & Overview
                </h2>
            }
        >
            <Head title="Director Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="text-center py-20 text-gray-500">Loading Enterprise Analytics...</div>
                    ) : (
                        <div className="space-y-8">
                            
                            {/* Financial Performance */}
                            <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Financial Performance (Revenue vs Expenses)</h3>
                                <div className="h-96">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={analytics.finance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                            <XAxis dataKey="month" stroke="#6B7280" />
                                            <YAxis stroke="#6B7280" />
                                            <Tooltip contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                            <Legend />
                                            <Bar dataKey="revenue" name="Revenue" fill="#15803d" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="expenses" name="Expenses" fill="#b91c1c" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Batch Mortality Rates */}
                            <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Active Batch Mortality Rates</h3>
                                <div className="h-96">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={analytics.mortality} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                            <XAxis dataKey="name" stroke="#6B7280" />
                                            <YAxis stroke="#6B7280" />
                                            <Tooltip contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                            <Legend />
                                            <Line type="monotone" dataKey="mortality" name="Total Mortalities" stroke="#ea580c" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
