import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, X, ExternalLink, Code, Edit2 } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FancyLoader, MiniLoader } from '../components/Loader';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [projectData, setProjectData] = useState({
    name: '',
    category: '',
    shortDesc: '',
    tech: '',
    github: '',
    demo: '',
    behindTheBuild: '',
    image: null as File | null
  });
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const initFetch = async () => {
      setLoading(true);
      await fetchProjects();
      setLoading(false);
    };
    initFetch();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProjectData({ ...projectData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setProjectData({ name: '', category: '', shortDesc: '', tech: '', github: '', demo: '', behindTheBuild: '', image: null });
    setPreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (proj: any) => {
    setEditingId(proj._id);
    setProjectData({
      name: proj.name,
      category: proj.category,
      shortDesc: proj.shortDesc,
      tech: proj.tech,
      github: proj.github || '',
      demo: proj.demo || '',
      behindTheBuild: proj.behindTheBuild || '',
      image: null
    });
    const url = proj.imageUrl;
    setPreview(url?.startsWith('http') || url?.startsWith('data:') ? url : `${import.meta.env.VITE_API_BASE_URL}${url}`);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId && !projectData.image) {
      toast.error('Please upload an image for the new project.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', projectData.name);
    formData.append('category', projectData.category);
    formData.append('shortDesc', projectData.shortDesc);
    formData.append('tech', projectData.tech);
    formData.append('github', projectData.github);
    formData.append('demo', projectData.demo);
    formData.append('behindTheBuild', projectData.behindTheBuild);
    if (projectData.image) {
      formData.append('image', projectData.image);
    }

    try {
      if (editingId) {
        await api.put(`/api/projects/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Project successfully updated!');
      } else {
        await api.post('/api/projects', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Project successfully created!');
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error(editingId ? 'Failed to update project.' : 'Failed to upload project.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.delete(`/api/projects/${id}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete project.');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-black mb-1">Manage Projects</h2>
          <p className="text-sm text-gray-500 font-medium">Add new projects or edit existing ones.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-black text-white font-bold uppercase text-xs px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          Create Project
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-none p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black bg-gray-50 hover:bg-gray-100 rounded-none transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-none bg-blue-50 flex items-center justify-center">
                  {editingId ? <Edit2 className="w-4 h-4 text-blue-600" /> : <Plus className="w-4 h-4 text-blue-600" />}
                </div>
                <h3 className="text-2xl font-black text-black">{editingId ? 'Edit Project' : 'New Project Form'}</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Project Name *</label>
                    <input required type="text" value={projectData.name} onChange={e => setProjectData({...projectData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="e.g. FoodFlow Application" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Category *</label>
                    <input required type="text" value={projectData.category} onChange={e => setProjectData({...projectData, category: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="e.g. Web Development" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Full Description *</label>
                  <textarea required value={projectData.shortDesc} onChange={e => setProjectData({...projectData, shortDesc: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black h-24 resize-none transition-all" placeholder="Explain what the project does..." />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Behind the Build (The Mini Story) *</label>
                  <textarea required value={projectData.behindTheBuild} onChange={e => setProjectData({...projectData, behindTheBuild: e.target.value})} className="w-full bg-blue-50/30 border border-blue-100 rounded-none py-3 px-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-black h-32 resize-none transition-all italic" placeholder="Built after realizing teams waste hours rewriting meeting notes manually..." />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Technologies Used *</label>
                  <input required type="text" value={projectData.tech} onChange={e => setProjectData({...projectData, tech: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="React, Node.js, Tailwind (comma separated)" />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">GitHub Link (Optional)</label>
                    <input type="url" value={projectData.github} onChange={e => setProjectData({...projectData, github: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="https://github.com/..." />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Live Demo Link (Optional)</label>
                    <input type="url" value={projectData.demo} onChange={e => setProjectData({...projectData, demo: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="https://..." />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Upload Thumbnail Image {editingId && '(Leave blank to keep existing)'}</label>
                  <div className={`aspect-video rounded-none border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer relative overflow-hidden ${preview ? 'border-gray-300 bg-black' : 'border-gray-200 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'}`}>
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleImageChange} required={!editingId} />
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center flex flex-col items-center">
                        <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm font-bold text-gray-600">Click or Drag Image Here</span>
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-black text-white font-bold uppercase py-4 rounded-none hover:bg-gray-800 transition-colors mt-8 disabled:opacity-50 shadow-md flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <MiniLoader />
                      Finalizing Sync...
                    </>
                  ) : (editingId ? 'Save Changes' : 'Save New Project')}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading && projects.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center">
             <FancyLoader label="Syncing Projects" />
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-white">
            <p className="text-gray-400 text-sm font-bold uppercase">No projects added yet.</p>
          </div>
        ) : (
          projects.map((proj) => (
            <div key={proj._id} className="bg-white border border-gray-200 rounded-3xl overflow-hidden flex flex-col relative group shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-full h-48 bg-gray-100 relative group-hover:scale-105 transition-transform duration-500">
                <img src={proj.imageUrl?.startsWith('http') || proj.imageUrl?.startsWith('data:') ? proj.imageUrl : `${import.meta.env.VITE_API_BASE_URL}${proj.imageUrl}`} alt={proj.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col bg-white relative z-10">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{proj.category}</span>
                <h4 className="text-xl font-black mb-2 text-indigo-600">{proj.name}</h4>
                <p className="text-sm text-gray-500 line-clamp-3 mb-4">{proj.shortDesc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tech.split(',').map((t: string, idx: number) => (
                    <span key={idx} className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-sm uppercase tracking-wider border border-gray-200">
                      {t.trim()}
                    </span>
                  ))}
                </div>

                {/* Narrative Status Indicator */}
                <div className={`mb-4 p-2.5 rounded-xl border flex items-center justify-between ${proj.behindTheBuild ? 'bg-blue-50/50 border-blue-100' : 'bg-orange-50/50 border-orange-100'}`}>
                   <span className={`text-[9px] font-black uppercase tracking-widest ${proj.behindTheBuild ? 'text-blue-600' : 'text-orange-600'}`}>
                      Story: {proj.behindTheBuild ? 'Synced' : 'Pending'}
                   </span>
                   {proj.behindTheBuild && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                </div>
                
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100 justify-between">
                  <div className="flex gap-2">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors">
                        <Code className="w-4 h-4" />
                      </a>
                    )}
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    <button 
                      onClick={() => openEditModal(proj)}
                      className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      title="Edit Project"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => handleDelete(proj._id, e)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
