import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Layout, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Github, 
  Save, 
  Terminal,
  ShieldCheck,
  FileCode
} from 'lucide-react';

function App() {
  const [project, setProject] = useState({
    name: '',
    category: '',
    shortDesc: '',
    tech: '',
    github: '',
    demo: '',
    image: null as File | null
  });

  const [previews, setPreviews] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProject({ ...project, image: file });
      setPreviews(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for backend upload will go here
    console.log("Uploading project:", project);
    alert("Project management logic initialized. Backend integration pending.");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20">
      {/* Background HUD Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-[1.5px] bg-white opacity-40" />
              <span className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase italic">Control Panel v1.0</span>
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">
              PORTFOLIO<span className="text-white/20">ADMIN</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end opacity-40">
              <span className="text-[8px] font-black tracking-widest uppercase">System: Operational</span>
              <span className="text-[8px] font-black tracking-widest uppercase">Status: Root_Access</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 p-1 flex items-center justify-center bg-white/5">
              <ShieldCheck className="w-5 h-5 text-white/60" />
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-white/10 transition-colors group-hover:bg-white/30" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-white/60">
                  <Plus className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-tight italic">Deploy New Project</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Project Name</label>
                    <div className="relative group/input">
                      <Layout className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-white transition-colors" />
                      <input 
                        type="text" 
                        placeholder="e.g. Nexus Dashboard"
                        className="w-full bg-black border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-white transition-colors text-sm font-medium"
                        value={project.name}
                        onChange={e => setProject({...project, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Category</label>
                    <div className="relative group/input">
                      <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-white transition-colors" />
                      <input 
                        type="text" 
                        placeholder="e.g. Fintech / Web3"
                        className="w-full bg-black border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-white transition-colors text-sm font-medium"
                        value={project.category}
                        onChange={e => setProject({...project, category: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Short Description</label>
                  <textarea 
                    placeholder="Describe the module purpose..."
                    className="w-full bg-black border border-white/10 rounded-xl py-3.5 px-4 outline-none focus:border-white transition-colors text-sm font-medium h-32 resize-none"
                    value={project.shortDesc}
                    onChange={e => setProject({...project, shortDesc: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Tech Stack (Comma Separated)</label>
                  <div className="relative group/input">
                    <FileCode className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-white transition-colors" />
                    <input 
                      type="text" 
                      placeholder="React, Node.js, Tailwind..."
                      className="w-full bg-black border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-white transition-colors text-sm font-medium"
                      value={project.tech}
                      onChange={e => setProject({...project, tech: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Github Repository</label>
                    <div className="relative group/input">
                      <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-white transition-colors" />
                      <input 
                        type="url" 
                        placeholder="https://github.com/..."
                        className="w-full bg-black border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-white transition-colors text-sm font-medium"
                        value={project.github}
                        onChange={e => setProject({...project, github: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Live Demo Link</label>
                    <div className="relative group/input">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-white transition-colors" />
                      <input 
                        type="url" 
                        placeholder="https://..."
                        className="w-full bg-black border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-white transition-colors text-sm font-medium"
                        value={project.demo}
                        onChange={e => setProject({...project, demo: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white text-black font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all shadow-[0_10px_40px_rgba(255,255,255,0.1)] group/btn overflow-visible relative"
                >
                  <Save className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                  INIT_DATA_UPLOAD
                  {/* Decorative corners for the button */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/30" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/30" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white/30" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/30" />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Sidebar / Preview Section */}
          <div className="space-y-8">
            {/* Image Upload Area */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 relative overflow-hidden group"
            >
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4 block">Asset Upload</label>
              
              <div 
                className={`aspect-video rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 cursor-pointer relative overflow-hidden ${
                  previews ? 'border-white/20 bg-black' : 'border-white/10 hover:border-white/30 bg-white/5'
                }`}
              >
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                  onChange={handleImageChange}
                />
                
                {previews ? (
                  <img src={previews} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="p-4 bg-white/5 rounded-full border border-white/10">
                      <ImageIcon className="w-8 h-8 text-white/40" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold uppercase tracking-tight italic">Drag & Drop Thumbnail</p>
                      <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1">Recommended: 800x800 PNG/JPG</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Quick Stats / Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6"
            >
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6 flex items-center justify-between">
                Live Preview (Mock)
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </h3>
              
              <div className="space-y-4">
                <div className="bg-black p-4 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase italic text-white/60">{project.category || 'CATEGORY_ID'}</span>
                    <span className="text-[8px] font-black text-white/20 uppercase">ID: 00_LOCAL</span>
                  </div>
                  <h4 className="text-lg font-black italic uppercase tracking-tighter mb-2">{project.name || 'PROJECT_TITLE'}</h4>
                  <p className="text-[10px] leading-relaxed text-white/30 uppercase tracking-tight line-clamp-2">
                    {project.shortDesc || 'System description pending payload transmission...'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
