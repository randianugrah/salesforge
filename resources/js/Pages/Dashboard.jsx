import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react";

export default function Dashboard({ auth }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    const stats = [
        { 
            title: "AI Credits", 
            value: "Unlimited", 
            icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
            blobClass: "bg-blue-500/10 group-hover:bg-blue-500/20",
            iconContainerClass: "bg-blue-500/10 text-blue-400 border-blue-500/20"
        },
        { 
            title: "Status", 
            value: "PRO Plan", 
            icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
            blobClass: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
            iconContainerClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
        },
        { 
            title: "Fast Mode", 
            value: "Active", 
            icon: "M13 10V3L4 14h7v7l9-11h-7z",
            blobClass: "bg-blue-500/10 group-hover:bg-blue-500/20",
            iconContainerClass: "bg-blue-500/10 text-blue-400 border-blue-500/20"
        }
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="font-bold text-2xl text-white leading-tight">Dashboard Overview</h2>}
        >
            <Head title="Dashboard" />

            {/* Futuristic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <MeshGradient
                    className="absolute inset-0 w-full h-full opacity-30"
                    colors={["#000000", "#3b82f6", "#2563eb", "#1e3a8a", "#06b6d4"]}
                    speed={0.15}
                    backgroundColor="#000000"
                />
            </div>

            <div className="py-12 relative z-10">
                <motion.div 
                    className="max-w-7xl mx-auto sm:px-6 lg:px-8"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* Welcome Card with Glassmorphism */}
                    <motion.div variants={item} className="relative rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 border border-white/10 bg-white/5 backdrop-blur-xl group">
                        
                        {/* Animated Glow behind card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <div className="relative px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="text-white relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 className="text-5xl font-black mb-4 tracking-tight">
                                        Welcome back, <br/>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                            {auth.user.name}
                                        </span> 👋
                                    </h3>
                                    <p className="text-blue-100/70 text-lg max-w-xl mb-10 font-light leading-relaxed">
                                        Ready to create some magic? Use our AI-powered engine to forge sales pages that convert like crazy.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Link
                                            href={route('sales-pages.create')}
                                            className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl font-bold text-white hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] transition-all duration-300 flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                            Forge New Page
                                        </Link>
                                        <Link
                                            href={route('sales-pages.index')}
                                            className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
                                        >
                                            My Projects
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                            
                            {/* Decorative Animated Element */}
                            <motion.div 
                                className="hidden lg:flex relative w-64 h-64 items-center justify-center"
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="absolute inset-0">
                                    <PulsingBorder
                                        colors={["#3b82f6", "#06b6d4", "#22d3ee", "#ffffff"]}
                                        colorBack="#00000000"
                                        speed={1.5}
                                        roundness={1}
                                        thickness={0.05}
                                        intensity={4}
                                        pulse={0.1}
                                        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                                    />
                                </div>
                                <div className="w-48 h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_50px_-10px_rgba(6,182,212,0.5)]">
                                    <svg className="w-24 h-24 text-cyan-400 opacity-90 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Stats or Quick Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div 
                                key={i}
                                variants={item}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="relative bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md overflow-hidden group"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 ${stat.blobClass}`} />
                                
                                <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border shadow-inner ${stat.iconContainerClass}`}>
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {stat.icon.split(' M').map((d, idx) => (
                                            <path key={idx} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={idx > 0 ? `M${d}` : d} />
                                        ))}
                                    </svg>
                                </div>
                                <h4 className="text-gray-400 font-medium mb-2 tracking-wide uppercase text-xs">{stat.title}</h4>
                                <p className="text-4xl font-black text-white tracking-tight">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </AuthenticatedLayout>
    );
}
