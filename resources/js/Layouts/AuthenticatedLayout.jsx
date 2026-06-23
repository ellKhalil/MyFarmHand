import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage, router } from '@inertiajs/react';
import { AdminNavbar, DirectorNavbar, StoreKeeperNavbar, AccountantNavbar, GeneralStaffNavbar } from '@/Components/RoleNavbars';

export default function AuthenticatedLayout({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const userRole = usePage().props.auth.user?.role?.role_name;

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
                        <img src="/logo.png" alt="MyFarmHand Logo" className="h-10 w-auto object-contain" />
                        <span className="text-xl font-extrabold tracking-tight">
                            MyFarmHand
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    {userRole === 'Admin' && <AdminNavbar />}
                    {userRole === 'Managing Director' && <DirectorNavbar />}
                    {userRole === 'Store Keeper' && <StoreKeeperNavbar />}
                    {userRole === 'Accountant' && <AccountantNavbar />}
                    {userRole === 'General Staff' && <GeneralStaffNavbar />}
                    {!userRole && <GeneralStaffNavbar />}
                </nav>

                <div className="p-4 border-t border-green-800 text-xs text-green-300">
                    &copy; MyFarmHand v2.0 <br/>
                    <span className="text-green-500">Designed by Nasir'sss Computech</span>
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
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="relative text-gray-400 hover:text-green-600 transition focus:outline-none mt-1">
                                    {usePage().props.auth.unreadNotificationsCount > 0 && (
                                        <span className="absolute top-0 right-0 -mt-1 -mr-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
                                    )}
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="right" width="64">
                                <div className="px-4 py-3 border-b border-gray-100 font-bold text-gray-700">Notifications</div>
                                <div className="max-h-64 overflow-y-auto">
                                    {usePage().props.auth.notifications?.length > 0 ? (
                                        usePage().props.auth.notifications.map((notification) => (
                                            <button 
                                                key={notification.id} 
                                                onClick={() => router.post(route('notifications.mark-read', notification.id))}
                                                className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition block text-sm ${notification.is_read ? 'text-gray-500' : 'font-semibold text-gray-900 bg-blue-50/30'}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs uppercase text-green-600 font-bold mb-1 block">{notification.type}</span>
                                                    {!notification.is_read && <span className="h-2 w-2 bg-blue-500 rounded-full"></span>}
                                                </div>
                                                <p>{notification.message}</p>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-4 py-6 text-center text-gray-500 text-sm">No new notifications.</div>
                                    )}
                                </div>
                            </Dropdown.Content>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="inline-flex items-center gap-2 border-l pl-6 border-gray-200 text-sm font-medium leading-4 text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold uppercase">
                                        {usePage().props.auth.user.name.charAt(0)}
                                    </div>
                                    <span>{usePage().props.auth.user.name}</span>
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        Profile Settings
                                    </div>
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                        <span className="text-red-600">Log Out</span>
                                    </div>
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Mobile Menu Dropdown */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden bg-green-800 absolute w-full z-20'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href={route('dashboard')} className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${route().current('dashboard') ? 'border-green-400 text-white bg-green-900 focus:bg-green-700 focus:border-green-300' : 'border-transparent text-green-200 hover:text-white hover:bg-green-700 focus:text-white focus:bg-green-700'}`}>
                            Dashboard
                        </Link>
                        {['Admin', 'Managing Director', 'Store Keeper'].includes(userRole) && (
                        <Link href={route('inventory.index')} className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${route().current('inventory.*') ? 'border-green-400 text-white bg-green-900 focus:bg-green-700 focus:border-green-300' : 'border-transparent text-green-200 hover:text-white hover:bg-green-700 focus:text-white focus:bg-green-700'}`}>
                            Inventory
                        </Link>
                        )}
                        {['Admin', 'Managing Director', 'Accountant'].includes(userRole) && (
                        <Link href={route('payroll.index')} className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${route().current('payroll.*') ? 'border-green-400 text-white bg-green-900 focus:bg-green-700 focus:border-green-300' : 'border-transparent text-green-200 hover:text-white hover:bg-green-700 focus:text-white focus:bg-green-700'}`}>
                            Payroll Management
                        </Link>
                        )}
                        {['Admin', 'Managing Director', 'Accountant'].includes(userRole) && (
                        <Link href={route('finance.index')} className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${route().current('finance.*') ? 'border-green-400 text-white bg-green-900 focus:bg-green-700 focus:border-green-300' : 'border-transparent text-green-200 hover:text-white hover:bg-green-700 focus:text-white focus:bg-green-700'}`}>
                            Financial Ledger
                        </Link>
                        )}
                        <Link href={route('tasks.index')} className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${route().current('tasks.*') ? 'border-green-400 text-white bg-green-900 focus:bg-green-700 focus:border-green-300' : 'border-transparent text-green-200 hover:text-white hover:bg-green-700 focus:text-white focus:bg-green-700'}`}>
                            Tasks & Orders
                        </Link>
                        {['Admin', 'Managing Director'].includes(userRole) && (
                        <Link href={route('users.index')} className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${route().current('users.*') ? 'border-green-400 text-white bg-green-900 focus:bg-green-700 focus:border-green-300' : 'border-transparent text-green-200 hover:text-white hover:bg-green-700 focus:text-white focus:bg-green-700'}`}>
                            Team & Users
                        </Link>
                        )}
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
