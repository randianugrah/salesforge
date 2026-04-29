import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { motion } from 'framer-motion';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans relative overflow-x-hidden">
            
            {/* Floating Modern Navigation */}
            <motion.nav 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="fixed top-6 inset-x-0 mx-auto z-50 max-w-5xl px-4 sm:px-6"
            >
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.5)] px-6 h-16 flex items-center justify-between">
                    
                    {/* Logo & Brand */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <ApplicationLogo className="w-8 h-8 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-xl font-black tracking-tighter text-white">SalesForge</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Link 
                            href={route('dashboard')} 
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${route().current('dashboard') ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Dashboard
                        </Link>
                        <Link 
                            href={route('sales-pages.index')} 
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${route().current('sales-pages.*') ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Projects
                        </Link>
                    </div>

                    {/* User Area */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-blue-500/40">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-bold text-gray-200">{user.name.split(' ')[0]}</span>
                        </div>
                        <div className="h-4 w-px bg-white/20"></div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm font-bold text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
                        >
                            Log Out
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-400 hover:text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Page Heading (Transparent & Integrated) */}
            {header && (
                <header className="pt-36 pb-2 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="opacity-70"
                    >
                        {header}
                    </motion.div>
                </header>
            )}

            {/* Page Content */}
            <main className={!header ? "pt-32" : ""}>{children}</main>
        </div>
    );
}
