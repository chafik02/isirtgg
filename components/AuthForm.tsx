'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, ShieldCheck } from 'lucide-react';

type AuthFormProps = {
  type: 'login' | 'register';
};

export default function AuthForm({ type }: AuthFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (type === 'register') {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Insert into public.users
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              name: name,
              role: role,
            }
          ]);
        
        if (insertError) {
          setError(insertError.message);
          setLoading(false);
          return;
        }

        router.push('/dashboard');
        router.refresh();
      }
    } else {
      // Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        router.push('/dashboard');
        router.refresh();
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md relative z-10 bg-[#0a0a0f]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {type === 'login' ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-white/60">
          {type === 'login' ? 'Log in to your IT-Fix account' : 'Join IT-Fix today'}
        </p>
      </div>

      {/* Role Selection UI - Card Based */}
      {type === 'register' && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
              role === 'user' 
                ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <User className={role === 'user' ? 'text-blue-400' : 'text-white/40'} />
            <span className={`text-sm font-bold ${role === 'user' ? 'text-white' : 'text-white/60'}`}>User</span>
          </button>
          
          <button
            type="button"
            onClick={() => setRole('technician')}
            className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
              role === 'technician' 
                ? 'bg-purple-600/20 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <ShieldCheck className={role === 'technician' ? 'text-purple-400' : 'text-white/40'} />
            <span className={`text-sm font-bold ${role === 'technician' ? 'text-white' : 'text-white/60'}`}>Technician</span>
          </button>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {type === 'register' && (
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1a1a24] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              placeholder="John Doe"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#1a1a24] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1a1a24] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              {type === 'login' ? 'Logging in...' : 'Creating account...'}
            </span>
          ) : (
            type === 'login' ? 'Log In' : 'Sign Up'
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-white/60">
        {type === 'login' ? "Don't have an account? " : "Already have an account? "}
        <Link 
          href={type === 'login' ? '/register' : '/login'} 
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          {type === 'login' ? 'Sign up here' : 'Log in here'}
        </Link>
      </p>
    </div>
  );
}
