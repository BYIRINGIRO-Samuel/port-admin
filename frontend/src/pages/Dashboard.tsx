import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, MessageSquare, Briefcase } from 'lucide-react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    reviews: 0,
    messages: 0,
    career: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: LayoutDashboard },
    { label: 'Client Reviews', value: stats.reviews, icon: Users },
    { label: 'Unread Messages', value: stats.messages, icon: MessageSquare },
    { label: 'Career Entries', value: stats.career, icon: Briefcase },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold uppercase mb-2">Dashboard Overview</h2>
        <p className="text-sm text-white/50">Quick metrics about your portfolio content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
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
                <p className="text-3xl font-black italic tracking-tighter mb-1">
                  {loading ? '-' : stat.value}
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {/* Visual filler for dashboard look */}
      <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 min-h-[400px] flex flex-col relative overflow-hidden">
        <h3 className="text-lg font-bold mb-4 z-10">System Status</h3>
        <p className="text-sm text-white/50 z-10">All systems are heavily functional. Manage components via the sidebar.</p>
        
        {/* Abstract design elements matching the portfolio logic */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <div className="w-96 h-96 rounded-full border-[1px] border-dashed border-white animate-[spin_60s_linear_infinite]" />
            <div className="w-64 h-64 absolute rounded-full border-[1px] border-white animate-[spin_40s_linear_infinite_reverse]" />
            <div className="w-32 h-32 absolute rounded-full bg-white/10 blur-3xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
