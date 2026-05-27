import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
interface NeonButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}
export function NeonButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  fullWidth,
  ...props
}: NeonButtonProps) {
  const baseStyles =
  'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg overflow-hidden group';
  const variants = {
    primary:
    'bg-cinema-red text-white hover:bg-red-600 hover:shadow-neon-red-hover',
    secondary: 'bg-white text-cinema-black hover:bg-gray-200',
    outline:
    'border-2 border-cinema-red text-cinema-red hover:bg-cinema-red hover:text-white hover:shadow-neon-red',
    glass: 'glass-panel text-white hover:bg-white/10 hover:border-white/20'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-bold uppercase tracking-wider'
  };
  return (
    <motion.button
      whileHover={{
        scale: 1.02
      }}
      whileTap={{
        scale: 0.98
      }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}>
      
      {/* Subtle shine effect on hover for primary button */}
      {variant === 'primary' &&
      <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
      }
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>);

}