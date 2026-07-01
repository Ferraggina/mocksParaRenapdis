import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import EstadoBadge from '../components/ui/EstadoBadge.jsx';
import TabAgenda from '../components/detalle/TabAgenda.jsx';
import TabPlataforma from '../components/detalle/TabPlataforma.jsx';
import TabHistorial from '../components/detalle/TabHistorial.jsx';
import { obtenerExpediente } from '@shared/services/expedientes.service.js';

function formatFecha(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function IcoHome() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginBottom: 1 }}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function IcoPrint() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9"/>
      <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
      <rect x="6" y="14" width="12" height="8"/>
    </svg>
  );
}

function IcoShare() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}

const TABS = [
  { id: 'agenda',     label: 'Agenda' },
  { id: 'plataforma', label: 'Plataforma' },
  { id: 'historial',  label: 'Historial' },
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 320 }}>
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
      <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: '#374151' }}><IcoHome /></span>
        <span style={{ color: '#9CA3AF' }}>/</span>
        <span
          onClick={() => navigate('/')}
          style={{ color: '#374151', cursor: 'pointer', fontWeight: 500 }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#37BBED')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#374151')}
        >
          Trámites
        </span>
        <span style={{ color: '#9CA3AF' }}>/</span>
        <span style={{ color: '#37BBED', fontWeight: 600 }}>
          {expediente.expediente}
        </span>
      </div>

      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <h1 style={{
              fontSize: 24, fontWeight: 700, color: '#111827', margin: 0,
              fontFamily: '"Courier New", monospace', letterSpacing: 0.3,
            }}>
              {expediente.expediente}
            </h1>
            <EstadoBadge estado={expediente.estado} />
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#374151', marginBottom: 4 }}>
            {expediente.nombreEntidad} — {expediente.tipo}
          </div>
          <div style={{ fontSize: 13, color: '#6B7280' }}>
            Responsable: <strong style={{ color: '#374151' }}>{expediente.responsable}</strong>
            {' · '}
            Ingresado: {formatFecha(expediente.fechaIngreso)}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexShrink: 0, paddingTop: 4 }}>
          <button title="No disponible en Etapa 1" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 16px', borderRadius: 4,
            border: '1px solid #D1D5DB', background: '#fff',
            color: '#374151', fontSize: 13, fontWeight: 500,
            cursor: 'not-allowed', opacity: 0.85, whiteSpace: 'nowrap',
          }}>
            <IcoPrint /> Imprimir
          </button>
          <button title="No disponible en Etapa 1" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 16px', borderRadius: 4,
            border: 'none', background: '#242C4F',
            color: '#fff', fontSize: 13, fontWeight: 600,
            cursor: 'not-allowed', opacity: 0.85, whiteSpace: 'nowrap',
          }}>
            <IcoShare /> Pase de Expediente
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #E5E7EB', margin: '24px 0 0' }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {TABS.map(({ id: tabId, label }) => {
            const activa = tabActiva === tabId;
            return (
              <button
                key={tabId}
                onClick={() => setTabActiva(tabId)}
                style={{
                  padding: '12px 20px',
                  border: 'none',
                  borderBottom: `2px solid ${activa ? '#37BBED' : 'transparent'}`,
                  background: 'transparent',
                  color: activa ? '#37BBED' : '#6B7280',
                  fontSize: 14,
                  fontWeight: activa ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  marginBottom: -1,
                  transition: 'color 0.12s, border-color 0.12s',
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

      {/* Banner GDE */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 10,
        padding: '14px 16px',
        background: '#EFF6FF',
        borderLeft: '4px solid #3B82F6',
        borderRadius: '0 4px 4px 0',
        margin: '24px 0 28px',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1D4ED8', marginBottom: 2 }}>
            Datos recuperados de GDE
          </div>
          <div style={{ fontSize: 12, color: '#3B82F6' }}>
            Este expediente se encuentra en estado de solo lectura. Los datos provienen del Gestor Documental Electrónico.
          </div>
        </div>
      </div>

      {/* Contenido de tab */}
      {tabActiva === 'agenda'     && <TabAgenda expediente={expediente} />}
      {tabActiva === 'plataforma' && <TabPlataforma expediente={expediente} />}
      {tabActiva === 'historial'  && <TabHistorial historial={expediente.historial} />}
    </Layout>
  );
}
