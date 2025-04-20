'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../lib/supabase';

const schema = z.object({
  nome_completo: z.string().min(1, 'Nome obrigatório'),
  cpf: z.string().min(11, 'CPF inválido'),
  telefone: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
});

type FormData = z.infer<typeof schema>;

export default function ResponsavelForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.from('responsaveis').insert(data);
    if (error) {
      alert('Erro ao salvar: ' + error.message);
    } else {
      alert('Responsável salvo com sucesso!');
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded-lg p-6 space-y-4 mb-10"
    >
      <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
        Cadastro de Responsável Fiscal
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nome Completo
          </label>
          <input
            {...register('nome_completo')}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Nome do Responsável Fiscal"
          />
          {errors.nome_completo && (
            <p className="text-red-500 text-sm">{errors.nome_completo.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            {...register('cpf')}
            className="mt-1 p-2 border rounded w-full"
            placeholder="000.000.000-00"
          />
          {errors.cpf && (
            <p className="text-red-500 text-sm">{errors.cpf.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Telefone
          </label>
          <input
            {...register('telefone')}
            className="mt-1 p-2 border rounded w-full"
            placeholder="(00) 00000-0000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register('email')}
            className="mt-1 p-2 border rounded w-full"
            placeholder="email@dominio.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="pt-4 text-right">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Salvar Responsável
        </button>
      </div>
    </form>
  );
}
