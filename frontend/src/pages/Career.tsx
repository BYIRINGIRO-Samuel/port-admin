import { useState, useEffect } from 'react';
import { Plus, Trash2, Briefcase, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Career() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    period: '',
    description: ''
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/career');
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5001/api/career', formData);
      toast.success('Career entry successfully added!');
      setFormData({ role: '', company: '', period: '', description: '' });
      setIsModalOpen(false);
      fetchEntries();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add career entry.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/career/${id}`);
      toast.success('Career entry deleted');
      fetchEntries();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete career entry');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold uppercase mb-2">Manage Career History</h2>
          <p className="text-sm text-white/50">Add your past work experience to your timeline.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black font-bold uppercase text-xs px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Career Entry
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 w-full max-w-xl relative shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-6">
                <Plus className="w-5 h-5 text-white/50" />
                <h3 className="text-lg font-bold">Add Job Experience</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-white/50 mb-1 block">Job Title *</label>
                  <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-white/50 text-sm" placeholder="e.g. Senior Web Developer" />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-white/50 mb-1 block">Company / Organization *</label>
                  <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-white/50 text-sm" placeholder="e.g. Google, Remote" />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/50 mb-1 block">Time Period *</label>
                  <input required type="text" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-white/50 text-sm" placeholder="e.g. Jan 2022 - Present" />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/50 mb-1 block">Job Description *</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-white/50 text-sm h-32 resize-none" placeholder="Describe your responsibilities and achievements..." />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold uppercase py-4 rounded-xl hover:bg-gray-200 transition-colors mt-6 disabled:opacity-50">
                  {loading ? 'Saving...' : 'Add Career Entry'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-white/10 rounded-xl">
            <p className="text-white/40 text-sm">No experience added yet.</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry._id} className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 relative group flex gap-4 hover:border-white/20 transition-colors">
              <div className="mt-1">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white/50" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold">{entry.role}</h4>
                <p className="text-xs font-bold text-white/40 uppercase mb-2">{entry.company} • {entry.period}</p>
                <p className="text-sm text-white/70 bg-black p-4 rounded-lg border border-white/5">{entry.description}</p>
              </div>
              
              <button 
                onClick={() => handleDelete(entry._id)}
                className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-black/50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
