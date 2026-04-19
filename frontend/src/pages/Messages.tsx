import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, Trash2 } from 'lucide-react';
import api from '../api/axios';
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
      const res = await api.get('/api/messages');
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
      await api.patch(`/api/messages/${id}/read`);
      toast.success('Message marked as read');
      fetchMessages();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update message');
    }
  };

  const deleteMessage = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the read action
    try {
      await api.delete(`/api/messages/${id}`);
      toast.success('Message deleted');
      fetchMessages();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete message');
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
    <div className="space-y-8 h-full flex flex-col pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-black mb-1">Communications Log</h2>
          <p className="text-sm text-gray-500 font-medium">Incoming messages from your portfolio contact form</p>
        </div>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white border border-gray-200 rounded-full py-3 pl-12 pr-6 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm w-full md:w-80 shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden flex-1 flex flex-col min-h-[500px] shadow-sm">
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 p-5 border-b border-gray-200 bg-gray-50 text-xs font-black text-gray-500 uppercase tracking-widest">
          <div className="w-16 text-center">Status</div>
          <div>Sender / Content</div>
          <div className="w-28 text-right">Date</div>
          <div className="w-12"></div>
        </div>
        
        <div className="overflow-auto flex-1 p-3 space-y-2">
          {loading ? (
            <p className="text-gray-400 text-sm font-bold text-center py-12 uppercase tracking-widest">Loading messages...</p>
          ) : filteredMessages.length === 0 ? (
            <p className="text-gray-400 text-sm font-bold text-center py-12 uppercase tracking-widest">No messages found.</p>
          ) : (
            filteredMessages.map((msg, i) => (
              <motion.div 
                key={msg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => markAsRead(msg._id, msg.read)}
                className={`grid grid-cols-[auto_1fr_auto_auto] gap-4 p-5 rounded-2xl items-center cursor-pointer border-2 group transition-all duration-300 ${msg.read ? 'bg-transparent border-transparent hover:bg-gray-50' : 'bg-white border-blue-100 hover:border-blue-200 shadow-md'}`}
              >
                <div className="w-16 flex justify-center">
                  {msg.read ? (
                    <CheckCircle2 className="w-6 h-6 text-gray-300" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                      <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className={`text-base ${msg.read ? 'font-bold text-gray-500' : 'font-black text-black'}`}>{msg.name}</h4>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg border border-gray-200">{msg.email}</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${msg.read ? 'text-gray-500 font-medium' : 'text-gray-800 font-bold'}`}>{msg.message}</p>
                </div>
                <div className={`w-28 text-right text-xs font-bold uppercase tracking-wider ${msg.read ? 'text-gray-400' : 'text-blue-500'}`}>
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
                <div className="w-12 flex justify-end">
                  <button 
                    onClick={(e) => deleteMessage(msg._id, e)}
                    className="p-2.5 text-gray-300 hover:text-white hover:bg-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-sm"
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
