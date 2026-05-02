'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TicketPage({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<any>(null);
  const [creator, setCreator] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'user' | 'technician' | null>(null);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const fetchTicket = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/login');
      return;
    }

    setUserId(session.user.id);

    // Fetch user role
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    const role = userData?.role || 'user';
    setUserRole(role);

    // Fetch ticket with creator details
    const { data } = await supabase
      .from('tickets')
      .select('*, users!inner(name, email)')
      .eq('id', params.id)
      .single();

    if (data) {
      // Authorization check
      if (role === 'user' && data.user_id !== session.user.id) {
        router.push('/dashboard');
        return;
      }
      if (role === 'technician' && data.assigned_to !== session.user.id) {
        router.push('/dashboard');
        return;
      }
      setTicket(data);
      setCreator(data.users);
    } else {
      router.push('/dashboard');
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [params.id, router]);

  const updateStatus = async (newStatus: string) => {
    if (updating) return;
    setUpdating(true);
    
    const { error } = await supabase
      .from('tickets')
      .update({ status: newStatus })
      .eq('id', params.id);

    if (!error) {
      setTicket({ ...ticket, status: newStatus });
    }
    setUpdating(false);
  };

  if (!ticket || !userId || !userRole) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <div className="w-10 h-10 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#050505]">
      {/* Header */}
      <div className="bg-black/60 backdrop-blur-xl border-b border-white/10 p-6 flex-shrink-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-white">{ticket.title}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase border ${
                  ticket.priority === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                  ticket.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                  'bg-white/5 text-gray-300 border-white/10'
                }`}>
                  {ticket.priority}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${
                    ticket.status === 'open' ? 'bg-green-500' :
                    ticket.status === 'in_progress' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`}></div>
                  {ticket.status.replace('_', ' ')}
                </span>
                <span>•</span>
                <span>Created by {creator?.name || 'User'}</span>
                <span>•</span>
                <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Technician Actions */}
          {userRole === 'technician' && (
            <div className="flex gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/5">
              <button
                onClick={() => updateStatus('open')}
                disabled={updating || ticket.status === 'open'}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  ticket.status === 'open' 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Open
              </button>
              <button
                onClick={() => updateStatus('in_progress')}
                disabled={updating || ticket.status === 'in_progress'}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  ticket.status === 'in_progress' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => updateStatus('resolved')}
                disabled={updating || ticket.status === 'resolved'}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  ticket.status === 'resolved' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Resolved
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden max-w-7xl mx-auto w-full">
        {/* Left: Chat */}
        <div className="flex-1 flex flex-col border-r border-white/5 relative">
          <div className="flex-1 overflow-hidden flex flex-col">
            <MessageList ticketId={ticket.id} currentUserId={userId} />
          </div>
          <div className="p-6 bg-black/40 backdrop-blur-md border-t border-white/5">
            <MessageInput ticketId={ticket.id} currentUserId={userId} />
          </div>
        </div>

        {/* Right: Details Sidebar */}
        <div className="w-80 flex-shrink-0 bg-white/[0.02] backdrop-blur-sm p-8 space-y-8 overflow-y-auto hidden xl:block">
          <div>
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Description</h3>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-gray-300 text-sm leading-relaxed">
              {ticket.description}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Customer</h3>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                {creator?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{creator?.name || 'User'}</p>
                <p className="text-[10px] text-gray-500">{creator?.email}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Ticket Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/5 text-[11px]">
                <span className="text-gray-500">Created</span>
                <span className="text-gray-300">{new Date(ticket.created_at).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5 text-[11px]">
                <span className="text-gray-500">Ticket ID</span>
                <span className="text-gray-300 truncate ml-4 max-w-[120px]">{ticket.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
