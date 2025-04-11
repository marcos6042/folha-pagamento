import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";

const schema = z.object({
  competencia: z.string().min(7, "Competência obrigatória"),
  trabalhador_id: z.string().min(1, "ID do trabalhador obrigatório"),
  rubrica_id: z.string().min(1, "ID da rubrica obrigatório"),
  valor: z.string().min(1, "Valor obrigatório")
});

export default function EventoFolhaForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: any) => {
    await supabase.from("eventos_folha").insert(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <InputMask mask="99/9999" {...register("competencia")}>
        {(inputProps) => <input {...inputProps} placeholder="Competência MM/AAAA" className="p-2 border w-full" />}
      </InputMask>
      {typeof errors.competencia?.message === "string" && (
        <p className="text-red-600 text-sm">{errors.competencia.message}</p>
      )}

      <input {...register("trabalhador_id")} placeholder="ID do trabalhador" className="p-2 border w-full" />
      {typeof errors.trabalhador_id?.message === "string" && (
        <p className="text-red-600 text-sm">{errors.trabalhador_id.message}</p>
      )}

      <input {...register("rubrica_id")} placeholder="ID da rubrica" className="p-2 border w-full" />
      {typeof errors.rubrica_id?.message === "string" && (
        <p className="text-red-600 text-sm">{errors.rubrica_id.message}</p>
      )}

      <input type="number" step="0.01" {...register("valor")} placeholder="Valor" className="p-2 border w-full" />
      {typeof errors.valor?.message === "string" && (
        <p className="text-red-600 text-sm">{errors.valor.message}</p>
      )}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Evento</button>
    </form>
  );
}
