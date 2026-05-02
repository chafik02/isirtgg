'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setEmail(session.user.email || '');
      }
    };
    getSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-black/60 border-r border-white/10 flex flex-col h-screen fixed top-0 left-0">
      <div className="p-6 border-b border-white/10">
        <Link href="/dashboard" className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-blue-500">IT</span>-Fix
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all">
          Dashboard
        </Link>
        <Link href="/dashboard" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all">
          My Tickets
        </Link>
        <Link href="/dashboard/technicians" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all">
          Technicians
        </Link>
      </nav>

      <div className="p-4 border-t border-white/10">
        {email && (
          <div className="text-xs text-gray-500 mb-2 truncate px-4">
            Logged in as: {email}
          </div>
        )}
        <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all">
          Log out
        </button>
      </div>
    </aside>
  );
}
