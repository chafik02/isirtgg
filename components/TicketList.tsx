'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

interface Ticket {
  id: string;
  title: string;
  status: string;
  priority: string;
  created_at: string;
  assigned_to: string | null;
  user_id: string;
}

export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'user' | 'technician' | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      
      // 1. Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setLoading(false);
        return;
      }

      const currentUserId = session.user.id;
      console.log('DEBUG: session.user.id:', currentUserId);

      // 2. Fetch current user's role from "users" table
      const { data: userData, error: roleError } = await supabase
        .from('users')
        .select('role')
        .eq('id', currentUserId)
        .single();

      if (roleError) {
        console.error('DEBUG: Error fetching role:', roleError);
        setLoading(false);
        return;
      }

      const role = userData?.role || 'user';
      setUserRole(role);
      console.log('DEBUG: detected role:', role);

      // 3. Fetch tickets based on role
      let query = supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (role === 'technician') {
        // Fetch tickets assigned to this technician
        query = query.eq('assigned_to', currentUserId);
      } else {
        // Fetch tickets created by this user
        query = query.eq('user_id', currentUserId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('DEBUG: Error fetching tickets:', fetchError);
      } else if (data) {
        console.log('DEBUG: tickets fetched:', data);
        setTickets(data);
      }
      
      setLoading(false);
    };

    fetchTickets();

    // Add event listener for real-time updates if needed
    const handleTicketCreated = () => fetchTickets();
    window.addEventListener('ticketCreated', handleTicketCreated);
    
    return () => window.removeEventListener('ticketCreated', handleTicketCreated);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="w-10 h-10 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></span>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
        <p className="text-lg">No tickets found.</p>
        <p className="text-sm mt-2 opacity-70">
          {userRole === 'technician' 
            ? "You don't have any tickets assigned to you yet." 
            : "Create a new ticket to get started."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {tickets.map((ticket) => (
        <Link 
          href={`/ticket/${ticket.id}`} 
          key={ticket.id}
          className="block group h-full"
        >
          <div className="bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 p-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-blue-500/20 h-full flex flex-col relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all"></div>

            <div className="flex justify-between items-start mb-5 relative z-10">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                {ticket.title}
              </h3>
            </div>
            
            <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
                  ticket.status === 'open' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                  ticket.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  ticket.status === 'resolved' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                  'bg-gray-500/10 text-gray-400 border-gray-500/20'
                }`}>
                  {ticket.status.replace('_', ' ')}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
                  ticket.priority === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                  ticket.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                  'bg-white/5 text-gray-300 border-white/10'
                }`}>
                  {ticket.priority}
                </span>
              </div>
              
              <span className="text-xs text-gray-500 font-medium bg-black/40 px-3 py-1 rounded-full border border-white/5">
                {new Date(ticket.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
