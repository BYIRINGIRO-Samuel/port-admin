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
          <h2 className="text-3xl font-black uppercase tracking-tight text-black mb-1">Manage Career History</h2>
          <p className="text-sm text-gray-500 font-medium">Add your past work experience to your timeline.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white font-bold uppercase text-xs px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          Create Career Entry
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 w-full max-w-xl relative shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-black text-black">Add Job Experience</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Job Title *</label>
                  <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="e.g. Senior Web Developer" />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Company / Organization *</label>
                  <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="e.g. Google, Remote" />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Time Period *</label>
                  <input required type="text" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="e.g. Jan 2022 - Present" />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Job Description *</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black h-32 resize-none transition-all" placeholder="Describe your responsibilities and achievements..." />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-black text-white font-bold uppercase py-4 rounded-xl hover:bg-gray-800 transition-colors mt-8 shadow-md disabled:opacity-50">
                  {loading ? 'Saving...' : 'Add Career Entry'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="space-y-4 relative">
        <div className="absolute top-0 bottom-0 left-[27px] w-px bg-gray-200 -z-10 hidden md:block" />
        
        {entries.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-white">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">No experience added yet.</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry._id} className="bg-white border border-gray-200 rounded-3xl p-6 relative group flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all duration-300">
              <div className="shrink-0 z-10">
                <div className="w-14 h-14 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:border-black group-hover:text-white transition-colors duration-300 text-gray-500">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h4 className="text-xl font-black text-black mb-1">{entry.role}</h4>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">{entry.company}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{entry.period}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-medium bg-gray-50 p-4 rounded-2xl border border-gray-100">{entry.description}</p>
              </div>
              
              <button 
                onClick={() => handleDelete(entry._id)}
                className="absolute top-6 right-6 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl opacity-0 md:group-hover:opacity-100 transition-all shadow-lg translate-y-2 group-hover:translate-y-0"
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
