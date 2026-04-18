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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-black font-sans p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 rounded-2xl border border-gray-200 bg-white flex items-center justify-center mb-4 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight">
              Admin <span className="text-gray-400">Login</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Please enter the administrator passcode to continue.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="text-sm font-bold text-gray-500 mb-2 block">Passcode</label>
                    <input 
                        type="password" 
                        placeholder="Enter passcode..."
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    />
                </div>

                {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white font-bold uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-900 transition-all disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Login'}
                  <ArrowRight className="w-4 h-4" />
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}
