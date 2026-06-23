import { Head, Link } from '@inertiajs/react';

export default function About({ auth }) {
    return (
        <>
            <Head title="About Us | MyFarmHand" />
            <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-green-700 selection:text-white">
                
                {/* Floating Glassmorphism Navigation (Dark Mode) */}
                <div className="fixed top-0 inset-x-0 z-50 pt-6 px-4 sm:px-6 lg:px-8 pointer-events-none">
                    <header className="mx-auto max-w-5xl bg-black/20 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] rounded-full pointer-events-auto transition-all duration-300">
                        <div className="flex justify-between h-16 items-center px-6">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-white text-2xl font-extrabold tracking-tight flex items-center gap-2">
                                    <img src="/logo.png" alt="MyFarmHand" className="w-8 h-8 object-contain" />
                                    MyFarmHand
                                </Link>
                            </div>
                            <nav className="hidden md:flex space-x-2">
                                <Link href="/about" className="text-white bg-white/10 font-semibold px-4 py-2 rounded-full text-sm transition-all duration-200">About Us</Link>
                                <a href="/#capabilities" className="text-gray-300 hover:text-white hover:bg-white/10 font-semibold px-4 py-2 rounded-full text-sm transition-all duration-200">Capabilities</a>
                                <Link href="/contact" className="text-gray-300 hover:text-white hover:bg-white/10 font-semibold px-4 py-2 rounded-full text-sm transition-all duration-200">Contact Us</Link>
                            </nav>
                            <div className="flex items-center space-x-3">
                                {auth?.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-green-600 text-white font-bold hover:bg-green-500 px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-200 font-semibold hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-200"
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-green-600 text-white font-bold hover:bg-green-500 px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </header>
                </div>

                <main>
                    {/* Hero Section */}
                    <div className="relative bg-[#022c22] overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
                        <div className="absolute inset-0">
                            {/* Animated Glowing Blobs */}
                            <div className="absolute top-0 -left-4 w-96 h-96 bg-green-500 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-blob"></div>
                            <div className="absolute top-0 -right-4 w-96 h-96 bg-emerald-400 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
                            <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
                        </div>
                        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl mb-6">
                                Cultivating the Future of Agriculture
                            </h1>
                            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                                At MyFarmHand, we merge cutting-edge software with traditional farming wisdom. We believe that intelligent operations lead to sustainable, profitable, and stress-free agriculture.
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100 -mt-20 relative z-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Founded by a collective of tech enthusiasts and seasoned agriculturists, MyFarmHand was born out of a simple frustration: modern farming lacked modern management tools. Most software was either too complex or didn't understand the nuanced realities of tracking livestock, crop yields, and farm payroll. We built MyFarmHand to be the central nervous system of any modern farm.
                            </p>

                            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Core Values</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="border-l-4 border-green-500 pl-4">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Simplicity</h3>
                                    <p className="text-gray-600">Enterprise software shouldn't require a Ph.D. to operate. We prioritize intuitive design and clear data presentation.</p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-4">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Integrity</h3>
                                    <p className="text-gray-600">Your data is your most valuable asset. We ensure strict role-based access controls and immutable ledger trails.</p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-4">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainability</h3>
                                    <p className="text-gray-600">By optimizing resources and tracking mortality efficiently, we help farms reduce waste and environmental impact.</p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-4">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
                                    <p className="text-gray-600">We continually evolve our platform, utilizing the latest in cloud infrastructure and analytics to keep our clients ahead of the curve.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Comprehensive Footer */}
                <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
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
                                    <li><Link href="/#capabilities" className="text-sm text-gray-400 hover:text-green-400 transition">Inventory Tracking</Link></li>
                                    <li><Link href="/#capabilities" className="text-sm text-gray-400 hover:text-green-400 transition">Automated Payroll</Link></li>
                                    <li><Link href="/#capabilities" className="text-sm text-gray-400 hover:text-green-400 transition">Financial Ledgers</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Company</h3>
                                <ul className="space-y-3">
                                    <li><Link href="/about" className="text-sm text-gray-400 hover:text-green-400 transition">About Us</Link></li>
                                    <li><Link href="/contact" className="text-sm text-gray-400 hover:text-green-400 transition">Contact</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Stay Updated</h3>
                                <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
                                <form className="flex" onSubmit={(e) => e.preventDefault()}>
                                    <input type="email" placeholder="Email address" className="bg-gray-800 border-gray-700 text-white w-full rounded-l-md focus:ring-green-500 focus:border-green-500 sm:text-sm px-4 py-2" />
                                    <button type="submit" className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-r-md text-sm font-medium transition">
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-gray-500">
                                &copy; {new Date().getFullYear()} MyFarmHand Enterprise Management. Designed by Nasir'sss Computech. All rights reserved.
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
