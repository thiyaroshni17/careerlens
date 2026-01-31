import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-surface-muted)] border-t border-[var(--color-border)] py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[var(--color-text-main)]">
                                CareerLens
                            </span>
                        </div>
                        <p className="text-[var(--color-text-muted)] max-w-xs mb-8">
                            See your future. Shape your skills. The unified platform for career growth and learning readiness.
                        </p>
                        <div className="flex gap-4">
                            {['twitter', 'linkedin', 'github'].map(icon => (
                                <a key={icon} href="#" className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all">
                                    <span className="sr-only">{icon}</span>
                                    <div className="w-5 h-5 bg-current rounded-sm"></div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-[var(--color-text-muted)]">
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Integrations</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-[var(--color-text-muted)]">
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Terms</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-[var(--color-text-muted)]">
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Community</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--color-text-muted)]">
                    <p>© {currentYear} CareerLens Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-[var(--color-text-main)] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[var(--color-text-main)] transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-[var(--color-text-main)] transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
