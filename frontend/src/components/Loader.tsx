import { motion } from 'framer-motion';

export const FancyLoader = ({ label = 'Processing' }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="relative w-20 h-20 mb-6">
      {/* Outer Rotating Dotted Ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-full"
      />
      
      {/* Middle Progress Ring - White/Black contrast */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 border-2 border-transparent border-t-black border-l-black rounded-full shadow-[0_0_15px_rgba(0,0,0,0.05)]"
      />
      
      {/* Inner Pulsing Core */}
      <motion.div 
        animate={{ 
          scale: [0.8, 1.1, 0.8],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-6 bg-black rounded-full"
      />
      
      {/* Scanning Beam Accent */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex justify-center"
      >
        <div className="w-1 h-1/2 bg-gradient-to-b from-blue-500 to-transparent rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
      </motion.div>
    </div>
    
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black pr-[-0.5em] animate-pulse">
        {label}
      </span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            className="w-1 h-1 bg-black rounded-full"
          />
        ))}
      </div>
    </div>
  </div>
);

export const MiniLoader = () => (
  <div className="relative w-5 h-5">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 border-2 border-white/20 border-t-white rounded-full"
    />
    <motion.div 
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="absolute -inset-1 border border-white/10 rounded-full"
    />
  </div>
);
