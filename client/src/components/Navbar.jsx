import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../pages/constants';
import Button from './Button';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-[var(--color-surface)]/70 backdrop-blur-lg border-b border-[var(--color-border)] shadow-sm py-4'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                        <div className="w-5 h-5 border-2 border-[#00001A] rounded-full"></div>
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">
                        CAREER<span className="text-[var(--color-primary)]">LENS</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hidden sm:inline-flex"
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => navigate('/register')}
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
