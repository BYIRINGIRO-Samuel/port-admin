import { motion } from 'framer-motion';

export const FancyLoader = ({ label = 'Processing' }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="relative w-24 h-24 mb-6">
      {/* Base Outer Ring */}
      <div className="absolute inset-0 rounded-full border-[1.5px] border-black/5" />
      
      {/* Fast Spinning Outer Glow Ring */}
      <motion.div 
        className="absolute inset-0 rounded-full border-t-[1.5px] border-black shadow-[0_0_15px_rgba(0,0,0,0.1)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Slower Counter-Rotating Inner Ring */}
      <motion.div 
        className="absolute inset-4 rounded-full border-b-[1.5px] border-black/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Pulsing Core Dot */}
      <motion.div 
        className="absolute inset-[40%] bg-black/10 rounded-full flex items-center justify-center"
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-1.5 h-1.5 bg-black rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)]" />
      </motion.div>
    </div>
    
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] font-black uppercase tracking-[0.6em] text-black/30 animate-pulse translate-x-[0.3em]">
        {label.replace(' ', '_').toUpperCase()}
      </span>
      <div className="flex gap-1.5 ml-[0.6em]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            className="w-1 h-1 bg-black/20 rounded-full"
          />
        ))}
      </div>
    </div>
  </div>
);

export const MiniLoader = ({ isDark = false }: { isDark?: boolean }) => (
  <div className="relative w-5 h-5">
    <div className={`absolute inset-0 rounded-full border ${isDark ? 'border-black/10' : 'border-white/10'}`} />
    <motion.div 
      className={`absolute inset-0 rounded-full border-t ${isDark ? 'border-black shadow-[0_0_8px_rgba(0,0,0,0.1)]' : 'border-white shadow-[0_0_8px_white/30]'}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
    <motion.div 
      className={`absolute inset-1 rounded-full border-b ${isDark ? 'border-black/20' : 'border-white/20'}`}
      animate={{ rotate: -360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
  </div>
);
