import { Link } from '@inertiajs/react';
import FallingLogos from '@/Components/FallingLogos';

export default function GuestLayout({ children }) {
    return (
        <div className="relative min-h-screen flex flex-col bg-slate-50 font-sans text-gray-900 selection:bg-green-700 selection:text-white overflow-hidden">
            
            {/* Animated Glowing Blobs & Logos */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] -left-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob"></div>
                <div className="absolute top-[20%] -right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-4000"></div>
                
                <FallingLogos />
            </div>

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center pt-6 sm:pt-0 px-4">
                <div className="mb-8 flex flex-col items-center">
                    <Link href="/" className="flex flex-col items-center gap-3 group">
                        <img src="/logo.png" alt="MyFarmHand Logo" className="h-24 w-auto object-contain transition-transform group-hover:scale-105" />
                        <span className="text-3xl font-extrabold tracking-tight text-green-900 mt-2 drop-shadow-sm">
                            MyFarmHand
                        </span>
                    </Link>
                    <p className="mt-2 text-sm font-bold text-green-600 uppercase tracking-widest">Enterprise Access</p>
                </div>

                <div className="w-full overflow-hidden bg-white/95 backdrop-blur-xl px-8 py-10 shadow-2xl sm:max-w-md rounded-3xl border border-white/20">
                    {children}
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 mt-auto py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500 text-center md:text-left">
                        &copy; {new Date().getFullYear()} MyFarmHand Enterprise Management. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <a href="#" className="text-sm text-green-600 hover:text-green-800 transition">Privacy Policy</a>
                        <a href="#" className="text-sm text-green-600 hover:text-green-800 transition">Terms of Service</a>
                        <a href="#" className="text-sm text-green-600 hover:text-green-800 transition">Contact Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
