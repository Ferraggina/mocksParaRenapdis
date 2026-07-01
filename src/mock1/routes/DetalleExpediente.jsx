import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import Breadcrumb from '../components/layout/Breadcrumb.jsx';
import EstadoBadge from '../components/ui/EstadoBadge.jsx';
import TabAgenda from '../components/detalle/TabAgenda.jsx';
import TabRecetario from '../components/detalle/TabRecetario.jsx';
import TabHistorial from '../components/detalle/TabHistorial.jsx';
import TabDocumentacion from '../components/detalle/TabDocumentacion.jsx';
import { obtenerExpediente } from '@shared/services/expedientes.service.js';

function formatFecha(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function IcoAtras() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
}
function IcoDescargar() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function IcoCalendario() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function IcoPortapapeles() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>;
}
function IcoReloj() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
function IcoDocumento() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
}

const TABS = [
  { id: 'agenda',        label: 'Agenda',                   Ico: IcoCalendario   },
  { id: 'recetario',     label: 'Recetarios / Repositorios', Ico: IcoPortapapeles },
  { id: 'historial',     label: 'Historial',                Ico: IcoReloj        },
  { id: 'documentacion', label: 'Documentación',            Ico: IcoDocumento    },
];

const BREADCRUMB = [
  { label: 'Inicio', href: '/' },
  { label: 'Gestión de Trámites', href: '/' },
  { label: 'Detalle de Trámite' },
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
        <Breadcrumb items={BREADCRUMB} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 320 }}>
          <div style={{ textAlign: 'center', color: '#9CA3AF' }}>
            <div style={{
              width: 36, height: 36, border: '3px solid #E5E7EB', borderTop: '3px solid #37BBED',
              borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite',
            }} />
            <div style={{ fontSize: 14 }}>Cargando expediente…</div>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </Layout>
    );
  }

  if (error || !expediente) {
    return (
      <Layout>
        <Breadcrumb items={BREADCRUMB} />
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 40, marginBottom: 12, color: '#9CA3AF' }}>⚠</div>
          <div style={{ fontWeight: 600, color: '#374151', marginBottom: 8 }}>Expediente no encontrado</div>
          <button onClick={() => navigate('/')} style={{ color: '#37BBED', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
            ← Volver al tablero
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Breadcrumb items={BREADCRUMB} />

      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ margin: '16px 0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <button
                onClick={() => navigate('/')}
                aria-label="Volver al listado"
                style={{
                  background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 8,
                  width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#6B7280', flexShrink: 0, marginTop: 3,
                }}
              >
                <IcoAtras />
              </button>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: 20, fontWeight: 800, color: '#242C4F', margin: 0, fontFamily: '"Courier New", monospace', letterSpacing: 0.3 }}>
                    {expediente.expediente}
                  </h1>
                  <EstadoBadge estado={expediente.estado} />
                </div>
                <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 5 }}>
                  Expediente Electrónico &nbsp;•&nbsp; Creado el {formatFecha(expediente.fechaIngreso)}
                </div>
              </div>
            </div>

            <button style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 7,
              border: '1.5px solid #D1D5DB', background: '#fff',
              color: '#374151', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
              <IcoDescargar /> Descargar PDF
            </button>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', marginBottom: 16, overflow: 'hidden' }}>
          <div style={{ display: 'flex', padding: '0 8px', overflowX: 'auto', borderBottom: '1px solid #F3F4F6' }}>
            {TABS.map(({ id: tabId, label, Ico }) => {
              const activa = tabActiva === tabId;
              return (
                <button
                  key={tabId}
                  onClick={() => setTabActiva(tabId)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '13px 14px', border: 'none',
                    borderBottom: `2px solid ${activa ? '#37BBED' : 'transparent'}`,
                    background: 'transparent',
                    color: activa ? '#242C4F' : '#6B7280',
                    fontSize: 13, fontWeight: activa ? 600 : 400,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                >
                  <Ico />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 12px', background: '#F3F4F6', borderRadius: 20,
          fontSize: 11, color: '#6B7280', marginBottom: 20, border: '1px solid #E5E7EB',
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Datos recuperados de GDE (solo lectura)
        </div>

        {tabActiva === 'agenda'        && <TabAgenda expediente={expediente} />}
        {tabActiva === 'recetario'     && <TabRecetario expediente={expediente} />}
        {tabActiva === 'historial'     && <TabHistorial historial={expediente.historial} />}
        {tabActiva === 'documentacion' && <TabDocumentacion expediente={expediente} />}
      </div>
    </Layout>
  );
}
