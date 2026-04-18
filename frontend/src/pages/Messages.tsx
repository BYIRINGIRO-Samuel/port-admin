import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Search, CheckCircle2, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Messages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/messages');
      setMessages(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string, currentlyRead: boolean) => {
    if (currentlyRead) return;
    try {
      await axios.patch(`http://localhost:5001/api/messages/${id}/read`);
      toast.success('Message marked as read');
      fetchMessages();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update message');
    }
  };

  const deleteMessage = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the read action
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`http://localhost:5001/api/messages/${id}`);
        toast.success('Message deleted');
        fetchMessages();
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete message');
      }
    }
  };

  // Filter messages using the search term against name, email, or message content
  const filteredMessages = messages.filter(msg => {
    const s = searchTerm.toLowerCase();
    return msg.name.toLowerCase().includes(s) || 
           msg.email.toLowerCase().includes(s) || 
           msg.message.toLowerCase().includes(s);
  });

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold uppercase mb-2">Communications Log</h2>
          <p className="text-sm text-white/50">Incoming messages from your portfolio contact form</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#0f0f0f] border border-white/10 rounded-full py-2.5 pl-10 pr-4 outline-none focus:border-white/30 text-sm w-64"
          />
        </div>
      </div>

      <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden flex-1 flex flex-col min-h-[500px]">
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 p-4 border-b border-white/10 bg-white/[0.02] text-xs font-bold text-white/40 uppercase tracking-widest">
          <div className="w-12 text-center">Status</div>
          <div>Sender / Content</div>
          <div className="w-24 text-right">Date</div>
          <div className="w-10"></div>
        </div>
        
        <div className="overflow-auto flex-1 p-2 space-y-2">
          {loading ? (
            <p className="text-white/40 text-sm text-center py-10">Loading messages...</p>
          ) : filteredMessages.length === 0 ? (
            <p className="text-white/40 text-sm text-center py-10">No messages found.</p>
          ) : (
            filteredMessages.map((msg, i) => (
              <motion.div 
                key={msg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => markAsRead(msg._id, msg.read)}
                className={`grid grid-cols-[auto_1fr_auto_auto] gap-4 p-4 rounded-xl items-center cursor-pointer border group ${msg.read ? 'bg-transparent border-transparent hover:bg-white/5' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
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
                    <h4 className="text-sm font-bold">{msg.name}</h4>
                    <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/5">{msg.email}</span>
                  </div>
                  <p className={`text-sm ${msg.read ? 'text-white/40' : 'text-white/80'}`}>{msg.message}</p>
                </div>
                <div className="w-24 text-right text-xs text-white/40">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
                <div className="w-10 flex justify-end">
                  <button 
                    onClick={(e) => deleteMessage(msg._id, e)}
                    className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
