'use client';

import { useEffect, useState } from 'react';
import TicketList from '@/components/TicketList';
import CreateTicketForm from '@/components/CreateTicketForm';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'user' | 'technician' | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      setUserId(session.user.id);

      // Fetch user role
      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (!error && userData) {
        setUserRole(userData.role);
      } else {
        // Default to user if error
        setUserRole('user');
      }

      setLoading(false);
    };

    checkAuthAndRole();
  }, [router]);

  if (loading || !userRole || !userId) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <div className="w-10 h-10 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {userRole === 'technician' ? 'Technician Dashboard' : 'My Support Dashboard'}
          </h1>
          <p className="text-gray-400">
            {userRole === 'technician' 
              ? 'Manage and resolve your assigned support tickets.' 
              : 'Track your tickets and communicate with our support team.'}
          </p>
        </div>
        {userRole === 'technician' && (
          <div className="bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-2xl">
            <span className="text-purple-400 font-bold text-sm uppercase tracking-wider">Technician Access</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-white">
              {userRole === 'technician' ? 'Assigned Tickets' : 'Recent Tickets'}
            </h2>
          </div>
          <div className="bg-black/40 border border-white/10 p-6 rounded-3xl backdrop-blur-sm min-h-[400px]">
            <TicketList />
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          {userRole === 'user' ? (
            <>
              <h2 className="text-xl font-bold text-white px-2">New Ticket</h2>
              <CreateTicketForm />
            </>
          ) : (
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 font-bold">Online</span>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-center">
                  <p className="text-blue-400 text-sm font-medium">Ready to help users</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
