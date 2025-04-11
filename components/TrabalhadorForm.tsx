import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";

const schema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  cpf: z.string().min(11, "CPF obrigatório")
});

export default function TrabalhadorForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: any) => {
    await supabase.from("trabalhadores").insert(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <input {...register("nome")} placeholder="Nome do trabalhador" className="p-2 border w-full" />
      {typeof errors.nome?.message === "string" && (
        <p className="text-red-600 text-sm">{errors.nome.message}</p>
      )}

      <InputMask mask="999.999.999-99" {...register("cpf")}>
        {(inputProps) => <input {...inputProps} placeholder="CPF" className="p-2 border w-full" />}
      </InputMask>
      {typeof errors.cpf?.message === "string" && (
        <p className="text-red-600 text-sm">{errors.cpf.message}</p>
      )}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Trabalhador</button>
    </form>
  );
}
