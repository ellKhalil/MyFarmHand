import { Link } from '@inertiajs/react';

const Icons = {
    Dashboard: () => <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>,
    Inventory: () => <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>,
    Payroll: () => <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>,
    Finance: () => <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
    Tasks: () => <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>,
    Users: () => <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>,
    Settings: () => <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
};

const NavItem = ({ href, active, icon: Icon, children }) => (
    <li>
        <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${active ? 'bg-green-800 text-white font-medium' : 'hover:bg-green-800 text-green-100'}`}>
            <Icon />
            {children}
        </Link>
    </li>
);

export const AdminNavbar = () => (
    <>
        <ul className="space-y-1 px-2">
            <NavItem href={route('dashboard')} active={route().current('dashboard')} icon={Icons.Dashboard}>Dashboard</NavItem>
            <NavItem href={route('inventory.index')} active={route().current('inventory.index')} icon={Icons.Inventory}>Inventory</NavItem>
            <NavItem href={route('payroll.index')} active={route().current('payroll.*')} icon={Icons.Payroll}>Payroll Management</NavItem>
            <NavItem href={route('finance.index')} active={route().current('finance.index')} icon={Icons.Finance}>Financial Ledger</NavItem>
            <NavItem href={route('tasks.index')} active={route().current('tasks.index')} icon={Icons.Tasks}>Tasks</NavItem>
            <NavItem href={route('users.index')} active={route().current('users.index')} icon={Icons.Users}>Staff</NavItem>
        </ul>
        <div className="mt-8 px-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Configuration</h3>
            <ul className="space-y-1">
                <NavItem href={route('settings.index')} active={route().current('settings.index')} icon={Icons.Settings}>Settings</NavItem>
            </ul>
        </div>
    </>
);

export const DirectorNavbar = () => (
    <>
        <ul className="space-y-1 px-2">
            <NavItem href={route('dashboard')} active={route().current('dashboard')} icon={Icons.Dashboard}>Dashboard</NavItem>
            <NavItem href={route('inventory.index')} active={route().current('inventory.index')} icon={Icons.Inventory}>Inventory</NavItem>
            <NavItem href={route('payroll.index')} active={route().current('payroll.*')} icon={Icons.Payroll}>Payroll Management</NavItem>
            <NavItem href={route('finance.index')} active={route().current('finance.index')} icon={Icons.Finance}>Financial Ledger</NavItem>
            <NavItem href={route('tasks.index')} active={route().current('tasks.index')} icon={Icons.Tasks}>Tasks</NavItem>
            <NavItem href={route('users.index')} active={route().current('users.index')} icon={Icons.Users}>Staff</NavItem>
        </ul>
        <div className="mt-8 px-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Configuration</h3>
            <ul className="space-y-1">
                <NavItem href={route('settings.index')} active={route().current('settings.index')} icon={Icons.Settings}>Settings</NavItem>
            </ul>
        </div>
    </>
);

export const StoreKeeperNavbar = () => (
    <ul className="space-y-1 px-2">
        <NavItem href={route('dashboard')} active={route().current('dashboard')} icon={Icons.Dashboard}>Dashboard</NavItem>
        <NavItem href={route('inventory.index')} active={route().current('inventory.index')} icon={Icons.Inventory}>Inventory Management</NavItem>
        <NavItem href={route('tasks.index')} active={route().current('tasks.index')} icon={Icons.Tasks}>My Tasks</NavItem>
    </ul>
);

export const AccountantNavbar = () => (
    <ul className="space-y-1 px-2">
        <NavItem href={route('dashboard')} active={route().current('dashboard')} icon={Icons.Dashboard}>Dashboard</NavItem>
        <NavItem href={route('payroll.index')} active={route().current('payroll.*')} icon={Icons.Payroll}>Payroll Management</NavItem>
        <NavItem href={route('finance.index')} active={route().current('finance.index')} icon={Icons.Finance}>Financial Ledger</NavItem>
        <NavItem href={route('tasks.index')} active={route().current('tasks.index')} icon={Icons.Tasks}>My Tasks</NavItem>
    </ul>
);

export const GeneralStaffNavbar = () => (
    <ul className="space-y-1 px-2">
        <NavItem href={route('dashboard')} active={route().current('dashboard')} icon={Icons.Dashboard}>Dashboard</NavItem>
        <NavItem href={route('tasks.index')} active={route().current('tasks.index')} icon={Icons.Tasks}>My Tasks</NavItem>
    </ul>
);
