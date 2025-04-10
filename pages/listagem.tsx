import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { CSVLink } from "react-csv";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Listagem() {
  const [dados, setDados] = useState({
    empresas: [],
    estabelecimentos: [],
    trabalhadores: [],
    vinculos: [],
    eventos_folha: [],
    rubricas: []
  });
  const [filtro, setFiltro] = useState("");
  const [competencia, setCompetencia] = useState("");
  const [selectedTable, setSelectedTable] = useState("empresas");
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filtro, competencia]);

  const fetchData = async () => {
    const nomesTabelas = Object.keys(dados);
    const novasTabelas = {};
    for (let tabela of nomesTabelas) {
      let query = supabase.from(tabela).select("*");
      if (tabela === "eventos_folha" && competencia) {
        query = query.ilike("competencia", `%${competencia}%`);
      }
      if (filtro) {
        query = query.or(`descricao.ilike.%${filtro}%,nome.ilike.%${filtro}%,razao_social.ilike.%${filtro}%`);
      }
      const { data } = await query;
      novasTabelas[tabela] = data || [];
    }
    setDados(novasTabelas);
  };

  const handleDelete = async (table, idField, id) => {
    if (confirm("Deseja excluir este registro?")) {
      await supabase.from(table).delete().eq(idField, id);
      fetchData();
    }
  };

  const handleUpdate = async () => {
    if (!editando) return;
    const { id, ...valores } = editando;
    await supabase.from(selectedTable).update(valores).eq("id", id);
    setEditando(null);
    fetchData();
  };

  const chartData = {
    labels: Object.keys(dados),
    datasets: [
      {
        label: "Total de registros",
        data: Object.values(dados).map((d) => d.length),
        backgroundColor: "#2563eb"
      }
    ]
  };

  const gerarXML = (table) => {
    const registros = dados[table];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<registros>
${registros.map((r) => `  <registro>
    ${Object.entries(r).map(([k,v]) => `<${k}>${v}</${k}>`).join("\n    ")}
  </registro>`).join("\n")}
</registros>`;
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${table}.xml`;
    link.click();
  };

  return (
    <div className="p-4 space-y-10">
      <h1 className="text-2xl font-bold">Listagem Geral</h1>

      <Bar data={chartData} className="max-w-2xl" />

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar geral"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="p-2 border rounded w-full md:w-96"
        />
        <input
          type="month"
          value={competencia}
          onChange={(e) => setCompetencia(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="p-2 border rounded"
        >
          {Object.keys(dados).map((key) => (
            <option key={key} value={key}>{key.replace("_", " ")}</option>
          ))}
        </select>
        {dados[selectedTable].length > 0 && (
          <>
            <CSVLink
              data={dados[selectedTable]}
              filename={`${selectedTable}.csv`}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >Exportar CSV</CSVLink>
            <button
              onClick={() => gerarXML(selectedTable)}
              className="bg-amber-500 text-white px-4 py-2 rounded"
            >Exportar XML</button>
          </>
        )}
      </div>

      {Object.entries(dados).map(([key, data]) => (
        <Section
          key={key}
          title={key.replace("_", " ")}
          data={data}
          idField="id"
          table={key}
          setEditando={setEditando}
          handleDelete={handleDelete}
        />
      ))}

      {editando && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-xl">
            <h2 className="text-lg font-bold mb-2">Editar Registro</h2>
            <form className="grid gap-2">
              {Object.entries(editando).map(([key, value]) => (
                key !== "id" && (
                  <input
                    key={key}
                    name={key}
                    value={value || ""}
                    placeholder={key}
                    onChange={(e) => setEditando({ ...editando, [key]: e.target.value })}
                    className="p-2 border"
                  />
                )
              ))}
            </form>
            <div className="mt-4 flex gap-2 justify-end">
              <button onClick={() => setEditando(null)} className="text-gray-600">Cancelar</button>
              <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-1 rounded">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, data, table, idField, setEditando, handleDelete }) {
  if (!data.length) return null;
  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="text-left px-2 py-1 border-b">{key}</th>
              ))}
              <th className="px-2 py-1 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-t">
                {Object.entries(row).map(([key, value]) => (
                  <td key={key} className="px-2 py-1 border-b">{String(value)}</td>
                ))}
                <td className="px-2 py-1 border-b space-x-2">
                  <button onClick={() => setEditando(row)} className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => handleDelete(table, idField, row[idField])} className="text-red-600 hover:underline">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
