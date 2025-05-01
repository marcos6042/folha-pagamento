import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { data, error } = await supabase
    .from('empresas')
    .select('id, razao_social')
    .order('razao_social', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json(data);
}
