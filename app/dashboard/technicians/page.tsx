'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { ShieldCheck, User } from 'lucide-react';

export default function TechniciansPage() {
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTechnicians = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      // Fetch name, full_name, and role specifically
      const { data, error } = await supabase
        .from('users') 
        .select('id, name, full_name, email, role')
        .eq('role', 'technician');

      if (error) {
        console.error('DEBUG: Error fetching technicians:', error);
      } else if (data) {
        setTechnicians(data);
      }
      setLoading(false);
    };

    fetchTechnicians();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="w-10 h-10 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Our Support Team</h1>
          <p className="text-gray-400">Certified technicians dedicated to resolving your IT issues.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technicians && technicians.length > 0 ? (
          technicians.map((tech) => (
            <div key={tech.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-300">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center text-blue-400 text-3xl font-bold mb-4 border border-white/10 group-hover:border-blue-500/50 transition-all">
                {tech.full_name ? tech.full_name[0] : (tech.name ? tech.name[0] : tech.email?.[0]?.toUpperCase())}
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1">
                {tech.full_name || tech.name || 'Anonymous Technician'}
              </h3>
              <p className="text-gray-500 text-xs mb-4 truncate w-full px-2">{tech.email}</p>
              
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck size={14} className="text-purple-400" />
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">
                  {tech.role}
                </span>
              </div>

              <div className="mt-auto pt-4 border-t border-white/5 w-full">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">
                    Available Now
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-gray-400 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <p className="text-lg">No technicians found.</p>
            <p className="text-sm mt-2 opacity-60">Make sure users are registered with the 'technician' role.</p>
          </div>
        )}
      </div>
    </div>
  );
}
