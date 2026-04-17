import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShieldCheck, LayoutDashboard, FolderKanban, MessageSquare, Star, Briefcase, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  { name: 'Reviews', path: '/admin/reviews', icon: Star },
  { name: 'Career', path: '/admin/career', icon: Briefcase },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 flex">
      {/* Background HUD Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl relative z-20 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-[1.5px] bg-white opacity-40" />
            <span className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase italic">Control Panel</span>
          </div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase relative">
            PORTFOLIO<br/><span className="text-white/20">ADMIN</span>
            <div className="absolute top-1 -right-2 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border ${
                  isActive 
                    ? 'bg-white/10 border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                    : 'bg-transparent border-transparent text-white/40 hover:bg-white/5 hover:text-white/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20">
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">Terminate Session</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-[#0a0a0a]/50 backdrop-blur-md shrink-0">
          <div className="md:hidden flex items-center gap-2">
            <h1 className="text-xl font-black italic tracking-tighter uppercase">PORTFOLIO ADMIN</h1>
          </div>
          <div className="hidden md:block">
            <span className="text-[10px] font-black tracking-widest uppercase text-white/40">Secure Connection Established</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end opacity-40">
              <span className="text-[8px] font-black tracking-widest uppercase">System: Operational</span>
              <span className="text-[8px] font-black tracking-widest uppercase">Status: Root_Access</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 p-1 flex items-center justify-center bg-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-green-500/20 animate-pulse" />
              <ShieldCheck className="w-5 h-5 text-green-500/80 relative z-10" />
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
