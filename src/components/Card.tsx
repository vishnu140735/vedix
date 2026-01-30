import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({ children, className, hover = true, glow = false }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -10, scale: 1.02 } : {}}
      className={clsx(
        'glass-strong rounded-3xl p-6',
        glow && 'glow-gold',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

