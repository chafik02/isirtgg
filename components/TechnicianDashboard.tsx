'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  created_at: string;
};

export default function TechnicianDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('assigned_to', session.user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setTickets(data);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleUpdateStatus = async (ticketId: string, newStatus: string) => {
    const { error } = await supabase
      .from('tickets')
      .update({ status: newStatus })
      .eq('id', ticketId);

    if (!error) {
      fetchTickets();
    }
  };

  if (loading) {
    return <div className="text-white/60 text-center py-8">Loading assigned tickets...</div>;
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-[#12121a] border border-white/5 p-8 rounded-2xl text-center shadow-xl">
        <p className="text-white/60">You have no tickets assigned to you at the moment.</p>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'in_progress': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'resolved': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-white/80 bg-white/10 border-white/10';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-6">Assigned Tickets</h2>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="bg-[#12121a] border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/20 transition-all">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">{ticket.title}</h3>
            <p className="text-sm text-white/60 mb-4">{ticket.description}</p>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority || 'Normal'} Priority
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getStatusColor(ticket.status)}`}>
                {ticket.status || 'Open'}
              </span>
            </div>
          </div>
          
          <div className="flex flex-row md:flex-col gap-3">
            {ticket.status !== 'in_progress' && ticket.status !== 'resolved' && (
              <button
                onClick={() => handleUpdateStatus(ticket.id, 'in_progress')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-bold transition-colors shadow-lg"
              >
                Start Working
              </button>
            )}
            
            {ticket.status !== 'resolved' && (
              <button
                onClick={() => handleUpdateStatus(ticket.id, 'resolved')}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-bold transition-colors shadow-lg"
              >
                Resolve Ticket
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
