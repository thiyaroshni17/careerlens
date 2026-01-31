import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const FloatingNode = ({ children, className = '', delay = 0, color = 'var(--color-primary)' }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
            opacity: 0.8,
            scale: 1,
            y: [0, -20, 0],
            x: [0, 10, 0]
        }}
        transition={{
            duration: 5,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        className={`absolute px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2 text-sm font-bold shadow-2xl ${className}`}
        style={{ color }}
    >
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        {children}
    </motion.div>
);

const Hero = () => {
    const navigate = useNavigate();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <section className="relative pt-32 pb-20 md:pt-56 md:pb-40 overflow-hidden bg-[var(--color-surface)]">
            {/* Drifting Background Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="blurry-blob top-[-10%] left-[-10%]"
                style={{ '--blob-color': 'var(--color-primary)' }}
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -40, 0],
                    y: [0, -60, 0]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="blurry-blob bottom-[-10%] right-[-10%]"
                style={{ '--blob-color': 'var(--color-secondary-3)' }}
            />

            {/* Floating Career Nodes */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden max-w-7xl mx-auto hidden md:block">
                <FloatingNode className="top-1/4 left-10" color="var(--color-secondary-1)" delay={0}>AI Strategy</FloatingNode>
                <FloatingNode className="top-1/3 right-20" color="var(--color-secondary-2)" delay={1.5}>Growth Ops</FloatingNode>
                <FloatingNode className="bottom-1/4 left-1/4" color="var(--color-secondary-4)" delay={3}>FinTech</FloatingNode>
                <FloatingNode className="top-2/3 right-1/4" color="var(--color-primary)" delay={0.5}>Product Leadership</FloatingNode>
            </div>

            <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={itemVariants}
                        className="inline-block px-6 py-2 mb-10 text-xs font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 rounded-full text-[var(--color-primary)] backdrop-blur-xl shadow-inner shadow-white/5"
                    >
                        Empower Your Career Journey
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-7xl md:text-9xl font-black tracking-tighter mb-8 text-white leading-[0.95] perspective-1000"
                    >
                        See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-orange-400">Future</span>
                        <br /> <span className="text-white/30 italic font-medium tracking-normal">Shape</span> it Now.
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-[var(--color-text-muted)] mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Precision AI-driven career mapping to help you see your future and shape your path to success.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    >
                        <Button
                            size="lg"
                            className="shadow-2xl shadow-[var(--color-primary)]/40 px-12 py-5 text-xl font-black rounded-2xl group overflow-hidden relative"
                            onClick={() => navigate('/register')}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Launch Career Path
                                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                            </span>
                        </Button>
                        <a href="#demo">
                            <Button variant="ghost" size="lg" className="px-10 text-white/60 hover:text-white transition-all text-lg font-bold">
                                Explore Demo
                            </Button>
                        </a>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700"
                    >

                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
