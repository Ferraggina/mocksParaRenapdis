import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import KpiCard from '../components/tablero/KpiCard.jsx';
import FiltrosBar from '../components/tablero/FiltrosBar.jsx';
import TablaExpedientes from '../components/tablero/TablaExpedientes.jsx';
import { listarExpedientes, obtenerMetricas, obtenerResponsables } from '@shared/services/expedientes.service.js';
import { KPI_ESTADOS } from '@shared/domain/estados.js';

const FILTROS_INICIALES = { busqueda: '', estado: '', provincia: '', responsable: '' };

function IcoHome() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginBottom: 1 }}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

export default function Tablero() {
  const navigate = useNavigate();
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
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: '#374151' }}><IcoHome /></span>
        <span style={{ color: '#9CA3AF' }}>/</span>
        <span
          onClick={() => navigate('/')}
          style={{ color: '#374151', cursor: 'pointer', fontWeight: 500 }}
        >
          Inicio
        </span>
        <span style={{ color: '#9CA3AF' }}>/</span>
        <span style={{ color: '#242C4F', fontWeight: 600 }}>Trámites</span>
      </div>

      {/* Encabezado */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>
          Trámites
        </h1>
        <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>
          Seguimiento de expedientes de habilitación de plataformas digitales de salud.
        </p>
      </div>

      {/* KPI bar */}
      <div style={{
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: 6,
        display: 'flex',
        marginBottom: 28,
        overflow: 'hidden',
      }}>
        <KpiCard
          isTotal
          count={loadingMetricas ? null : metricas?.total}
          activo={!filtros.estado}
          onClick={() => setFiltros((f) => ({ ...f, estado: '' }))}
          showDivider={false}
        />
        {KPI_ESTADOS.map((estado) => (
          <KpiCard
            key={estado}
            estado={estado}
            count={loadingMetricas ? null : (metricas?.[estado] ?? 0)}
            activo={filtros.estado === estado}
            onClick={() => handleFiltroKpi(estado)}
            showDivider
          />
        ))}
      </div>

      {/* Filtros */}
      <div style={{ marginBottom: 20 }}>
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
