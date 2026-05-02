'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Technician = {
  id: string;
  name: string;
};

type AssignTechnicianProps = {
  ticketId: string;
  currentAssignedTo: string | null;
  onAssign?: () => void;
};

export default function AssignTechnician({ ticketId, currentAssignedTo, onAssign }: AssignTechnicianProps) {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    const fetchTechnicians = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, name')
        .eq('role', 'technician');

      if (data) {
        setTechnicians(data);
      }
      setLoading(false);
    };

    fetchTechnicians();
  }, []);

  const handleAssign = async (technicianId: string) => {
    setAssigning(true);
    const { error } = await supabase
      .from('tickets')
      .update({ assigned_to: technicianId || null })
      .eq('id', ticketId);

    setAssigning(false);
    if (!error && onAssign) {
      onAssign();
    }
  };

  if (loading) return <span className="text-white/60 text-sm">Loading techs...</span>;

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentAssignedTo || ''}
        onChange={(e) => handleAssign(e.target.value)}
        disabled={assigning}
        className="bg-[#1a1a24] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 disabled:opacity-50"
      >
        <option value="">Unassigned</option>
        {technicians.map((tech) => (
          <option key={tech.id} value={tech.id}>
            {tech.name}
          </option>
        ))}
      </select>
      {assigning && <span className="text-xs text-blue-400 animate-pulse">Assigning...</span>}
    </div>
  );
}
