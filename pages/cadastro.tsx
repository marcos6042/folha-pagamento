import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Cadastro() {
  return (
    <div className="p-4 space-y-12">
      <EmpresaForm />
      <EstabelecimentoForm />
      <TrabalhadorForm />
      <VinculoForm />
      <RubricaForm />
      <EventoFolhaForm />
    </div>
  );
}

function EmpresaForm() {
  const [form, setForm] = useState({
    razao_social: "",
    cnpj: "",
    natureza_juridica: "",
    classificacao_tributaria: "",
    optante_simples: false,
    optante_mei: false,
    indicador_desoneracao: ""
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
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="optante_simples" checked={form.optante_simples} onChange={handleChange} />
          <span>Optante pelo Simples Nacional</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="optante_mei" checked={form.optante_mei} onChange={handleChange} />
          <span>Optante pelo MEI</span>
        </label>
        <input name="indicador_desoneracao" placeholder="Indicador de Desoneração" className="p-2 border" value={form.indicador_desoneracao} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Empresa</button>
      </form>
    </section>
  );
}

function EstabelecimentoForm() {
  const [form, setForm] = useState({
    empresa_id: "",
    cnpj_estabelecimento: "",
    endereco: "",
    cnae_fiscal: "",
    fpas: "",
    cod_terceiros: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("estabelecimentos").insert([form]);
    if (error) alert("Erro: " + error.message);
    else alert("Estabelecimento cadastrado!");
  };

  return (
    <section>
      <h2 className="text-lg font-bold mb-2">Cadastro de Estabelecimento</h2>
      <form onSubmit={handleSubmit} className="grid gap-2">
        <input name="empresa_id" placeholder="ID da Empresa" className="p-2 border" value={form.empresa_id} onChange={handleChange} />
        <input name="cnpj_estabelecimento" placeholder="CNPJ Estabelecimento" className="p-2 border" value={form.cnpj_estabelecimento} onChange={handleChange} />
        <input name="endereco" placeholder="Endereço" className="p-2 border" value={form.endereco} onChange={handleChange} />
        <input name="cnae_fiscal" placeholder="CNAE Fiscal" className="p-2 border" value={form.cnae_fiscal} onChange={handleChange} />
        <input name="fpas" placeholder="FPAS" className="p-2 border" value={form.fpas} onChange={handleChange} />
        <input name="cod_terceiros" placeholder="Código Terceiros" className="p-2 border" value={form.cod_terceiros} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Estabelecimento</button>
      </form>
    </section>
  );
}

function TrabalhadorForm() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    pis: "",
    data_nascimento: "",
    sexo: "",
    estado_civil: "",
    nacionalidade: "",
    escolaridade: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
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
        <input name="nome" placeholder="Nome" className="p-2 border" value={form.nome} onChange={handleChange} />
        <input name="cpf" placeholder="CPF" className="p-2 border" value={form.cpf} onChange={handleChange} />
        <input name="pis" placeholder="PIS/PASEP" className="p-2 border" value={form.pis} onChange={handleChange} />
        <input name="data_nascimento" type="date" className="p-2 border" value={form.data_nascimento} onChange={handleChange} />
        <input name="sexo" placeholder="Sexo" className="p-2 border" value={form.sexo} onChange={handleChange} />
        <input name="estado_civil" placeholder="Estado Civil" className="p-2 border" value={form.estado_civil} onChange={handleChange} />
        <input name="nacionalidade" placeholder="Nacionalidade" className="p-2 border" value={form.nacionalidade} onChange={handleChange} />
        <input name="escolaridade" placeholder="Escolaridade" className="p-2 border" value={form.escolaridade} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Trabalhador</button>
      </form>
    </section>
  );
}

function VinculoForm() {
  const [form, setForm] = useState({
    trabalhador_id: "",
    empresa_id: "",
    matricula: "",
    data_admissao: "",
    tipo_contrato: "",
    cargo: "",
    salario: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("vinculos").insert([form]);
    if (error) alert("Erro: " + error.message);
    else alert("Vínculo cadastrado!");
  };

  return (
    <section>
      <h2 className="text-lg font-bold mb-2">Cadastro de Vínculo</h2>
      <form onSubmit={handleSubmit} className="grid gap-2">
        <input name="trabalhador_id" placeholder="ID do Trabalhador" className="p-2 border" value={form.trabalhador_id} onChange={handleChange} />
        <input name="empresa_id" placeholder="ID da Empresa" className="p-2 border" value={form.empresa_id} onChange={handleChange} />
        <input name="matricula" placeholder="Matrícula" className="p-2 border" value={form.matricula} onChange={handleChange} />
        <input name="data_admissao" type="date" className="p-2 border" value={form.data_admissao} onChange={handleChange} />
        <input name="tipo_contrato" placeholder="Tipo de Contrato" className="p-2 border" value={form.tipo_contrato} onChange={handleChange} />
        <input name="cargo" placeholder="Cargo" className="p-2 border" value={form.cargo} onChange={handleChange} />
        <input name="salario" placeholder="Salário Base" className="p-2 border" value={form.salario} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Vínculo</button>
      </form>
    </section>
  );
}

function EventoFolhaForm() {
  const [form, setForm] = useState({
    vinculo_id: "",
    rubrica_id: "",
    competencia: "",
    valor: "",
    quantidade: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("eventos_folha").insert([form]);
    if (error) alert("Erro: " + error.message);
    else alert("Evento de folha cadastrado!");
  };

  return (
    <section>
      <h2 className="text-lg font-bold mb-2">Cadastro de Evento de Folha</h2>
      <form onSubmit={handleSubmit} className="grid gap-2">
        <input name="vinculo_id" placeholder="ID do Vínculo" className="p-2 border" value={form.vinculo_id} onChange={handleChange} />
        <input name="rubrica_id" placeholder="ID da Rubrica" className="p-2 border" value={form.rubrica_id} onChange={handleChange} />
        <input name="competencia" placeholder="Competência (AAAA-MM)" className="p-2 border" value={form.competencia} onChange={handleChange} />
        <input name="valor" placeholder="Valor" className="p-2 border" value={form.valor} onChange={handleChange} />
        <input name="quantidade" placeholder="Quantidade" className="p-2 border" value={form.quantidade} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Evento</button>
      </form>
    </section>
  );
}

function RubricaForm() {
  const [form, setForm] = useState({
    codigo_rubrica: "",
    descricao: "",
    natureza_rubrica: "1000",
    tipo_rubrica: "",
    tipo_calculo: "1",
    incidencia_inss: "11",
    incidencia_irrf: "11",
    incidencia_fgts: "11",
    observacoes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("rubricas").insert([form]);
    if (error) alert("Erro: " + error.message);
    else alert("Rubrica cadastrada!");
  };

  const rubricasESocial = [
    { value: "1000", label: "1000 - Salário Base" },
    { value: "1001", label: "1001 - Salário Mensal" },
    { value: "1002", label: "1002 - Hora Extra 50%" },
    { value: "1003", label: "1003 - Hora Extra 100%" },
    { value: "1004", label: "1004 - Adicional Noturno" },
    { value: "1005", label: "1005 - Insalubridade" },
    { value: "1006", label: "1006 - Periculosidade" },
    { value: "1007", label: "1007 - Descanso Semanal Remunerado (DSR)" },
    { value: "1008", label: "1008 - Comissão" },
    { value: "1009", label: "1009 - Ajuda de Custo" },
    { value: "1010", label: "1010 - Bonificação" },
    { value: "1011", label: "1011 - Gratificação" },
    { value: "1012", label: "1012 - Participação nos Lucros" },
    { value: "1013", label: "1013 - Salário Família" },
    { value: "1014", label: "1014 - Adiantamento Salarial" },
    { value: "1015", label: "1015 - 13º Salário" },
    { value: "1016", label: "1016 - Férias Gozadas" },
    { value: "1017", label: "1017 - Abono de Férias" },
    { value: "1018", label: "1018 - Aviso Prévio Trabalhado" },
    { value: "1019", label: "1019 - Indenização por Rescisão" },
    { value: "1020", label: "1020 - Vale Transporte" },
    { value: "1021", label: "1021 - Vale Alimentação" },
    { value: "1022", label: "1022 - Vale Refeição" },
    { value: "1023", label: "1023 - Reembolso de Despesas" },
    { value: "1024", label: "1024 - Desconto de INSS" },
    { value: "1025", label: "1025 - Desconto de IRRF" },
    { value: "1026", label: "1026 - Desconto de FGTS" },
    { value: "9999", label: "9999 - Outras Rubricas" }
  ];

  return (
    <section>
      <h2 className="text-lg font-bold mb-2">Cadastro de Rubrica</h2>
      <form onSubmit={handleSubmit} className="grid gap-2">
        <input name="codigo_rubrica" placeholder="Código da Rubrica" className="p-2 border" value={form.codigo_rubrica} onChange={handleChange} />
        <input name="descricao" placeholder="Descrição da Rubrica" className="p-2 border" value={form.descricao} onChange={handleChange} />

        <label className="text-sm font-medium">Natureza da Rubrica (eSocial - Tabela 03)</label>
        <select name="natureza_rubrica" className="p-2 border" value={form.natureza_rubrica} onChange={handleChange}>
          {rubricasESocial.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>

        <label className="text-sm font-medium">Tipo da Rubrica</label>
        <input name="tipo_rubrica" placeholder="Ex: Provento, Desconto, Informativa" className="p-2 border" value={form.tipo_rubrica} onChange={handleChange} />

        <label className="text-sm font-medium">Tipo de Cálculo</label>
        <select name="tipo_calculo" className="p-2 border" value={form.tipo_calculo} onChange={handleChange}>
          <option value="1">1 - Valor fixo</option>
          <option value="2">2 - Percentual</option>
          <option value="3">3 - Quantidade</option>
        </select>

        <label className="text-sm font-medium">Incidência INSS</label>
        <select name="incidencia_inss" className="p-2 border" value={form.incidencia_inss} onChange={handleChange}>
          <option value="11">11 - Sim</option>
          <option value="12">12 - Não</option>
        </select>

        <label className="text-sm font-medium">Incidência IRRF</label>
        <select name="incidencia_irrf" className="p-2 border" value={form.incidencia_irrf} onChange={handleChange}>
          <option value="11">11 - Sim</option>
          <option value="12">12 - Não</option>
        </select>

        <label className="text-sm font-medium">Incidência FGTS</label>
        <select name="incidencia_fgts" className="p-2 border" value={form.incidencia_fgts} onChange={handleChange}>
          <option value="11">11 - Sim</option>
          <option value="12">12 - Não</option>
        </select>

        <textarea name="observacoes" placeholder="Observações adicionais sobre a rubrica" className="p-2 border" rows={3} value={form.observacoes} onChange={handleChange} />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Rubrica</button>
      </form>
    </section>
  );
}
