import React from 'react';
import { motion } from 'framer-motion';
import '../home.css';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import VideoShowcase from '../components/VideoShowcase';
import Features from '../components/Features';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen selection:bg-indigo-100 selection:text-indigo-900 bg-[var(--color-surface)]">
      <Navbar />
      <main>
        <Hero />

        <VideoShowcase />

        <Features />

        <section id="about" className="py-24 md:py-40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest uppercase bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full border border-[var(--color-primary)]/20"
                >
                  Our Mission
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 text-white leading-tight">
                  What we <span className="text-[var(--color-primary)]">Do</span>
                </h2>
                <div className="space-y-6 text-lg md:text-xl text-[var(--color-text-muted)] font-medium leading-relaxed">
                  <p>
                    At CareerLens, we bridge the gap between academic learning and professional success. We provide a state-of-the-art platform that empowers students and professionals to navigate their career paths with precision.
                  </p>
                  <p>
                    Through AI-driven insights, personalized skill-gap analysis, and direct connections to industry veterans, we help you not just see your future, but build it.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square bg-[var(--color-card)] rounded-2xl border border-white/5 p-8 flex flex-col justify-center transition-all hover:border-[var(--color-primary)]/40 hover:shadow-[0_0_30px_rgba(242,180,45,0.2)]">
                    <div className="text-3xl font-black text-[var(--color-primary)] mb-2">50K+</div>
                    <div className="text-sm text-white/60 font-medium uppercase tracking-wider">Active Users</div>
                  </div>
                  <div className="aspect-[3/4] bg-[var(--color-card)] rounded-2xl border border-white/5 p-8 flex flex-col justify-center transition-all hover:border-[var(--color-secondary-3)]/40 hover:shadow-[0_0_30px_rgba(72,168,226,0.2)]">
                    <div className="text-3xl font-black text-[var(--color-secondary-3)] mb-2">98%</div>
                    <div className="text-sm text-white/60 font-medium uppercase tracking-wider">Success Rate</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="aspect-[3/4] bg-[var(--color-card)] rounded-2xl border border-white/5 p-8 flex flex-col justify-center transition-all hover:border-[var(--color-secondary-1)]/40 hover:shadow-[0_0_30px_rgba(215,66,94,0.2)]">
                    <div className="text-3xl font-black text-[var(--color-secondary-1)] mb-2">200+</div>
                    <div className="text-sm text-white/60 font-medium uppercase tracking-wider">Top Mentors</div>
                  </div>
                  <div className="aspect-square bg-[var(--color-card)] rounded-2xl border border-white/5 p-8 flex flex-col justify-center transition-all hover:border-[var(--color-secondary-4)]/40 hover:shadow-[0_0_30px_rgba(89,171,169,0.2)]">
                    <div className="text-3xl font-black text-[var(--color-secondary-4)] mb-2">15M+</div>
                    <div className="text-sm text-white/60 font-medium uppercase tracking-wider">Career Paths</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Blobs */}
          <div className="blurry-blob top-1/2 left-0 -translate-y-1/2 -translate-x-1/2" style={{ '--blob-color': 'var(--color-primary)' }}></div>
          <div className="blurry-blob bottom-0 right-0 translate-y-1/2 translate-x-1/2" style={{ '--blob-color': 'var(--color-secondary-1)' }}></div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
