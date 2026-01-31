import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg';

    const variants = {
        primary: 'bg-[var(--color-primary)] text-[#00001A] hover:bg-[var(--color-primary-hover)] focus:ring-[var(--color-primary)] shadow-[0_0_20px_rgba(242,180,45,0.3)] hover:shadow-[0_0_35px_rgba(242,180,45,0.5)]',
        secondary: 'bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border border-white/10 hover:border-white/20 focus:ring-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]',
        outline: 'border border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 focus:ring-[var(--color-primary)]/20 hover:shadow-[0_0_20px_rgba(242,180,45,0.2)]',
        ghost: 'bg-transparent text-[var(--color-text-muted)] hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
