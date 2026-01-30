import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-full transition-all';
  
  const variants = {
    primary: 'glass-strong hover:glow-saffron text-white',
    secondary: 'glass hover:glass-strong text-gray-300',
    ghost: 'bg-transparent hover:bg-white/5 text-gray-300',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, variants[variant], sizes[size], className, {
        'opacity-50 cursor-not-allowed': disabled,
      })}
    >
      {children}
    </motion.button>
  );
}

