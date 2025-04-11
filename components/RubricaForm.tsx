import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";

const schema = z.object({
  codigo: z.string().min(1, "Código obrigatório"),
  descricao: z.string().min(1, "Descrição obrigatória"),
  tipo: z.string().min(1, "Tipo obrigatório"),
  incidencia: z.string().min(1, "Incidência obrigatória")
});

export default function RubricaForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: any) => {
    await supabase.from("rubricas").insert(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <input {...register("codigo")} placeholder="Código" className="p-2 border w-full" />
      {typeof errors.codigo?.message === "string" && (
  <p className="text-red-600 text-sm">{errors.codigo.message}</p>
)}

      <input {...register("descricao")} placeholder="Descrição" className="p-2 border w-full" />
      {typeof errors.descricao?.message === "string" && (
  <p className="text-red-600 text-sm">{errors.descricao.message}</p>
)}

      <input {...register("tipo")} placeholder="Tipo de rubrica" className="p-2 border w-full" />
      {typeof errors.tipo?.message === "string" && (
  <p className="text-red-600 text-sm">{errors.tipo.message}</p>
)}

      <input {...register("incidencia")} placeholder="Incidência" className="p-2 border w-full" />
      {typeof errors.incidencia?.message === "string" && (
  <p className="text-red-600 text-sm">{errors.incidencia.message}</p>
)}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Rubrica</button>
    </form>
  );
}

