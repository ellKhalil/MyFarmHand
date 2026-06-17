import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to MyFarmHand" />
            <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-green-600 selection:text-white">
                {/* Header Navigation */}
                <header className="bg-green-700 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-20 items-center">
                            <div className="flex-shrink-0 flex items-center">
                                {/* Text Logo */}
                                <span className="text-white text-2xl font-bold tracking-tight">
                                    MyFarmHand
                                </span>
                            </div>
                            <nav className="flex space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="text-white font-semibold hover:text-green-200 px-3 py-2 text-lg transition"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-white font-semibold hover:text-green-200 px-3 py-2 text-lg transition"
                                        >
                                            Staff Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-white text-green-700 font-bold hover:bg-green-50 px-5 py-2 rounded shadow transition"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main>
                    <div className="relative">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-24">
                            <div className="text-center">
                                <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
                                    <span className="block">Enterprise Management</span>
                                    <span className="block text-green-600">For Modern Agriculture</span>
                                </h1>
                                <p className="mt-5 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
                                    Comprehensive tracking for inventory, production yields, payroll, and tasks. MyFarmHand brings institutional-grade efficiency to your agricultural operations.
                                </p>
                                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                                    <div className="space-y-4 sm:space-y-0 sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                        <Link
                                            href={route('login')}
                                            className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 md:py-4 md:text-lg md:px-10 shadow-lg transition"
                                        >
                                            Access Portal
                                        </Link>
                                        <a
                                            href="#features"
                                            className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10 transition"
                                        >
                                            View Features
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div id="features" className="py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Inventory Control</h3>
                                    <p className="text-gray-600">Track feed, livestock, and supplies with automated low-stock threshold alerts.</p>
                                </div>
                                <div className="p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Production Tracking</h3>
                                    <p className="text-gray-600">Log daily yields, track batch mortality rates, and analyze performance across departments.</p>
                                </div>
                                <div className="p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Ledger</h3>
                                    <p className="text-gray-600">Keep a detailed record of operational expenses and sales revenue for full P&L reports.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                
                {/* Footer */}
                <footer className="bg-gray-800 mt-auto">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-base text-gray-400">
                            &copy; {new Date().getFullYear()} MyFarmHand ERP System. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
