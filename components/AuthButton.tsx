'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get current session
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-white/80 font-medium hidden sm:block">
          {user.email}
        </span>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-white/80 hover:text-red-400 transition-colors px-4 py-2 rounded-full hover:bg-white/5"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="text-sm font-medium text-white/80 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="relative group overflow-hidden rounded-full p-[1px]"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full opacity-70 group-hover:opacity-100 blur-sm transition-opacity duration-300"></span>
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
        <div className="relative bg-[#0a0a0f] hover:bg-transparent transition-colors duration-300 px-6 py-2.5 rounded-full flex items-center gap-2">
          <span className="text-sm font-semibold text-white">Get Started Free</span>
        </div>
      </Link>
    </div>
  );
}
