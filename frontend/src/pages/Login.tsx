import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Terminal, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if(passcode) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-sans selection:bg-white/20 p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 animate-pulse" />
                <ShieldAlert className="w-8 h-8 text-white/80" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-[1.5px] bg-white opacity-40" />
              <span className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase italic">Restricted Area</span>
              <div className="w-3 h-[1.5px] bg-white opacity-40" />
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase mt-2">
              System<span className="text-white/20">Login</span>
            </h1>
        </div>

        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 block mb-2">Auth Sequence</label>
                    <div className="relative group/input">
                        <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-white transition-colors" />
                        <input 
                            type="password" 
                            placeholder="Enter root passcode..."
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-white/50 transition-colors text-sm font-black tracking-widest"
                        />
                    </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white text-black font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all shadow-[0_10px_40px_rgba(255,255,255,0.1)] group overflow-visible relative"
                >
                  INITIALIZE_TERMINAL
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/30" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/30" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white/30" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/30" />
                </button>
            </form>
        </div>
      </motion.div>
    </div>
  );
}
