import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, X, ExternalLink, Github } from 'lucide-react';
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
          <h2 className="text-3xl font-black uppercase tracking-tight text-black mb-1">Manage Projects</h2>
          <p className="text-sm text-gray-500 font-medium">Add new projects to your portfolio or delete existing ones.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
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
              className="bg-white border border-gray-200 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-2xl font-black text-black">New Project Form</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Project Name *</label>
                    <input required type="text" value={projectData.name} onChange={e => setProjectData({...projectData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="e.g. FoodFlow Application" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Category *</label>
                    <input required type="text" value={projectData.category} onChange={e => setProjectData({...projectData, category: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="e.g. Web Development" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Full Description *</label>
                  <textarea required value={projectData.shortDesc} onChange={e => setProjectData({...projectData, shortDesc: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black h-28 resize-none transition-all" placeholder="Explain what the project does..." />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Technologies Used *</label>
                  <input required type="text" value={projectData.tech} onChange={e => setProjectData({...projectData, tech: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="React, Node.js, Tailwind (comma separated)" />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">GitHub Link (Optional)</label>
                    <input type="url" value={projectData.github} onChange={e => setProjectData({...projectData, github: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="https://github.com/..." />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Live Demo Link (Optional)</label>
                    <input type="url" value={projectData.demo} onChange={e => setProjectData({...projectData, demo: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="https://..." />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Upload Thumbnail Image *</label>
                  <div className={`aspect-video rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer relative overflow-hidden ${preview ? 'border-gray-300 bg-black' : 'border-gray-200 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'}`}>
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleImageChange} required />
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

                <button type="submit" disabled={loading} className="w-full bg-black text-white font-bold uppercase py-4 rounded-xl hover:bg-gray-800 transition-colors mt-8 disabled:opacity-50 shadow-md">
                  {loading ? 'Uploading Project...' : 'Save New Project'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.length === 0 ? (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-white">
            <p className="text-gray-400 text-sm font-bold uppercase">No projects added yet.</p>
          </div>
        ) : (
          projects.map((proj) => (
            <div key={proj._id} className="bg-white border border-gray-200 rounded-3xl overflow-hidden flex flex-col relative group shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-full h-48 bg-gray-100 relative group-hover:scale-105 transition-transform duration-500">
                <img src={`http://localhost:5001${proj.imageUrl}`} alt={proj.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col bg-white relative z-10">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{proj.category}</span>
                <h4 className="text-xl font-black mb-2 text-black">{proj.name}</h4>
                <p className="text-sm text-gray-500 line-clamp-3 mb-4">{proj.shortDesc}</p>
                <div className="text-xs font-bold text-gray-400 bg-gray-50 p-3 rounded-xl border border-gray-100 mb-4">{proj.tech}</div>
                
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {proj.demo && (
                    <a href={proj.demo} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <button 
                onClick={() => handleDelete(proj._id)}
                className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg z-20 translate-y-2 group-hover:translate-y-0"
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
