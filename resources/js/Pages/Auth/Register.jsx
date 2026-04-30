import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Head, Link, useForm } from '@inertiajs/react';
import { MeshGradient } from "@paper-design/shaders-react";
import ApplicationLogo from '@/Components/ApplicationLogo';

const cn = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

export default function Register() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#000000] selection:bg-blue-500/30 p-4 relative overflow-hidden font-sans">
            <Head title="Register" />
            
            {/* Futuristic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <MeshGradient
                    className="absolute inset-0 w-full h-full opacity-40"
                    colors={["#000000", "#3b82f6", "#2563eb", "#1e3a8a", "#06b6d4"]}
                    speed={0.15}
                    backgroundColor="#000000"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="w-full max-w-5xl rounded-[2.5rem] flex flex-col md:flex-row bg-white/5 text-white shadow-2xl border border-white/10 backdrop-blur-2xl relative z-10 overflow-hidden"
            >
                {/* Left side - Branding */}
                <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5" />
                    
                    <div className="relative z-10 flex flex-col items-start">
                        <Link href="/">
                            <ApplicationLogo className="w-16 h-16 shadow-lg shadow-blue-500/30 mb-8" />
                        </Link>
                        <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-white"
                        >
                            Start Building.
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-blue-100/70 max-w-md leading-relaxed font-light"
                        >
                            Create an account to forge high-converting AI sales pages in minutes.
                        </motion.p>
                    </div>
                </div>
                
                {/* Right side - Form */}
                <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative bg-black/20">
                    <div className="w-full max-w-sm mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h3 className="text-2xl font-bold mb-2">Create an account</h3>
                            <p className="text-gray-400 text-sm mb-8">Enter your details below to get started</p>

                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Your Full Name"
                                        required
                                        className="w-full h-12 px-4 bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-gray-200 placeholder:text-gray-600 text-sm transition-all outline-none"
                                    />
                                    {errors.name && (
                                        <div className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.name}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="your@email.com"
                                        required
                                        className="w-full h-12 px-4 bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-gray-200 placeholder:text-gray-600 text-sm transition-all outline-none"
                                    />
                                    {errors.email && (
                                        <div className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.email}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">Password</label>
                                    <div className="relative">
                                        <input
                                            type={isPasswordVisible ? "text" : "password"}
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            className="w-full h-12 pl-4 pr-12 bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-gray-200 placeholder:text-gray-600 text-sm transition-all outline-none tracking-wide"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1"
                                        >
                                            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <div className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.password}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={isPasswordVisible ? "text" : "password"}
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            className="w-full h-12 pl-4 pr-12 bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-gray-200 placeholder:text-gray-600 text-sm transition-all outline-none tracking-wide"
                                        />
                                    </div>
                                    {errors.password_confirmation && (
                                        <div className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.password_confirmation}</div>
                                    )}
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        className={cn(
                                            "w-full h-12 bg-gradient-to-r relative overflow-hidden from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold rounded-xl transition-all duration-300 disabled:opacity-50 shadow-md",
                                            isHovered ? "shadow-[0_0_20px_-3px_rgba(59,130,246,0.6)]" : ""
                                        )}
                                    >
                                        Create Account
                                    </button>
                                </div>
                                
                                <div className="text-center mt-6">
                                    <p className="text-sm text-gray-400">
                                        Already have an account?{' '}
                                        <Link
                                            href={route('login')}
                                            className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                                        >
                                            Log in
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
