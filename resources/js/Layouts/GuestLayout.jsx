import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-900 selection:bg-green-700 selection:text-white">
            <div className="flex flex-1 flex-col items-center justify-center pt-6 sm:pt-0">
                <div className="mb-8 flex flex-col items-center">
                    <Link href="/" className="flex flex-col items-center gap-3 group">
                        <img src="/logo.png" alt="MyFarmHand Logo" className="h-20 w-auto transition-transform group-hover:scale-105" />
                        <span className="text-3xl font-extrabold tracking-tight text-green-800 mt-2">
                            MyFarmHand
                        </span>
                    </Link>
                    <p className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-widest">Enterprise Access</p>
                </div>

                <div className="w-full overflow-hidden bg-white px-8 py-10 shadow-sm border border-gray-200 sm:max-w-md rounded-sm">
                    {children}
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-auto py-8 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500 text-center md:text-left">
                        &copy; {new Date().getFullYear()} MyFarmHand Enterprise Management. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <a href="#" className="text-sm text-gray-400 hover:text-green-600 transition">Privacy Policy</a>
                        <a href="#" className="text-sm text-gray-400 hover:text-green-600 transition">Terms of Service</a>
                        <a href="#" className="text-sm text-gray-400 hover:text-green-600 transition">Contact Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
