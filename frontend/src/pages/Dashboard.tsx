import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, MessageSquare, Briefcase, Activity, Power, PowerOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    reviews: 0,
    messages: 0,
    career: 0
  });
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [availabilityLoading, setAvailabilityLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, availRes] = await Promise.all([
          axios.get('http://localhost:5001/api/stats'),
          axios.get('http://localhost:5001/api/auth/availability')
        ]);
        setStats(statsRes.data);
        setIsAvailable(availRes.data.isAvailable);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setAvailabilityLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const toggleAvailability = async () => {
    setAvailabilityLoading(true);
    try {
      const res = await axios.patch('http://localhost:5001/api/auth/availability', {
        isAvailable: !isAvailable
      });
      setIsAvailable(res.data.isAvailable);
      toast.success(`Status updated to: ${res.data.isAvailable ? 'Available' : 'Unavailable'}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update availability status.');
    } finally {
      setAvailabilityLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: LayoutDashboard },
    { label: 'Client Reviews', value: stats.reviews, icon: Users },
    { label: 'Unread Messages', value: stats.messages, icon: MessageSquare },
    { label: 'Career Entries', value: stats.career, icon: Briefcase },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-black mb-1">Dashboard</h2>
          <p className="text-sm text-gray-500 font-medium">Quick metrics about your portfolio content</p>
        </div>

        {/* Availability Trigger Log */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between gap-6 shadow-sm min-w-[300px]">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Current Status</p>
            {availabilityLoading ? (
              <p className="text-sm font-bold text-gray-400">Loading...</p>
            ) : isAvailable ? (
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-black">Available for Hire</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-sm font-bold text-red-600">Currently Unavailable</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={toggleAvailability}
            disabled={availabilityLoading}
            className={`p-3 rounded-xl transition-all ${isAvailable ? 'bg-black hover:bg-gray-800 text-white' : 'bg-red-50 text-red-500 hover:bg-red-100 border border-red-200'}`}
          >
            {isAvailable ? <Power className="w-5 h-5" /> : <PowerOff className="w-5 h-5" />}
          </button>
        </div>
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
              className="bg-white border border-gray-100 rounded-2xl p-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-black/5 group-hover:bg-black transition-colors" />
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 group-hover:bg-black group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-4xl font-black tracking-tighter text-black mb-1">
                  {loading ? '-' : stat.value}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">{stat.label}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {/* Visual filler for dashboard look */}
      <div className="bg-black rounded-3xl p-8 min-h-[300px] flex flex-col relative overflow-hidden text-white shadow-xl mt-12">
        <div className="flex items-center gap-3 z-10 mb-2">
          <Activity className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold">System Diagnostics</h3>
        </div>
        <p className="text-sm text-gray-400 z-10 max-w-md leading-relaxed">
          The central API is actively monitoring all modules. The database connection is secure and your portfolio is live.
        </p>
        
        {/* Abstract design elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-end -mr-20">
            <div className="w-96 h-96 rounded-full border-[2px] border-dashed border-white/50 animate-[spin_60s_linear_infinite]" />
            <div className="w-64 h-64 absolute rounded-full border-[2px] border-white/30 animate-[spin_40s_linear_infinite_reverse]" />
        </div>
      </div>
    </div>
  );
}
