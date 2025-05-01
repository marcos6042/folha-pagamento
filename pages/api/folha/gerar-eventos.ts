import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { id_empresa, referencia } = req.body;

  const { data: vinculos, error } = await supabase
    .from('vinculo')
    .select('*, trabalhador(*), rubricas:rubrica(*)')
    .eq('id_empresa', id_empresa)
    .eq('ativo', true);

  if (error) return res.status(500).json({ error: error.message });

  for (const vinculo of vinculos || []) {
    const eventoJson = {
      evtRemun: {
        ideEvento: {
          indRetif: '1',
          indApuracao: '1',
          perApur: referencia,
          procEmi: '1',
          verProc: '1.0'
        },
        ideEmpregador: {
          tpInsc: '1',
          nrInsc: vinculo?.empresa?.cnpj ?? '00000000000000'
        },
        ideTrabalhador: {
          cpfTrab: vinculo.trabalhador.cpf
        },
        remunPerApur: {
          itensRemun: vinculo.rubricas.map((rub: any) => ({
            codRubr: rub.codigo,
            ideTabRubr: rub.tabela || '1',
            qtdRubr: rub.quantidade || '1',
            vrRubr: rub.valor
          }))
        }
      }
    };

    await supabase.from('evento_esocial').insert([{
      tipo_evento: 'S-1200',
      referencia,
      dados: eventoJson,
      id_empresa
    }]);
  }

  return res.status(200).json({ status: 'ok' });
}
