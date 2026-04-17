import { motion } from 'framer-motion';
import { Mail, Search, CheckCircle2 } from 'lucide-react';

export default function Messages() {
  const dummyMessages = [
    { id: 1, name: "Elara Vance", email: "elara@nexus.co", date: "Oct 24", preview: "Interested in a collaboration for our new web3 platform...", read: false },
    { id: 2, name: "Marcus Thorne", email: "marcus@cybertech.inc", date: "Oct 22", preview: "Your portfolio is impressive. We are looking for a frontend...", read: true },
    { id: 3, name: "Dr. Sarah Lin", email: "slin@medilogic.health", date: "Oct 19", preview: "Can we schedule a call regarding a healthcare dashboard?", read: true },
  ];

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Communications Log</h2>
          <p className="text-[10px] uppercase tracking-widest text-white/40">Incoming transmissions from portfolio</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search Transmissions..." 
            className="bg-[#0f0f0f] border border-white/10 rounded-full py-2.5 pl-10 pr-4 outline-none focus:border-white/30 text-xs w-64 uppercase tracking-widest"
          />
        </div>
      </div>

      <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden flex-1 flex flex-col">
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 border-b border-white/10 bg-white/[0.02] text-[10px] uppercase tracking-widest font-black text-white/40">
          <div className="w-12 text-center">Status</div>
          <div>Sender / Preview</div>
          <div className="text-right">Timestamp</div>
        </div>
        
        <div className="overflow-auto flex-1 p-2 space-y-2">
          {dummyMessages.map((msg, i) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`grid grid-cols-[auto_1fr_auto] gap-4 p-4 rounded-xl items-center cursor-pointer border ${msg.read ? 'bg-transparent border-transparent hover:bg-white/5' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              <div className="w-12 flex justify-center">
                {msg.read ? (
                  <CheckCircle2 className="w-5 h-5 text-white/20" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-sm font-black uppercase tracking-tight">{msg.name}</h4>
                  <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">{msg.email}</span>
                </div>
                <p className={`text-xs ${msg.read ? 'text-white/40' : 'text-white/80'} truncate max-w-2xl`}>{msg.preview}</p>
              </div>
              <div className="text-right text-[10px] font-black uppercase tracking-widest text-white/40">
                {msg.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
