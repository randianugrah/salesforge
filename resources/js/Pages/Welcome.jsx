import React, { useEffect, useRef, useState } from "react";
import { Link, Head } from '@inertiajs/react';
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react";
import { motion } from "framer-motion";

export default function Welcome({ auth }) {
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden selection:bg-blue-500/30 font-sans">
      <Head title="SalesForge - AI Sales Page Generator" />

      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-30"
        colors={["#000000", "#3b82f6", "#2563eb", "#1e3a8a", "#06b6d4"]}
        speed={0.15}
        backgroundColor="#000000"
      />

      <header className="relative z-20 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center group cursor-pointer gap-2"
        >
          <motion.svg
            fill="none"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="size-10 group-hover:drop-shadow-lg transition-all duration-300"
            style={{ filter: "url(#logo-glow)" }}
            whileHover={{
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.05, 1],
              transition: {
                rotate: { duration: 3, ease: "linear", repeat: Infinity },
                scale: { duration: 0.6, ease: "easeInOut" },
              },
            }}
          >
            <motion.circle
              cx="50" cy="50" r="34"
              stroke="url(#logo-gradient)"
              strokeWidth="12"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.circle
              cx="50" cy="50" r="12"
              fill="url(#logo-gradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "backOut" }}
            />
          </motion.svg>
          <span className="text-2xl font-bold tracking-tighter text-white">SalesForge</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-2">
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className="text-white bg-white/10 border border-white/20 text-xs font-bold px-5 py-2.5 rounded-full hover:bg-white/20 transition-all duration-200 shadow-lg shadow-blue-500/10"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href={route('login')}
                className="text-white/80 hover:text-white text-xs font-medium px-4 py-2.5 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                Log in
              </Link>

              <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
                <Link
                  href={route('register')}
                  className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-bold text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-9 flex items-center justify-center -translate-x-10 group-hover:-translate-x-24 z-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
                <Link
                  href={route('register')}
                  className="px-6 py-2 rounded-full bg-white text-black font-bold text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-9 flex items-center z-10"
                >
                  Get Started
                </Link>
              </div>
            </>
          )}
        </nav>
      </header>

      <main className="absolute bottom-16 left-8 md:left-16 z-20 max-w-3xl">
        <div className="text-left">

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="block font-light text-white/90 text-4xl md:text-5xl lg:text-6xl mb-2 tracking-wide"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #3b82f6 30%, #06b6d4 70%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitBackgroundClip: "text",
                filter: "url(#text-glow)",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Turn Product Info
            </motion.span>
            <span className="block font-black text-white drop-shadow-2xl">Into Winning</span>
            <span className="block font-light text-white/80 italic text-4xl md:text-5xl lg:text-6xl">Sales Pages</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg font-light text-gray-400 mb-8 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Create high-converting landing pages in seconds. SalesForge uses advanced AI to craft persuasive copy that turns visitors into loyal customers.
          </motion.p>

          <motion.div
            className="flex items-center gap-6 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Link
              href={auth.user ? route('dashboard') : route('register')}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold text-sm transition-all duration-300 cursor-pointer shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
            >
              {auth.user ? "Go to Dashboard" : "Start Building Now"}
            </Link>
          </motion.div>
        </div>
      </main>

      <div className="absolute bottom-8 right-8 z-30 hidden sm:block">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <PulsingBorder
            colors={["#3b82f6", "#2563eb", "#06b6d4", "#22d3ee", "#38bdf8", "#0284c7", "#ffffff"]}
            colorBack="#00000000"
            speed={1.5}
            roundness={1}
            thickness={0.1}
            softness={0.2}
            intensity={5}
            spotsPerColor={5}
            spotSize={0.1}
            pulse={0.1}
            smoke={0.5}
            smokeSize={4}
            scale={0.65}
            rotation={0}
            frame={9161408.251009725}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
          />

          {/* Rotating Text Around the Pulsing Border */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transform: "scale(1.6)" }}
          >
            <defs>
              <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="text-[9px] fill-white/60 font-bold tracking-widest">
              <textPath href="#circle" startOffset="0%">
                SALESFORGE AI • POWERED BY ADVANCED AI MODELS •
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>
    </div>
  );
}
