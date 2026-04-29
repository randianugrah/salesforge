import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#030712] selection:bg-indigo-500/30">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div>
                <Link href="/" className="flex items-center gap-4">
                    <ApplicationLogo className="w-14 h-14 shadow-2xl shadow-indigo-500/20" />
                    <span className="text-4xl font-bold tracking-tighter text-white">SalesForge</span>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-8 px-8 py-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden sm:rounded-[2rem]">
                {children}
            </div>
            
            <p className="mt-8 text-gray-500 text-sm">
                &copy; 2026 SalesForge AI. All rights reserved.
            </p>
        </div>
    );
}
