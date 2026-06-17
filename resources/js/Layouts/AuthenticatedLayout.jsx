import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans selection:bg-green-700 selection:text-white">
            {/* Toast Notification */}
            {usePage().props.flash.success && (
                <div className="fixed top-4 right-4 z-50 bg-green-50 border-l-4 border-green-500 p-4 shadow-md rounded-r-md">
                    <div className="flex items-center">
                        <svg className="h-6 w-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <p className="text-sm font-medium text-green-800">{usePage().props.flash.success}</p>
                    </div>
                </div>
            )}
            {usePage().props.flash.error && (
                <div className="fixed top-4 right-4 z-50 bg-red-50 border-l-4 border-red-500 p-4 shadow-md rounded-r-md">
                    <div className="flex items-center">
                        <svg className="h-6 w-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        <p className="text-sm font-medium text-red-800">{usePage().props.flash.error}</p>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <aside className="w-64 bg-green-900 text-white flex-shrink-0 hidden md:flex flex-col">
                <div className="h-16 flex items-center justify-center border-b border-green-800">
                    <Link href="/" className="flex items-center gap-2 group">
                        <svg className="h-8 w-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        <span className="text-xl font-extrabold tracking-tight">
                            MyFarmHand
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-2">
                        <li>
                            <Link href={route('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${route().current('dashboard') ? 'bg-green-800 text-white font-medium' : 'hover:bg-green-800 text-green-100'}`}>
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href={route('inventory.index')} className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${route().current('inventory.index') ? 'bg-green-800 text-white font-medium' : 'hover:bg-green-800 text-green-100'}`}>
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                                Inventory
                            </Link>
                        </li>
                        <li>
                            <Link href={route('finance.index')} className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${route().current('finance.index') ? 'bg-green-800 text-white font-medium' : 'hover:bg-green-800 text-green-100'}`}>
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Payroll & Ledger
                            </Link>
                        </li>
                        <li>
                            <Link href={route('tasks.index')} className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${route().current('tasks.index') ? 'bg-green-800 text-white font-medium' : 'hover:bg-green-800 text-green-100'}`}>
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                                Tasks & Orders
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="p-4 border-t border-green-800 text-sm text-green-300">
                    &copy; MyFarmHand v1.0
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm z-10">
                    <div className="flex items-center">
                        <button
                            onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Notification Bell */}
                        <button className="relative text-gray-400 hover:text-green-600 transition">
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        </button>

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="inline-flex items-center gap-2 border-l pl-6 border-gray-200 text-sm font-medium leading-4 text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold">
                                        P
                                    </div>
                                    <span>Profile</span>
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile Settings</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Mobile Menu Dropdown */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden bg-green-800 absolute w-full z-20'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href={route('dashboard')} className="block pl-3 pr-4 py-2 border-l-4 border-green-400 text-base font-medium text-white bg-green-900 focus:outline-none focus:text-white focus:bg-green-700 focus:border-green-300 transition duration-150 ease-in-out">
                            Dashboard
                        </Link>
                        <a href="#" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-green-200 hover:text-white hover:bg-green-700 focus:outline-none focus:text-white focus:bg-green-700 transition duration-150 ease-in-out">
                            Inventory
                        </a>
                    </div>
                    <div className="pt-4 pb-1 border-t border-green-700">
                        <div className="mt-3 space-y-1">
                            <Dropdown.Link href={route('profile.edit')}>Profile Settings</Dropdown.Link>
                            <Dropdown.Link method="post" href={route('logout')} as="button">
                                Log Out
                            </Dropdown.Link>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    {header && (
                        <div className="bg-white shadow-sm border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
