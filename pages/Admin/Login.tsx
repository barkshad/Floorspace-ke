
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2, ShieldCheck } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Authenticate directly with Firebase using the provided credentials
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err: any) {
      console.error("Auth error:", err);
      // Map Firebase error codes to user-friendly messages
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No administrator account found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        default:
          setError('Login failed. Please verify your Firebase credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F5] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10 border border-gray-100 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-wood/5 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-10 relative z-10">
          <div className="bg-wood w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-wood/20">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CMS Portal</h1>
          <p className="text-gray-500 font-medium">Floor Space Interiors Kenya</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm mb-8 border border-red-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0"></div>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                required
                autoFocus
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-wood focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                placeholder="admin@floorspace.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-wood focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-wood text-white py-4.5 rounded-2xl font-bold shadow-lg shadow-wood/30 flex items-center justify-center gap-3 hover:bg-[#6F4B30] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Verifying...</span>
              </>
            ) : (
              'Authorized Access'
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-black">
            Firebase Auth Secured
          </p>
        </div>
      </div>
    </div>
  );
};
