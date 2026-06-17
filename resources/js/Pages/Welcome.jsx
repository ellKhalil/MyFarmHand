import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Enterprise Management | MyFarmHand" />
            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-green-700 selection:text-white">
                
                {/* Header Navigation */}
                <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-20 items-center">
                            <div className="flex-shrink-0 flex items-center">
                                {/* Text Logo */}
                                <span className="text-green-800 text-3xl font-extrabold tracking-tight flex items-center gap-2">
                                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                    </svg>
                                    MyFarmHand
                                </span>
                            </div>
                            <nav className="hidden md:flex space-x-8">
                                <a href="#capabilities" className="text-gray-600 hover:text-green-700 font-medium px-3 py-2 text-sm transition">Capabilities</a>
                                <a href="#roles" className="text-gray-600 hover:text-green-700 font-medium px-3 py-2 text-sm transition">Access Management</a>
                                <a href="#analytics" className="text-gray-600 hover:text-green-700 font-medium px-3 py-2 text-sm transition">Analytics</a>
                            </nav>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="text-green-800 font-bold hover:text-green-600 px-3 py-2 transition"
                                    >
                                        Access Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 font-semibold hover:text-green-700 px-3 py-2 transition"
                                        >
                                            Staff Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-green-700 text-white font-bold hover:bg-green-800 px-6 py-2.5 rounded-sm shadow-md transition"
                                        >
                                            Admin Setup
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main>
                    <div className="relative bg-green-900 overflow-hidden">
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-800 opacity-90 mix-blend-multiply"></div>
                            {/* Abstract Pattern overlay */}
                            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" fill="none" viewBox="0 0 1463 360">
                                <path className="text-green-800 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
                                <path className="text-green-700 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
                            </svg>
                        </div>
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
                            <div className="md:w-2/3">
                                <span className="text-green-300 font-semibold tracking-wider uppercase text-sm mb-4 block">Enterprise Resource Planning</span>
                                <h1 className="text-5xl tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl mb-6">
                                    Intelligent Operations for Modern Agriculture
                                </h1>
                                <p className="text-xl text-green-100 max-w-2xl mb-10 leading-relaxed">
                                    MyFarmHand centralizes inventory management, tracks production yields, automates payroll, and delivers real-time financial analytics—empowering stakeholders to make data-driven decisions.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href={route('login')}
                                        className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-sm text-green-900 bg-white hover:bg-gray-100 shadow-lg transition"
                                    >
                                        Secure Staff Portal
                                    </Link>
                                    <a
                                        href="#capabilities"
                                        className="inline-flex justify-center items-center px-8 py-4 border-2 border-green-400 text-lg font-bold rounded-sm text-white hover:bg-green-800 hover:border-green-300 transition"
                                    >
                                        Explore Capabilities
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Banner */}
                    <div className="bg-white border-b border-gray-200">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                                <div>
                                    <div className="text-4xl font-extrabold text-green-700">99.9%</div>
                                    <div className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wide">Uptime Reliability</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-extrabold text-green-700">Real-Time</div>
                                    <div className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wide">Data Synchronization</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-extrabold text-green-700">Automated</div>
                                    <div className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wide">Payroll & Ledger</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-extrabold text-green-700">Multi-Tier</div>
                                    <div className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wide">Access Control</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comprehensive Capabilities Grid */}
                    <div id="capabilities" className="py-24 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">System Architecture</h2>
                                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    End-to-End Operational Control
                                </p>
                                <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                                    Built for scale, MyFarmHand replaces fragmented spreadsheets with a unified, high-performance database architecture.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {/* Capability 1 */}
                                <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-100 transition duration-300">
                                    <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Inventory Dynamics</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Log raw materials, feed, and medical supplies. Configure low-stock thresholds to receive automated procurement alerts before operations are disrupted.
                                    </p>
                                </div>

                                {/* Capability 2 */}
                                <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-100 transition duration-300">
                                    <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Yield & Mortality Tracking</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Monitor livestock populations across multiple active batches. Log daily production metrics and mortality rates to calculate real-time biological asset valuation.
                                    </p>
                                </div>

                                {/* Capability 3 */}
                                <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-100 transition duration-300">
                                    <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Financial Ledger (P&L)</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Immutable records of operational expenditures and revenue generation. Instantly generate Profit & Loss statements for quarterly audits.
                                    </p>
                                </div>

                                {/* Capability 4 */}
                                <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-100 transition duration-300">
                                    <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Workforce & Task Orders</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Dispatch tasks to specific departments or users. Track completion statuses and maintain a comprehensive directory of human resources.
                                    </p>
                                </div>

                                {/* Capability 5 */}
                                <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-100 transition duration-300">
                                    <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Automated Payroll</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Calculate net payables based on base salaries, custom allowances, and automated deductions. Streamline month-end accounting.
                                    </p>
                                </div>

                                {/* Capability 6 */}
                                <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-100 transition duration-300">
                                    <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">System Alerts</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Receive real-time push notifications for critical events, overdue work orders, and supply chain bottlenecks directly in the dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Role Based Access Section */}
                    <div id="roles" className="py-20 bg-white border-t border-gray-200">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="md:flex md:items-center md:justify-between">
                                <div className="md:w-1/2 pr-10">
                                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-4">
                                        Strict Role-Based Access Control
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-6">
                                        Security and segregation of duties are paramount. MyFarmHand ensures that personnel only access the modules critical to their specific organizational role.
                                    </p>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 h-6 w-6 text-green-600 font-bold">✓</div>
                                            <p className="ml-3 text-gray-700"><strong className="text-gray-900">Administrators:</strong> Full system override, staff management, and role assignment.</p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 h-6 w-6 text-green-600 font-bold">✓</div>
                                            <p className="ml-3 text-gray-700"><strong className="text-gray-900">Managing Directors:</strong> Global analytics, yield trends, and final strategic approvals.</p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 h-6 w-6 text-green-600 font-bold">✓</div>
                                            <p className="ml-3 text-gray-700"><strong className="text-gray-900">Accountants:</strong> Exclusive access to payroll finalization and the financial ledger.</p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 h-6 w-6 text-green-600 font-bold">✓</div>
                                            <p className="ml-3 text-gray-700"><strong className="text-gray-900">Store Keepers:</strong> Sandboxed access to inventory transactions and restock forms.</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-10 md:mt-0 md:w-1/2">
                                    <div className="bg-gray-100 p-8 rounded-sm border border-gray-200 shadow-inner">
                                        {/* Abstract UI representation */}
                                        <div className="space-y-4">
                                            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                            <div className="grid grid-cols-2 gap-4 pt-6">
                                                <div className="h-24 bg-white border border-gray-200 shadow-sm rounded"></div>
                                                <div className="h-24 bg-white border border-gray-200 shadow-sm rounded"></div>
                                                <div className="h-24 bg-white border border-green-500 shadow-sm rounded relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-2 text-green-600 text-xs font-bold bg-green-100 border-b border-l border-green-200">Authorized</div>
                                                </div>
                                                <div className="h-24 bg-white border border-gray-200 shadow-sm rounded relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-gray-50 bg-opacity-70 flex items-center justify-center">
                                                        <span className="text-gray-400 text-sm font-semibold">Restricted</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-green-800">
                        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                <span className="block">Ready to streamline your farm?</span>
                                <span className="block text-green-300">Access your secure dashboard today.</span>
                            </h2>
                            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 gap-4">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-sm text-green-900 bg-white hover:bg-gray-100 transition"
                                >
                                    Log In to Portal
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
                
                {/* Footer */}
                <footer className="bg-gray-900">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center">
                            <span className="text-white text-xl font-bold flex items-center gap-2">
                                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                </svg>
                                MyFarmHand
                            </span>
                            <p className="text-sm text-gray-400">
                                &copy; {new Date().getFullYear()} MyFarmHand Enterprise Management. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
