import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/layout/Layout.jsx';
import Breadcrumb from '../components/layout/Breadcrumb.jsx';
import KpiCard from '../components/tablero/KpiCard.jsx';
import GraficoEstados from '../components/tablero/GraficoEstados.jsx';
import FiltrosBar from '../components/tablero/FiltrosBar.jsx';
import TablaExpedientes from '../components/tablero/TablaExpedientes.jsx';
import { listarExpedientes, obtenerMetricas, obtenerResponsables } from '@shared/services/expedientes.service.js';
import { KPI_ESTADOS } from '@shared/domain/estados.js';

const FILTROS_INICIALES = { busqueda: '', estado: '', provincia: '', responsable: '' };

function IconoExportar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

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
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'Tablero de seguimiento RENAPDIS' }]} />

      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '20px 0 20px' }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#242C4F', margin: '0 0 4px' }}>
              Tablero de seguimiento RENAPDIS
            </h1>
            <p style={{ fontSize: 13, color: '#9CA3AF', margin: 0 }}>
              Consulta y gestión administrativa de expedientes nacionales.
            </p>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 6, border: '1.5px solid #37BBED',
            background: '#fff', color: '#37BBED', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            <IconoExportar />
            Exportar reporte
          </button>
        </div>

        <div style={{
          background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB',
          padding: '16px 20px', display: 'flex', alignItems: 'stretch', gap: 0,
          marginBottom: 16, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
            <KpiCard
              isTotal
              count={loadingMetricas ? '—' : metricas?.total}
              activo={!filtros.estado}
              onClick={() => setFiltros((f) => ({ ...f, estado: '' }))}
            />
            {KPI_ESTADOS.map((estado) => (
              <KpiCard
                key={estado}
                estado={estado}
                count={loadingMetricas ? '—' : (metricas?.[estado] ?? 0)}
                activo={filtros.estado === estado}
                onClick={() => handleFiltroKpi(estado)}
              />
            ))}
          </div>

          <div style={{ borderLeft: '1px solid #F3F4F6', paddingLeft: 20, marginLeft: 8, display: 'flex', alignItems: 'center' }}>
            <GraficoEstados metricas={metricas} />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
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
      </div>
    </Layout>
  );
}
