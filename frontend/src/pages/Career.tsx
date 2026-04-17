import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Save, Trash2, Plus } from 'lucide-react';

export default function Career() {
  const [entries, setEntries] = useState([
    { id: 1, role: 'Senior Frontend Engineer', company: 'NovaTech', period: '2023 - Present', desc: 'Leading frontend architecture...' },
    { id: 2, role: 'Web Developer', company: 'CyberDynamics', period: '2021 - 2023', desc: 'Developed responsive web applications...' }
  ]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Career History</h2>
          <p className="text-[10px] uppercase tracking-widest text-white/40">Manage experience timeline data</p>
        </div>
        
        <button className="bg-white text-black font-black uppercase text-xs px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Role
        </button>
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <motion.div 
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 relative group"
          >
            <div className="absolute left-0 top-6 bottom-6 w-1 bg-white/10 group-hover:bg-white/40 transition-colors" />
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 pl-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Role Title</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input type="text" defaultValue={entry.role} className="w-full bg-black border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-white/50 text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Company / Period</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input type="text" defaultValue={`${entry.company} | ${entry.period}`} className="w-full bg-black border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-white/50 text-sm" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Description</label>
                  <textarea defaultValue={entry.desc} className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-white/50 text-sm h-20 resize-none" />
                </div>
              </div>

              <div className="flex md:flex-col gap-2 justify-end">
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">
                  <Save className="w-4 h-4 text-white/60" />
                </button>
                <button className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20 transition-colors">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
