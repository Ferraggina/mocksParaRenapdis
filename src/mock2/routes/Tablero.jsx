import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/layout/Layout.jsx';
import KpiCard from '../components/tablero/KpiCard.jsx';
import FiltrosBar from '../components/tablero/FiltrosBar.jsx';
import TablaExpedientes from '../components/tablero/TablaExpedientes.jsx';
import { listarExpedientes, obtenerMetricas, obtenerResponsables } from '@shared/services/expedientes.service.js';
import { KPI_ESTADOS } from '@shared/domain/estados.js';

const FILTROS_INICIALES = { busqueda: '', estado: '', provincia: '', responsable: '' };

export default function Tablero() {
  const [expedientes, setExpedientes] = useState([]);
  const [metricas, setMetricas] = useState(null);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMetricas, setLoadingMetricas] = useState(true);

  const responsables = obtenerResponsables();

  const cargarMetricas = useCallback(async () => {
    setLoadingMetricas(true);
    const m = await obtenerMetricas();
    setMetricas(m);
    setLoadingMetricas(false);
  }, []);

  const cargarExpedientes = useCallback(async (f) => {
    setLoading(true);
    const data = await listarExpedientes(f);
    setExpedientes(data);
    setLoading(false);
    setPagina(1);
  }, []);

  useEffect(() => { cargarMetricas(); }, [cargarMetricas]);
  useEffect(() => { cargarExpedientes(filtros); }, [filtros, cargarExpedientes]);

  const handleFiltroKpi = (estado) => {
    setFiltros((f) => ({ ...f, estado: f.estado === estado ? '' : estado }));
  };

  return (
    <Layout>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>
          Trámites
        </h1>
        <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>
          Panel de gestión y seguimiento de expedientes del Registro Nacional de Plataformas Digitales de Salud.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', marginBottom: 4 }}>
        <KpiCard
          isTotal
          count={loadingMetricas ? null : metricas?.total}
          activo={!filtros.estado}
          onClick={() => setFiltros((f) => ({ ...f, estado: '' }))}
        />
        {KPI_ESTADOS.map((estado) => (
          <KpiCard
            key={estado}
            estado={estado}
            count={loadingMetricas ? null : (metricas?.[estado] ?? 0)}
            activo={filtros.estado === estado}
            onClick={() => handleFiltroKpi(estado)}
          />
        ))}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '8px 0 28px' }} />

      <div style={{ marginBottom: 24 }}>
        <FiltrosBar
          filtros={filtros}
          onChange={setFiltros}
          onLimpiar={() => setFiltros(FILTROS_INICIALES)}
          responsables={responsables}
        />
      </div>

      <TablaExpedientes
        expedientes={expedientes}
        loading={loading}
        pagina={pagina}
        onPaginaChange={setPagina}
      />
    </Layout>
  );
}
