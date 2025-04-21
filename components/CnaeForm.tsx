'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../lib/supabase';

const schema = z.object({
  cnaes: z.array(
    z.object({
      codigo: z.string().min(1, 'Informe o código'),
      descricao: z.string().optional(),
      principal: z.boolean(),
    })
  ).min(1, 'Informe pelo menos um CNAE'),
});

type FormData = z.infer<typeof schema>;

export default function CnaeForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      cnaes: [{ codigo: '', descricao: '', principal: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cnaes',
  });

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.from('cnaes').insert(data.cnaes);
    if (error) {
      alert('Erro: ' + error.message);
    } else {
      alert('CNAEs salvos com sucesso!');
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md space-y-4 mb-10">
      <h2 className="text-xl font-bold text-blue-700 border-b pb-2">Cadastro de CNAEs</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="grid md:grid-cols-4 gap-4 items-end">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Código</label>
            <input {...register(`cnaes.${index}.codigo`)} className="p-2 border rounded w-full" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <input {...register(`cnaes.${index}.descricao`)} className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register(`cnaes.${index}.principal`)} />
            <label className="text-sm">Principal</label>
          </div>
          <button type="button" onClick={() => remove(index)} className="text-red-600 text-sm">Remover</button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ codigo: '', descricao: '', principal: false })}
        className="text-blue-600 text-sm"
      >
        + Adicionar CNAE
      </button>

      {errors.cnaes && <p className="text-red-500 text-sm">{errors.cnaes.message as string}</p>}

      <div className="text-right pt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Salvar CNAEs
        </button>
      </div>
    </form>
  );
}

