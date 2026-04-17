import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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
      alert('Please upload an image for the project.');
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
      alert('Project successfully created!');
      setProjectData({ name: '', category: '', shortDesc: '', tech: '', github: '', demo: '', image: null });
      setPreview(null);
      fetchProjects(); // Refresh the list
    } catch (err) {
      console.error(err);
      alert('Failed to upload project.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:5001/api/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error(err);
        alert('Failed to delete project.');
      }
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold uppercase mb-2">Manage Projects</h2>
        <p className="text-sm text-white/50">Add new projects to your portfolio or delete existing ones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ADD PROJECT FORM */}
        <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6">
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

            <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold uppercase py-4 rounded-xl hover:bg-gray-200 transition-colors mt-4 disabled:opacity-50">
              {loading ? 'Uploading Project...' : 'Save New Project'}
            </button>
          </form>
        </div>

        {/* LIST EXISTING PROJECTS */}
        <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 flex flex-col h-[800px]">
          <h3 className="text-lg font-bold mb-4">Existing Projects ({projects.length})</h3>
          
          <div className="flex-1 overflow-auto space-y-4 pr-2">
            {projects.length === 0 ? (
              <p className="text-white/40 text-sm text-center py-10">No projects added yet.</p>
            ) : (
              projects.map((proj) => (
                <div key={proj._id} className="bg-black border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row gap-4 relative group">
                  <img src={`http://localhost:5001${proj.imageUrl}`} alt={proj.name} className="w-32 h-24 object-cover rounded-lg border border-white/5" />
                  <div className="flex-1">
                    <span className="text-xs text-white/40 font-bold uppercase">{proj.category}</span>
                    <h4 className="text-base font-bold mb-1">{proj.name}</h4>
                    <p className="text-xs text-white/50 line-clamp-2 mb-2">{proj.shortDesc}</p>
                    <div className="text-xs text-white/30">{proj.tech}</div>
                  </div>
                  <button 
                    onClick={() => handleDelete(proj._id)}
                    className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete Project"
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
