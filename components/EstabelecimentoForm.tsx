import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";

const schema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
  cnpj: z.string().min(18, "CNPJ inválido"),
  cep: z.string().min(9, "CEP inválido")
});

export default function EstabelecimentoForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: any) => {
    await supabase.from("estabelecimentos").insert(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <input {...register("descricao")} placeholder="Descrição" className="p-2 border w-full" />
      {errors.descricao && <p className="text-red-600 text-sm">{errors.descricao.message}</p>}

      <InputMask mask="99.999.999/9999-99" {...register("cnpj")}>
        {(inputProps) => <input {...inputProps} placeholder="CNPJ" className="p-2 border w-full" />}
      </InputMask>
      {errors.cnpj && <p className="text-red-600 text-sm">{errors.cnpj.message}</p>}

      <InputMask mask="99999-999" {...register("cep")}>
        {(inputProps) => <input {...inputProps} placeholder="CEP" className="p-2 border w-full" />}
      </InputMask>
      {errors.cep && <p className="text-red-600 text-sm">{errors.cep.message}</p>}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Estabelecimento</button>
    </form>
  );
}

