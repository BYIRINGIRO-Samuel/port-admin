import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShieldCheck, LayoutDashboard, FolderKanban, MessageSquare, Star, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  { name: 'Reviews', path: '/admin/reviews', icon: Star },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans flex">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white relative z-20 flex flex-col md:flex shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Control Panel</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight uppercase relative">
            PORTFOLIO<br/><span className="text-gray-400">ADMIN</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border ${
                  isActive 
                    ? 'bg-black border-black text-white shadow-md' 
                    : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-bold">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100">
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-bold">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-gray-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md shrink-0 shadow-sm">
          <div className="md:hidden flex items-center gap-2">
            <h1 className="text-xl font-black tracking-tighter uppercase">PORTFOLIO ADMIN</h1>
          </div>
          <div className="hidden md:block">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Secure Connection</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end opacity-80">
              <span className="text-[10px] font-bold tracking-widest uppercase text-black">System: Operational</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Status: Root Access</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-200 p-1 flex items-center justify-center bg-gray-50 relative overflow-hidden">
              <ShieldCheck className="w-5 h-5 text-black relative z-10" />
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
