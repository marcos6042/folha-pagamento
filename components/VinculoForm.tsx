import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";

const schema = z.object({
  trabalhador_id: z.string().min(1, "ID do trabalhador é obrigatório"),
  data_admissao: z.string().min(1, "Data de admissão obrigatória"),
  salario: z.string().min(1, "Salário obrigatório")
});

export default function VinculoForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: any) => {
    await supabase.from("vinculos").insert(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <input {...register("trabalhador_id")} placeholder="ID do trabalhador" className="p-2 border w-full" />
      {errors.trabalhador_id?.message && <p className="text-red-600 text-sm">{String(errors.trabalhador_id.message)}</p>}

      <input type="date" {...register("data_admissao")} placeholder="Data de admissão" className="p-2 border w-full" />
      {errors.data_admissao?.message && <p className="text-red-600 text-sm">{String(errors.data_admissao.message)}</p>}

      <input type="number" step="0.01" {...register("salario")} placeholder="Salário" className="p-2 border w-full" />
      {errors.salario?.message && <p className="text-red-600 text-sm">{String(errors.salario.message)}</p>}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Vínculo</button>
    </form>
  );
}

