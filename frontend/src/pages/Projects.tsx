import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectData, setProjectData] = useState({
    name: '',
    category: '',
    shortDesc: '',
    tech: '',
    github: '',
    demo: '',
    image: null as File | null
  });
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/projects');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectData.image) {
      toast.error('Please upload an image for the project.');
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
    formData.append('image', projectData.image);

    try {
      await axios.post('http://localhost:5001/api/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Project successfully created!');
      setProjectData({ name: '', category: '', shortDesc: '', tech: '', github: '', demo: '', image: null });
      setPreview(null);
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload project.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/projects/${id}`);
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
          <h2 className="text-2xl font-bold uppercase mb-2">Manage Projects</h2>
          <p className="text-sm text-white/50">Add new projects to your portfolio or delete existing ones.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black font-bold uppercase text-xs px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Project
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-6">
                <Plus className="w-5 h-5 text-white/50" />
                <h3 className="text-lg font-bold">Add New Project</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-white/50 mb-1 block">Project Name *</label>
                    <input required type="text" value={projectData.name} onChange={e => setProjectData({...projectData, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-white/50 text-sm" placeholder="e.g. FoodFlow Application" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white/50 mb-1 block">Category *</label>
                    <input required type="text" value={projectData.category} onChange={e => setProjectData({...projectData, category: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-white/50 text-sm" placeholder="e.g. Web Development" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-white/50 mb-1 block">Full Description *</label>
                  <textarea required value={projectData.shortDesc} onChange={e => setProjectData({...projectData, shortDesc: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-white/50 text-sm h-24 resize-none" placeholder="Explain what the project does..." />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/50 mb-1 block">Technologies Used *</label>
                  <input required type="text" value={projectData.tech} onChange={e => setProjectData({...projectData, tech: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-white/50 text-sm" placeholder="React, Node.js, Tailwind (comma separated)" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-white/50 mb-1 block">GitHub Link (Optional)</label>
                    <input type="url" value={projectData.github} onChange={e => setProjectData({...projectData, github: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-white/50 text-sm" placeholder="https://github.com/..." />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white/50 mb-1 block">Live Demo Link (Optional)</label>
                    <input type="url" value={projectData.demo} onChange={e => setProjectData({...projectData, demo: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-white/50 text-sm" placeholder="https://..." />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-white/50 mb-2 block">Upload Thumbnail Image *</label>
                  <div className={`aspect-video rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer relative overflow-hidden ${preview ? 'border-white/20 bg-black' : 'border-white/10 hover:border-white/30 bg-white/5'}`}>
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleImageChange} required />
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center flex flex-col items-center">
                        <ImageIcon className="w-8 h-8 text-white/40 mb-2" />
                        <span className="text-sm font-bold text-white/60">Click or Drag Image Here</span>
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold uppercase py-4 rounded-xl hover:bg-gray-200 transition-colors mt-6 disabled:opacity-50">
                  {loading ? 'Uploading Project...' : 'Save New Project'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-xl">
            <p className="text-white/40 text-sm">No projects added yet.</p>
          </div>
        ) : (
          projects.map((proj) => (
            <div key={proj._id} className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 flex flex-col gap-4 relative group hover:border-white/20 transition-colors">
              <img src={`http://localhost:5001${proj.imageUrl}`} alt={proj.name} className="w-full h-40 object-cover rounded-lg border border-white/5" />
              <div className="flex-1">
                <span className="text-xs text-white/40 font-bold uppercase">{proj.category}</span>
                <h4 className="text-lg font-bold mb-1">{proj.name}</h4>
                <p className="text-xs text-white/50 line-clamp-3 mb-3">{proj.shortDesc}</p>
                <div className="text-xs text-white/30 bg-white/5 p-2 rounded-lg border border-white/5">{proj.tech}</div>
              </div>
              <button 
                onClick={() => handleDelete(proj._id)}
                className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-black/50"
                title="Delete Project"
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
