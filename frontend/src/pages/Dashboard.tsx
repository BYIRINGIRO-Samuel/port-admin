import { motion } from 'framer-motion';
import { LayoutDashboard, Users, MessageSquare, Briefcase } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Projects', value: '12', icon: LayoutDashboard },
    { label: 'Client Reviews', value: '8', icon: Users },
    { label: 'Unread Messages', value: '3', icon: MessageSquare },
    { label: 'Career Entries', value: '5', icon: Briefcase },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold uppercase mb-2">Dashboard Overview</h2>
        <p className="text-sm text-white/50">Quick metrics about your portfolio content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-white/10 group-hover:bg-white/30 transition-colors" />
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <Icon className="w-5 h-5 text-white/60" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-black italic tracking-tighter mb-1">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden">
        <div className="text-center opacity-40">
          <div className="w-16 h-16 rounded-full border border-dashed border-white/20 mx-auto flex items-center justify-center mb-4 animate-[spin_10s_linear_infinite]">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest">Loading portfolio data...</p>
        </div>
      </div>
    </div>
  );
}
