import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AILoadingOverlay({ isVisible }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-[#030712]/90 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Background glows */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse pointer-events-none"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/20 blur-[100px] rounded-full animate-pulse delay-75 pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Animated AI Brain/Core Icon */}
                        <motion.div 
                            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-24 h-24 rounded-full border-4 border-dashed border-blue-500 border-t-cyan-400 mb-8 p-2"
                        >
                            <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full animate-pulse"></div>
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 tracking-tight text-center px-4"
                        >
                            AI is Forging Your Page...
                        </motion.h2>
                        
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-blue-200/60 text-lg md:text-xl font-light text-center px-4 animate-pulse max-w-md"
                        >
                            Please wait while we craft high-converting copy, design the layout, and generate aesthetic images. This might take 5-10 seconds.
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
