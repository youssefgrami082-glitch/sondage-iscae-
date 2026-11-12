import React from 'react';
import { motion } from 'motion/react';

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Animated Aurora Orbs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 -left-24 sm:-top-32 sm:-left-32 w-[340px] sm:w-[550px] h-[340px] sm:h-[550px] rounded-full bg-gradient-to-br from-indigo-600/20 via-blue-600/15 to-transparent blur-[80px] sm:blur-[120px] will-change-transform"
      />

      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 -right-24 sm:-right-32 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] rounded-full bg-gradient-to-bl from-purple-600/20 via-pink-600/10 to-transparent blur-[90px] sm:blur-[140px] will-change-transform"
      />

      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-32 left-1/4 w-[360px] sm:w-[650px] h-[360px] sm:h-[650px] rounded-full bg-gradient-to-tr from-cyan-600/15 via-teal-500/10 to-transparent blur-[80px] sm:blur-[130px] will-change-transform"
      />

      {/* Cyber Grid Mesh Pattern with subtle mask */}
      <div
        className="absolute inset-0 opacity-[0.10] sm:opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 75%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 75%, transparent 100%)',
        }}
      />

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 hidden sm:block">
        {[...Array(10)].map((_, i) => {
          const size = (i % 3) + 2;
          const left = `${(i * 19) % 100}%`;
          const top = `${(i * 23) % 100}%`;
          const delay = (i * 0.7) % 5;
          const duration = 6 + (i % 4) * 2;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-400/60 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left,
                top,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </div>

      {/* Ambient Vignette Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/80" />
    </div>
  );
};
