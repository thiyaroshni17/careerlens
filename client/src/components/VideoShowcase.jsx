import React, { useState } from 'react';
import demoVideo from '../assets/videos/demo.mp4';

const VideoShowcase = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section id="demo" className="py-16 md:py-24 bg-[var(--color-surface-muted)]">
            <div className="max-w-5xl mx-auto px-4">
                <div
                    className="relative group cursor-pointer rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] border border-[var(--color-border)] aspect-video bg-black/5 glow-on-hover"
                    onClick={() => setIsPlaying(true)}
                >
                    {!isPlaying ? (
                        <>
                            {/* Placeholder Image */}
                            <img
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
                                alt="CareerLens Platform Preview"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                            />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-[var(--color-primary)] text-navy-dark rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(242,180,45,0.4)]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-10 h-10 ml-1 text-[#00001A]"
                                    >
                                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            {/* Subtle Glassmorphism Bottom Bar */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                                <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                                    <div className="h-full w-1/3 bg-[var(--color-primary)]"></div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <video
                            className="w-full h-full object-contain bg-black"
                            src={demoVideo}
                            autoPlay
                            controls
                            playsInline
                        />
                    )}
                </div>

                <p className="text-center mt-8 text-lg font-medium text-[var(--color-text-muted)] max-w-xl mx-auto">
                    “Click play to see CareerLens in action.”
                </p>
            </div>
        </section>
    );
};

export default VideoShowcase;
