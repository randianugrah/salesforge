import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { MeshGradient } from "@paper-design/shaders-react";

export default function Index({ auth, salesPages, status }) {
    const { delete: destroy } = useForm();
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, projectId: null });

    const confirmDelete = (id) => {
        setDeleteModal({ isOpen: true, projectId: id });
    };

    const executeDelete = () => {
        if (deleteModal.projectId) {
            destroy(route('sales-pages.destroy', deleteModal.projectId));
            setDeleteModal({ isOpen: false, projectId: null });
        }
    };

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

    const getCategoryName = (template) => {
        if (!template) return 'GENERAL';
        if (template.includes('tech')) return 'TECH / SAAS';
        if (template.includes('food')) return 'FOOD & BEV';
        if (template.includes('fashion')) return 'FASHION';
        if (template.includes('services') || template.includes('corporate')) return 'SERVICES';
        return 'GENERAL';
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="font-black text-3xl text-white tracking-tight">My Projects</h2>
                    <Link
                        href={route('sales-pages.create')}
                        className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-bold text-sm text-white uppercase tracking-wider hover:from-blue-400 hover:to-cyan-400 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] transition-all duration-300"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                        Create New
                    </Link>
                </div>
            }
        >
            <Head title="Sales Pages" />

            {/* Futuristic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <MeshGradient
                    className="absolute inset-0 w-full h-full opacity-30"
                    colors={["#000000", "#3b82f6", "#2563eb", "#1e3a8a", "#06b6d4"]}
                    speed={0.15}
                    backgroundColor="#000000"
                />
            </div>

            <div className="py-8 relative z-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {status && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 p-4 bg-green-500/20 border border-green-500/50 text-green-300 rounded-2xl shadow-lg backdrop-blur-md"
                        >
                            {status}
                        </motion.div>
                    )}

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {salesPages.map((page) => (
                            <motion.div 
                                key={page.id} 
                                variants={item}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="relative bg-white/5 overflow-hidden shadow-xl rounded-[2rem] border border-white/10 backdrop-blur-xl group transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/10"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-cyan-500/20 transition-all duration-500" />
                                
                                <div className="relative p-8 flex flex-col h-full">
                                    <div className="flex justify-between items-start gap-4 mb-4">
                                        <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">{page.product_name}</h3>
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-cyan-200 border border-cyan-500/20 uppercase tracking-widest whitespace-nowrap backdrop-blur-md">
                                            {getCategoryName(page.template)}
                                        </span>
                                    </div>
                                    
                                    <p className="text-sm text-blue-100/60 line-clamp-2 mb-6 leading-relaxed">
                                        {page.product_description || "No description provided."}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {page.price && (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/40 rounded-lg text-xs text-gray-300 border border-white/5">
                                                <span className="text-green-400">💰</span> {page.price}
                                            </div>
                                        )}
                                        {page.target_audience && (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/40 rounded-lg text-xs text-gray-300 border border-white/5 max-w-xs truncate">
                                                <span className="text-purple-400">🎯</span> <span className="truncate">{page.target_audience}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/40 rounded-lg text-xs text-gray-300 border border-white/5">
                                            <span className="text-blue-400">📅</span> {new Date(page.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                                        <div className="flex space-x-4">
                                            <Link href={route('sales-pages.preview', page.id)} className="text-cyan-400 hover:text-cyan-300 text-sm font-bold flex items-center gap-1 transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                                View
                                            </Link>
                                            <Link href={route('sales-pages.edit', page.id)} className="text-blue-400 hover:text-blue-300 text-sm font-bold flex items-center gap-1 transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                Edit
                                            </Link>
                                        </div>
                                        <button
                                            onClick={() => confirmDelete(page.id)}
                                            className="text-red-400 hover:text-red-300 text-sm font-bold transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {salesPages.length === 0 && (
                            <motion.div 
                                variants={item}
                                className="col-span-full bg-white/5 p-16 text-center rounded-[2rem] border border-dashed border-white/20 backdrop-blur-md"
                            >
                                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">No Projects Yet</h3>
                                <p className="text-blue-100/60 mb-8 text-lg max-w-md mx-auto">You haven't generated any sales pages yet. Let's create something amazing!</p>
                                <Link 
                                    href={route('sales-pages.create')} 
                                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-bold text-white shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.6)] transition-all duration-300"
                                >
                                    Start Building Now
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {deleteModal.isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 20, opacity: 0 }}
                            className="bg-[#08090f] border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2">Delete Project</h3>
                            <p className="text-gray-400 text-sm mb-8">Are you sure you want to delete this sales page? This action cannot be undone.</p>
                            
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteModal({ isOpen: false, projectId: null })}
                                    className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={executeDelete}
                                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold hover:from-red-500 hover:to-rose-400 shadow-[0_0_20px_-5px_rgba(239,68,68,0.5)] transition-all text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    );
}
