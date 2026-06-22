import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const AnimatedSentence = ({ text, delayOffset = 0, letterDelay = 0.03, className = "" }) => {
    return (
        <span className={`flex flex-wrap ${className}`}>
            {text.split(' ').map((word, wordIndex, wordsArray) => {
                const prevLetters = wordsArray.slice(0, wordIndex).join('').length;
                return (
                    <span key={wordIndex} className="inline-block mr-[0.3em]">
                        {word.split('').map((char, charIndex) => (
                            <span 
                                key={charIndex} 
                                className="inline-block animate-fade-in-up" 
                                style={{ 
                                    animationDelay: `${(prevLetters + charIndex) * letterDelay + delayOffset}s`, 
                                    opacity: 0, 
                                    animationFillMode: 'forwards' 
                                }}
                            >
                                {char}
                            </span>
                        ))}
                    </span>
                );
            })}
        </span>
    );
};

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
                                    <img src="/logo.png" alt="MyFarmHand" className="w-10 h-10 object-contain" />
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
                            {/* Removed Multiplayer Cursors as requested */}
                        </div>
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
                            <div className="md:w-2/3">
                                <span className="text-green-300 font-semibold tracking-wider uppercase text-sm mb-4 block">Enterprise Resource Planning</span>
                                <h1 className="text-5xl tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl mb-6">
                                    <AnimatedSentence text="Intelligent Operations for Modern Agriculture" letterDelay={0.03} />
                                </h1>
                                <p className="text-xl text-green-100 max-w-2xl mb-10 leading-relaxed">
                                    <AnimatedSentence 
                                        text="MyFarmHand centralizes inventory management, tracks production yields, automates payroll, and delivers real-time financial analytics—empowering stakeholders to make data-driven decisions." 
                                        delayOffset={1.2} 
                                        letterDelay={0.015} 
                                    />
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

                    {/* Marquee Banner */}
                    <div className="bg-green-800 py-3 overflow-hidden border-b border-green-700 flex w-full">
                        <div className="whitespace-nowrap animate-marquee flex space-x-16 items-center flex-shrink-0">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex space-x-16 items-center text-green-200 text-sm font-bold tracking-widest uppercase pr-16">
                                    <span>Real-Time Inventory</span>
                                    <span>•</span>
                                    <span>Automated Payroll Processing</span>
                                    <span>•</span>
                                    <span>Strict Role-Based Access Control</span>
                                    <span>•</span>
                                    <span>Financial Ledger Synchronization</span>
                                    <span>•</span>
                                    <span>Multi-Tier Dashboards</span>
                                    <span>•</span>
                                </div>
                            ))}
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
                                        Log raw materials, feed, and medical supplies. Configure low-stock thresholds to receive automated procurement alerts. <span className="font-semibold text-green-700">New:</span> Purchasing inventory automatically registers expenses in the Financial Ledger to prevent double-entry.
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
                                        Immutable records of operational expenditures and revenue generation. The ledger automatically syncs with Payroll and Inventory purchases, allowing Accountants to instantly generate accurate Profit & Loss statements.
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
                                        Calculate net payables based on strictly-enforced departmental base salaries. Automated deductions and one-click payouts ensure immediate synchronization with the main financial ledger.
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
                                <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
                                    <img 
                                        src="/rbac_mockup.png?v=1.1" 
                                        alt="MyFarmHand Multi-Device Access" 
                                        className="w-full max-w-lg h-auto object-contain animate-float"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="py-20 bg-gray-50 border-t border-gray-200">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Onboarding Process</h2>
                                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    3 Steps to Total Operational Control
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
                                {/* Connecting line for desktop */}
                                <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-green-200 z-0"></div>
                                
                                <div className="relative z-10 text-center">
                                    <div className="w-24 h-24 mx-auto bg-white border-4 border-green-500 rounded-full flex items-center justify-center text-3xl font-bold text-green-700 shadow-md mb-6">
                                        1
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Configure Roles & Teams</h3>
                                    <p className="text-gray-600">Set up your organizational structure. Assign strict access controls to Admins, Accountants, and Storekeepers.</p>
                                </div>
                                <div className="relative z-10 text-center">
                                    <div className="w-24 h-24 mx-auto bg-white border-4 border-green-500 rounded-full flex items-center justify-center text-3xl font-bold text-green-700 shadow-md mb-6">
                                        2
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Log Initial Inventory</h3>
                                    <p className="text-gray-600">Populate your farm's biological and physical assets. Set low-stock alerts and map out your supply chain.</p>
                                </div>
                                <div className="relative z-10 text-center">
                                    <div className="w-24 h-24 mx-auto bg-white border-4 border-green-500 rounded-full flex items-center justify-center text-3xl font-bold text-green-700 shadow-md mb-6">
                                        3
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Automate Operations</h3>
                                    <p className="text-gray-600">Start operations. Watch as inventory purchases and automated payroll sync directly into your Financial Ledger in real-time.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security & Compliance Banner */}
                    <div className="bg-gray-900 text-white py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
                                        Enterprise-Grade Security
                                    </h2>
                                    <p className="text-gray-400 text-lg mb-6">
                                        Your farm's financial data and workforce records are your most valuable assets. MyFarmHand employs industry-leading encryption and architectural sandboxing to guarantee data integrity.
                                    </p>
                                    <ul className="space-y-4">
                                        <li className="flex items-center">
                                            <svg className="h-6 w-6 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <span className="text-gray-300 font-medium">End-to-End Database Encryption</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="h-6 w-6 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            <span className="text-gray-300 font-medium">Daily Automated Offshore Backups</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="h-6 w-6 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span className="text-gray-300 font-medium">Strict Route-Level Middleware Protection</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-2xl relative">
                                    <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-green-500 text-white font-bold px-4 py-1 rounded-full shadow-lg transform rotate-3">Protected</div>
                                    <pre className="text-sm text-green-400 font-mono overflow-x-auto">
                                        <code>
{`// Security Middleware Handlers
Route::middleware(['auth', 'role:Admin'])->group(function () {
    Route::get('/settings', [Settings::class, 'index']);
    Route::post('/users/manage', [User::class, 'store']);
});

// Financial Ledger Validation
$ledger->verifyIntegrity();
Log::info('Zero-knowledge proof validated.');`}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials Section */}
                    <div className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl mb-16">Trusted by Forward-Thinking Farms</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                                    <div className="flex text-yellow-400 mb-4">
                                        ★★★★★
                                    </div>
                                    <p className="text-gray-700 italic mb-6">"Since migrating to MyFarmHand, we've entirely eliminated double-entry accounting. Payroll now takes 15 minutes instead of 3 days."</p>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-lg">AJ</div>
                                        <div className="ml-4">
                                            <p className="text-gray-900 font-bold">Adebayo Johnson</p>
                                            <p className="text-gray-500 text-sm">Director, Green Valley Coop</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                                    <div className="flex text-yellow-400 mb-4">
                                        ★★★★★
                                    </div>
                                    <p className="text-gray-700 italic mb-6">"The role-based access control is a game changer. I can confidently let storekeepers log stock without exposing our financial ledgers."</p>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold text-lg">SO</div>
                                        <div className="ml-4">
                                            <p className="text-gray-900 font-bold">Sarah O'Connor</p>
                                            <p className="text-gray-500 text-sm">Farm Manager, Oakwood Farms</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                                    <div className="flex text-yellow-400 mb-4">
                                        ★★★★★
                                    </div>
                                    <p className="text-gray-700 italic mb-6">"Having our inventory directly linked to the Profit & Loss ledger means we are always audit-ready. Simply phenomenal software."</p>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-800 font-bold text-lg">ME</div>
                                        <div className="ml-4">
                                            <p className="text-gray-900 font-bold">Michael Eze</p>
                                            <p className="text-gray-500 text-sm">Head Accountant, AgriScale</p>
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
                
                {/* Comprehensive Footer */}
                <footer className="bg-gray-900 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                            <div className="col-span-1 md:col-span-1">
                                <span className="text-white text-xl font-bold flex items-center gap-2 mb-4">
                                    <img src="/logo.png" alt="MyFarmHand" className="w-8 h-8 object-contain" />
                                    MyFarmHand
                                </span>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    The intelligent operating system for modern agriculture. Unifying teams, automating ledgers, and delivering real-time actionable insights.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Solutions</h3>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-sm text-gray-400 hover:text-green-400 transition">Inventory Tracking</a></li>
                                    <li><a href="#" className="text-sm text-gray-400 hover:text-green-400 transition">Automated Payroll</a></li>
                                    <li><a href="#" className="text-sm text-gray-400 hover:text-green-400 transition">Financial Ledgers</a></li>
                                    <li><a href="#" className="text-sm text-gray-400 hover:text-green-400 transition">Task Delegation</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Company</h3>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-sm text-gray-400 hover:text-green-400 transition">About Us</a></li>
                                    <li><a href="#" className="text-sm text-gray-400 hover:text-green-400 transition">Careers</a></li>
                                    <li><a href="#" className="text-sm text-gray-400 hover:text-green-400 transition">Contact</a></li>
                                    <li><a href="#" className="text-sm text-gray-400 hover:text-green-400 transition">Partners</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Stay Updated</h3>
                                <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
                                <form className="flex">
                                    <input type="email" placeholder="Email address" className="bg-gray-800 border-gray-700 text-white w-full rounded-l-md focus:ring-green-500 focus:border-green-500 sm:text-sm px-4 py-2" />
                                    <button type="submit" className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-r-md text-sm font-medium transition">
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-gray-500">
                                &copy; {new Date().getFullYear()} MyFarmHand Enterprise Management. All rights reserved.
                            </p>
                            <div className="flex space-x-6">
                                <a href="#" className="text-gray-500 hover:text-white transition">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-white transition">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
