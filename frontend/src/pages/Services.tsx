import { useState, useEffect } from 'react';
import { Plus, Trash2, Layout, X, Edit2, Code2 } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Code2',
    size: 'md',
    tags: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get('/api/services');
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', icon: 'Code2', size: 'md', tags: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (service: any) => {
    setEditingId(service._id);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      size: service.size || 'md',
      tags: service.tags ? service.tags.join(', ') : ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const dataToSend = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
    };

    try {
      if (editingId) {
        await api.put(`/api/services/${editingId}`, dataToSend);
        toast.success('Service successfully updated!');
      } else {
        await api.post('/api/services', dataToSend);
        toast.success('Service successfully added!');
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      console.error(err);
      toast.error(editingId ? 'Failed to update service.' : 'Failed to add service.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.delete(`/api/services/${id}`);
      toast.success('Service deleted');
      fetchServices();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete service');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-black mb-1">Manage Services</h2>
          <p className="text-sm text-gray-500 font-medium">Define the technical services you offer to clients.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-black text-white font-bold uppercase text-xs px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          Create Service
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-none p-8 w-full max-w-xl relative shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black bg-gray-50 hover:bg-gray-100 rounded-none transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  {editingId ? <Edit2 className="w-4 h-4 text-blue-600" /> : <Layout className="w-4 h-4 text-blue-600" />}
                </div>
                <h3 className="text-2xl font-black text-black">{editingId ? 'Edit Service' : 'New Service'}</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Service Title *</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="e.g. Full-Stack Orchestration" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Icon (Lucide Name)</label>
                      <input type="text" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="e.g. Code2, Layout, Database" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Bento Size</label>
                      <select value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all">
                        <option value="sm">Small (1x1)</option>
                        <option value="md">Medium (2x1)</option>
                        <option value="lg">Large (3x1)</option>
                      </select>
                    </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Tags (Comma separated)</label>
                  <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="e.g. Frontend, Backend, Animation" />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Service Description *</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black h-32 resize-none transition-all" placeholder="Describe the value you bring to this service..." />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-black text-white font-bold uppercase py-4 rounded-none hover:bg-gray-800 transition-colors mt-8 shadow-md disabled:opacity-50">
                  {loading ? 'Saving...' : (editingId ? 'Save Changes' : 'Create Service')}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.length === 0 ? (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-white">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">No services defined yet.</p>
          </div>
        ) : (
          services.map((service) => (
            <div key={service._id} className="bg-white border border-gray-200 rounded-3xl p-6 relative group flex flex-col gap-4 hover:shadow-xl transition-all duration-300">
               <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-black font-bold">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(service)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={(e) => handleDelete(service._id, e)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
               </div>
               <div>
                  <h4 className="text-xl font-black text-black uppercase italic mb-1">{service.title}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase bg-gray-100 px-2 py-1 rounded text-gray-500">Size: {service.size}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium line-clamp-3">{service.description}</p>
               </div>
               <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tags && service.tags.map((t: string) => (
                    <span key={t} className="text-[9px] font-bold uppercase text-gray-400 border border-gray-100 px-2 py-0.5 rounded">{t}</span>
                  ))}
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
