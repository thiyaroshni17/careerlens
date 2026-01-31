import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../pages/constants';

const FeatureRow = ({ feature, reverse, accentColor }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 py-12 md:py-16 ${reverse ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Image Block */}
            <div className="flex-1 w-full">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative group p-2 rounded-[var(--radius-xl)] bg-[#00002E] border border-white/5 shadow-2xl overflow-hidden card-pop"
                >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to bottom right, ${accentColor}, transparent)` }}></div>
                    <div className="relative aspect-[3/4] rounded-[var(--radius-lg)] overflow-hidden min-h-[400px]">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.8 }}
                            src={feature.imageUrl}
                            alt={feature.imageAlt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Text Block */}
            <div className="flex-1 text-left">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-12 h-1 mb-6 rounded-full"
                    style={{ backgroundColor: accentColor }}
                />
                <motion.h3
                    initial={{ opacity: 0, x: reverse ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-5xl font-extrabold mb-6 text-white leading-tight"
                >
                    {feature.title}
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed mb-8"
                >
                    {feature.description}
                </motion.p>
                <motion.div
                    className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase py-2 px-4 rounded-full bg-white/5 border border-white/10"
                    style={{ color: accentColor }}
                >
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                    {feature.supportingText}
                </motion.div>
            </div>
        </motion.div>
    );
};

const FEATURES_ACCENTS = [
    '#D7425E', '#DD785E', '#48A8E2', '#59ABA9'
];

const Features = () => {
    return (
        <section id="team" className="py-20 md:py-32 relative bg-[var(--color-surface)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-32"
                >
                    <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-white">
                        Meet the <span className="text-[var(--color-primary)]">Developers</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-[var(--color-text-muted)] max-w-3xl mx-auto font-medium leading-relaxed">
                        The visionary team behind CareerLens, dedicated to redefining how professionals navigate their futures.
                    </p>
                </motion.div>

                <div className="space-y-24 md:space-y-32">
                    {FEATURES.map((feature, index) => (
                        <FeatureRow
                            key={feature.id}
                            feature={feature}
                            reverse={index % 2 !== 0}
                            accentColor={FEATURES_ACCENTS[index % FEATURES_ACCENTS.length]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
