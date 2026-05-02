import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTechs() {
  const { data, error } = await supabase
    .from('users')
    .select('id, role')
    .eq('role', 'technician');
  
  console.log('Technicians found:', data);
  console.log('Error:', error);
}

checkTechs();
