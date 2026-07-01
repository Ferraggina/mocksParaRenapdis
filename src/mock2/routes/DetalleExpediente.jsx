import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import EstadoBadge from '../components/ui/EstadoBadge.jsx';
import TabAgenda from '../components/detalle/TabAgenda.jsx';
import TabRecetario from '../components/detalle/TabRecetario.jsx';
import TabHistorial from '../components/detalle/TabHistorial.jsx';
import TabObservaciones from '../components/detalle/TabObservaciones.jsx';
import { obtenerExpediente } from '@shared/services/expedientes.service.js';

function formatFecha(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

const TABS = [
  { id: 'agenda',        label: 'Agenda' },
  { id: 'recetario',     label: 'Recetarios / Repositorios' },
  { id: 'historial',     label: 'Historial' },
  { id: 'observaciones', label: 'Observaciones' },
];

export default function DetalleExpediente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expediente, setExpediente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabActiva, setTabActiva] = useState('agenda');

  useEffect(() => {
    setLoading(true);
    setError(null);
    setExpediente(null);
    obtenerExpediente(id)
      .then(setExpediente)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
          <div style={{ textAlign: 'center', color: '#9CA3AF' }}>
            <div style={{
              width: 32, height: 32, border: '2px solid #E5E7EB', borderTop: '2px solid #242C4F',
              borderRadius: '50%', margin: '0 auto 14px', animation: 'spin 0.8s linear infinite',
            }} />
            <div style={{ fontSize: 14 }}>Cargando expediente…</div>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </Layout>
    );
  }

  if (error || !expediente) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6B7280' }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Expediente no encontrado</div>
          <button onClick={() => navigate('/')} style={{ color: '#37BBED', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
            ← Volver a Trámites
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>
        <span
          onClick={() => navigate('/')}
          style={{ color: '#37BBED', cursor: 'pointer', fontWeight: 500 }}
        >
          Trámites
        </span>
        <span style={{ margin: '0 6px' }}>›</span>
        <span>Expediente</span>
      </div>

      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <h1 style={{
          fontSize: 28, fontWeight: 700, color: '#111827', margin: 0,
          fontFamily: '"Courier New", monospace', letterSpacing: 0.3,
        }}>
          {expediente.expediente}
        </h1>
        <EstadoBadge estado={expediente.estado} />
      </div>
      <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>
        {expediente.nombreEntidad}
      </div>
      <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 20 }}>
        Iniciado: {formatFecha(expediente.fechaIngreso)}
      </div>

      {/* Banner GDE */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px', background: '#EFF6FF',
        borderLeft: '4px solid #3B82F6', borderRadius: '0 4px 4px 0',
        marginBottom: 28,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span style={{ fontSize: 13, color: '#1D4ED8' }}>Datos recuperados de GDE (solo lectura)</span>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #E5E7EB', marginBottom: 28 }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {TABS.map(({ id: tabId, label }) => {
            const activa = tabActiva === tabId;
            return (
              <button
                key={tabId}
                onClick={() => setTabActiva(tabId)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderBottom: `2px solid ${activa ? '#111827' : 'transparent'}`,
                  background: 'transparent',
                  color: activa ? '#111827' : '#6B7280',
                  fontSize: 14,
                  fontWeight: activa ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  marginBottom: -1,
                  transition: 'color 0.12s',
                }}
                onMouseOver={(e) => { if (!activa) e.currentTarget.style.color = '#374151'; }}
                onMouseOut={(e) => { if (!activa) e.currentTarget.style.color = '#6B7280'; }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido de tab */}
      {tabActiva === 'agenda'        && <TabAgenda expediente={expediente} />}
      {tabActiva === 'recetario'     && <TabRecetario expediente={expediente} />}
      {tabActiva === 'historial'     && <TabHistorial historial={expediente.historial} />}
      {tabActiva === 'observaciones' && <TabObservaciones expediente={expediente} />}
    </Layout>
  );
}
