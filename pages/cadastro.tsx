import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Cadastro() {
  return (
    <div className="p-4 space-y-12">
      <EmpresaForm />
      <TrabalhadorForm />
    </div>
  );
}

function EmpresaForm() {
  const [form, setForm] = useState({
    razao_social: "",
    cnpj: "",
    natureza_juridica: "",
    classificacao_tributaria: "",
    optante_pelo_simples: false,
    optante_pelo_mei: false,
    indicador_desoneracao: 0,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("empresas").insert([form]);
    if (error) alert("Erro: " + error.message);
    else alert("Empresa cadastrada!");
  };
  return (
    <section>
      <h2 className="text-lg font-bold mb-2">Cadastro de Empresa</h2>
      <form onSubmit={handleSubmit} className="grid gap-2">
        <input name="razao_social" placeholder="Razão Social" className="p-2 border" value={form.razao_social} onChange={handleChange} />
        <input name="cnpj" placeholder="CNPJ" className="p-2 border" value={form.cnpj} onChange={handleChange} />
        <input name="natureza_juridica" placeholder="Natureza Jurídica" className="p-2 border" value={form.natureza_juridica} onChange={handleChange} />
        <input name="classificacao_tributaria" placeholder="Classificação Tributária" className="p-2 border" value={form.classificacao_tributaria} onChange={handleChange} />
        <label><input type="checkbox" name="optante_pelo_simples" checked={form.optante_pelo_simples} onChange={handleChange} /> Simples Nacional</label>
        <label><input type="checkbox" name="optante_pelo_mei" checked={form.optante_pelo_mei} onChange={handleChange} /> MEI</label>
        <select name="indicador_desoneracao" className="p-2 border" value={form.indicador_desoneracao} onChange={handleChange}>
          <option value={0}>Não aplicável</option>
          <option value={1}>Empresa enquadrada</option>
          <option value={2}>Município enquadrado</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Empresa</button>
      </form>
    </section>
  );
}

function TrabalhadorForm() {
  const [form, setForm] = useState({
    cpf: "",
    nome: "",
    data_nascimento: "",
    sexo: "",
    endereco: "",
    pis_pasep: "",
    categoria: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("trabalhadores").insert([form]);
    if (error) alert("Erro: " + error.message);
    else alert("Trabalhador cadastrado!");
  };
  return (
    <section>
      <h2 className="text-lg font-bold mb-2">Cadastro de Trabalhador</h2>
      <form onSubmit={handleSubmit} className="grid gap-2">
        <input name="cpf" placeholder="CPF" className="p-2 border" value={form.cpf} onChange={handleChange} />
        <input name="nome" placeholder="Nome" className="p-2 border" value={form.nome} onChange={handleChange} />
        <input name="data_nascimento" type="date" className="p-2 border" value={form.data_nascimento} onChange={handleChange} />
        <input name="sexo" placeholder="Sexo" className="p-2 border" value={form.sexo} onChange={handleChange} />
        <input name="endereco" placeholder="Endereço" className="p-2 border" value={form.endereco} onChange={handleChange} />
        <input name="pis_pasep" placeholder="PIS/PASEP" className="p-2 border" value={form.pis_pasep} onChange={handleChange} />
        <input name="categoria" placeholder="Categoria" className="p-2 border" value={form.categoria} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Trabalhador</button>
      </form>
    </section>
  );
}
