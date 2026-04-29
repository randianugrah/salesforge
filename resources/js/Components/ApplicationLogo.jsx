import { motion } from 'framer-motion';

export default function ApplicationLogo({ className, ...props }) {
    return (
        <motion.svg
            {...props}
            fill="none"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className={className}
            style={{ filter: "url(#shared-logo-glow)", ...props.style }}
            whileHover={{
                rotate: [0, 90, 180, 270, 360],
                scale: [1, 1.05, 1],
                transition: {
                    rotate: { duration: 3, ease: "linear", repeat: Infinity },
                    scale: { duration: 0.6, ease: "easeInOut" },
                },
            }}
        >
            <defs>
                <linearGradient id="shared-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <filter id="shared-logo-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <motion.circle
                cx="50" cy="50" r="34"
                stroke="url(#shared-logo-gradient)"
                strokeWidth="12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.circle
                cx="50" cy="50" r="12"
                fill="url(#shared-logo-gradient)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "backOut" }}
            />
        </motion.svg>
    );
}
