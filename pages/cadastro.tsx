import { useState } from "react";
import { supabase } from "../lib/supabase";
import EmpresaForm from "../components/EmpresaForm";
import EstabelecimentoForm from "../components/EstabelecimentoForm";
import TrabalhadorForm from "../components/TrabalhadorForm";
import VinculoForm from "../components/VinculoForm";
import RubricaForm from "../components/RubricaForm";
import EventoFolhaForm from "../components/EventoFolhaForm";

export default function Cadastro() {
  return (
    <div className="p-4 space-y-10">
      <h1 className="text-2xl font-bold">Cadastro de Folha</h1>

      <EmpresaForm />
      <EstabelecimentoForm />
      <TrabalhadorForm />
      <VinculoForm />
      <RubricaForm />
      <EventoFolhaForm />
    </div>
  );
}
