'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../lib/supabase';

const schema = z.object({
  razao_social: z.string().min(1, 'Obrigatório'),
  cnpj: z
    .string()
    .min(14, 'CNPJ inválido')
    .regex(/^\d{14}$/, 'CNPJ deve conter exatamente 14 dígitos numéricos'),
  tipo_estabelecimento: z.enum(['matriz', 'filial', 'scp']),
  cnpj_matriz_ou_ostensiva: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EmpresaForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const tipo = watch('tipo_estabelecimento');

  const onSubmit = async (data: FormData) => {
    const { data: result, error } = await supabase.from('empresas').insert(data).select();
    if (!error) {
      alert('Empresa cadastrada!');
      console.log('Empresa cadastrada:', result);
      reset();
    } else {
      alert('Erro: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow rounded-lg space-y-4">
      <h2 className="text-xl font-bold text-blue-700 border-b pb-2">Cadastro de Empresa</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Razão Social</label>
        <input {...register('razao_social')} className="mt-1 p-2 border w-full rounded" />
        {errors.razao_social && <p className="text-red-500 text-sm">{errors.razao_social.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">CNPJ</label>
        <input {...register('cnpj')} className="mt-1 p-2 border w-full rounded" />
        {errors.cnpj && <p className="text-red-500 text-sm">{errors.cnpj.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de Estabelecimento</label>
        <select {...register('tipo_estabelecimento')} className="mt-1 p-2 border w-full rounded">
          <option value="">Selecione</option>
          <option value="matriz">Matriz</option>
          <option value="filial">Filial</option>
          <option value="scp">SCP</option>
        </select>
        {errors.tipo_estabelecimento && (
          <p className="text-red-500 text-sm">{errors.tipo_estabelecimento.message}</p>
        )}
      </div>

      {(tipo === 'filial' || tipo === 'scp') && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CNPJ da Matriz ou Ostensiva
          </label>
          <input {...register('cnpj_matriz_ou_ostensiva')} className="mt-1 p-2 border w-full rounded" />
        </div>
      )}

      <div className="text-right pt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Salvar Empresa
        </button>
      </div>
    </form>
  );
}

