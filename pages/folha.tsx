'use client';
import { useState, useEffect } from 'react';

interface Empresa {
  id: number;
  razao_social: string;
}

interface EventoEsocial {
  id: number;
  tipo_evento: string;
  referencia: string;
  status: string;
  data_geracao: string;
}

export default function FolhaPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [idEmpresa, setIdEmpresa] = useState<number | null>(null);
  const [referencia, setReferencia] = useState('');
  const [eventos, setEventos] = useState<EventoEsocial[]>([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    fetch('/api/empresas') // você precisa criar essa rota se ainda não tiver
      .then(res => res.json())
      .then(data => setEmpresas(data));
  }, []);

  async function gerarEventos() {
    if (!idEmpresa || !referencia) return alert('Selecione a empresa e a referência');
    setCarregando(true);
    await fetch('/api/folha/gerar-eventos', {
      method: 'POST',
      body: JSON.stringify({ id_empresa: idEmpresa, referencia }),
      headers: { 'Content-Type': 'application/json' }
    });
    await carregarEventos(); // atualiza a tabela
    setCarregando(false);
  }

  async function carregarEventos() {
    const res = await fetch(`/api/eventos?id_empresa=${idEmpresa}&referencia=${referencia}`);
    const data = await res.json();
    setEventos(data);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Geração de Eventos do eSocial</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="border rounded p-2"
          value={idEmpresa ?? ''}
          onChange={e => setIdEmpresa(Number(e.target.value))}
        >
          <option value="">Selecione a empresa</option>
          {empresas.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.razao_social}</option>
          ))}
        </select>

        <input
          type="month"
          className="border rounded p-2"
          value={referencia}
          onChange={e => setReferencia(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:bg-gray-400"
          onClick={gerarEventos}
          disabled={carregando}
        >
          {carregando ? 'Gerando...' : 'Gerar eventos'}
        </button>
      </div>

      <table className="min-w-full border mt-6 text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Referência</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Data Geração</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map(ev => (
            <tr key={ev.id}>
              <td className="p-2 border">{ev.id}</td>
              <td className="p-2 border">{ev.tipo_evento}</td>
              <td className="p-2 border">{ev.referencia}</td>
              <td className="p-2 border">{ev.status}</td>
              <td className="p-2 border">{new Date(ev.data_geracao).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
