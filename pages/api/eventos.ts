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

  const { id_empresa, referencia } = req.query;

  if (!id_empresa || !referencia) {
    return res.status(400).json({ error: 'Parâmetros ausentes' });
  }

  const { data, error } = await supabase
    .from('evento_esocial')
    .select('id, tipo_evento, referencia, status, data_geracao')
    .eq('id_empresa', Number(id_empresa))
    .eq('referencia', referencia)
    .order('data_geracao', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json(data);
}
