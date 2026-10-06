import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Loader = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <Loader2 className={`${sizeClasses[size]} text-[#8B6508] dark:text-[#F3E5AB]`} aria-hidden="true" />
    </motion.div>
  );
};

export const PageLoader = () => (
  <div className="fixed inset-0 z-50 bg-white dark:bg-[#121214] flex items-center justify-center">
    <div className="text-center">
      <Loader size="lg" />
      <p className="mt-4 text-[#57534E] dark:text-[#A8A29E] font-body">Loading...</p>
    </div>
  </div>
);

export const Skeleton = ({ className = '' }: { className?: string }) => (
  <motion.div
    className={`bg-[#EAE2D7] dark:bg-stone-800 rounded animate-pulse ${className}`}
    initial={{ opacity: 0.4 }}
    animate={{ opacity: [0.4, 0.8, 0.4] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  />
);

export const ProductCardSkeleton = () => (
  <div className="card group">
    <Skeleton className="aspect-square w-full" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  </div>
);