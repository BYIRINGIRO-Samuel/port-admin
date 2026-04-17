import { motion } from 'framer-motion';
import { Star, Plus, ShieldCheck } from 'lucide-react';

export default function Reviews() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Client Reviews</h2>
          <p className="text-[10px] uppercase tracking-widest text-white/40">Manage testimonials telemetry</p>
        </div>
        
        <button className="bg-white text-black font-black uppercase text-xs px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Manual Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                   <Star key={star} className="w-3.5 h-3.5 fill-white text-white" />
                ))}
              </div>
              <div className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                <ShieldCheck className="w-3 h-3" />
                <span className="text-[8px] font-black uppercase tracking-widest">Verified</span>
              </div>
            </div>
            
            <p className="text-sm text-white/70 italic leading-relaxed mb-6">
              "The delivery was flawless. Highly engineered, completely scalable, and the visual aesthetics are next-level. Will definitely collaborate again."
            </p>
            
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="font-black">JD</span>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest">John Doe</h4>
                <p className="text-[9px] uppercase tracking-widest text-white/40">CEO @ TechCorp</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
