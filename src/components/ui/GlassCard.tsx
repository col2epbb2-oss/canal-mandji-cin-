import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';
interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  neonHover?: boolean;
}
export function GlassCard({
  children,
  className,
  hoverEffect = false,
  neonHover = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-panel rounded-2xl overflow-hidden relative',
        hoverEffect &&
        'transition-all duration-300 hover:bg-white/5 hover:border-white/10',
        neonHover && 'hover:shadow-neon-red hover:border-cinema-red/50',
        className
      )}
      {...props}>
      
      {children}
    </motion.div>);

}