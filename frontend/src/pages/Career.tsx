import { useState, useEffect } from 'react';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Career() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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
      fetchEntries();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add career entry.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this career entry?')) {
      try {
        await axios.delete(`http://localhost:5001/api/career/${id}`);
        toast.success('Career entry deleted');
        fetchEntries();
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete career entry');
      }
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold uppercase mb-2">Manage Career History</h2>
        <p className="text-sm text-white/50">Add your past work experience to your timeline.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ADD ROLE FORM */}
        <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 h-fit">
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

            <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold uppercase py-4 rounded-xl hover:bg-gray-200 transition-colors mt-4 disabled:opacity-50">
              {loading ? 'Saving...' : 'Add Career Entry'}
            </button>
          </form>
        </div>

        {/* EXISTING ROLES LIST */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-4">Existing Experience ({entries.length})</h3>
          
          <div className="space-y-4">
            {entries.length === 0 ? (
              <p className="text-white/40 text-sm py-4">No experience added yet.</p>
            ) : (
              entries.map((entry) => (
                <div key={entry._id} className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 relative group flex gap-4">
                  <div className="mt-1">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-white/50" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold">{entry.role}</h4>
                    <p className="text-xs font-bold text-white/40 uppercase mb-2">{entry.company} • {entry.period}</p>
                    <p className="text-sm text-white/70 bg-black p-3 rounded-lg border border-white/5">{entry.description}</p>
                  </div>
                  
                  <button 
                    onClick={() => handleDelete(entry._id)}
                    className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
