import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) return;
    
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', { passcode });
      if (res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-sans p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-white/80" />
            </div>
            <h1 className="text-3xl font-bold uppercase tracking-tight">
              Admin <span className="text-white/40">Login</span>
            </h1>
            <p className="text-white/40 mt-2 text-sm">Please enter the administrator passcode to continue.</p>
        </div>

        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2 block">Passcode</label>
                    <input 
                        type="password" 
                        placeholder="Enter passcode..."
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-white/50 transition-colors"
                    />
                </div>

                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-50"
                >
                  {loading ? 'Logging in...' : 'Login'}
                  <ArrowRight className="w-4 h-4" />
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}
