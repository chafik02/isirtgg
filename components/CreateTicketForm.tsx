'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function CreateTicketForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Get Session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        setError('You must be logged in to create a ticket.');
        setLoading(false);
        return;
      }

      // 2. Fetch Technicians directly
      const { data: techs, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('role', 'technician');

      console.log('LOG: Fetched technicians:', techs);

      if (fetchError) {
        throw new Error(`Error fetching technicians: ${fetchError.message}`);
      }

      if (!techs || techs.length === 0) {
        throw new Error('Critical Error: No technician available in the system. Please contact support.');
      }

      // 3. Select One Randomly
      const randomIndex = Math.floor(Math.random() * techs.length);
      const selectedTechId = techs[randomIndex].id;
      
      console.log('LOG: Selected technician id:', selectedTechId);

      // 4. Final check before insert
      const assignedTo = selectedTechId;
      console.log('LOG: assigned_to value before insert:', assignedTo);

      if (!assignedTo) {
        throw new Error('Critical Error: Could not determine assigned_to ID.');
      }

      // 5. Insert Ticket
      const { error: insertError } = await supabase
        .from('tickets')
        .insert([
          {
            title,
            description,
            priority,
            user_id: session.user.id,
            status: 'open',
            assigned_to: assignedTo,
          }
        ]);

      if (insertError) {
        throw new Error(`Insert failed: ${insertError.message}`);
      }

      // 6. Success
      console.log('LOG: Ticket created and assigned successfully!');
      setTitle('');
      setDescription('');
      setPriority('low');
      window.dispatchEvent(new Event('ticketCreated'));

    } catch (err: any) {
      console.error('ERROR:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#12121a] border border-white/10 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6">Create New Ticket</h2>
      
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#1a1a24] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            required
            placeholder="E.g. Cannot access email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#1a1a24] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[100px]"
            required
            placeholder="Please describe the issue in detail..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-[#1a1a24] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing...
            </span>
          ) : (
            'Submit Ticket'
          )}
        </button>
      </form>
    </div>
  );
}
