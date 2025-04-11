import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cnpj: z.string().min(18, "CNPJ inválido")
});

export default function EmpresaForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: any) => {
    await supabase.from("empresas").insert(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <input {...register("nome")} placeholder="Nome da empresa" className="p-2 border w-full" />
      {typeof errors.nome?.message === "string" && (<p className="text-red-600 text-sm">{errors.nome.message}</p>)}

      <InputMask mask="99.999.999/9999-99" {...register("cnpj")}>
        {(inputProps) => <input {...inputProps} placeholder="CNPJ" className="p-2 border w-full" />}
      </InputMask>
      {typeof errors.cnpj?.message === "string" && (<p className="text-red-600 text-sm">{errors.cnpj.message}</p>)}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Empresa</button>
    </form>
  );
}

