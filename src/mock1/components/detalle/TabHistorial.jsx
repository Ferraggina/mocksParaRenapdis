import EstadoBadge from '../ui/EstadoBadge.jsx';

const HORAS_FAKE = ['09:12', '10:30', '11:20', '13:15', '14:00', '15:45', '08:45', '16:30'];
function horaFake(fecha, idx) {
  const seed = (fecha.charCodeAt(5) || 0) + idx;
  return HORAS_FAKE[seed % HORAS_FAKE.length];
}

function formatFechaHora(fecha, idx) {
  if (!fecha) return '—';
  const [y, m, d] = fecha.split('-');
  return `${d}/${m}/${y} - ${horaFake(fecha, idx)} hs`;
}

const CONFIG_MOVIMIENTO = {
  'Ingreso':                    { bg: '#F3F4F6', color: '#6B7280',   icon: 'flecha-abajo' },
  'Reingreso':                  { bg: '#DBEAFE', color: '#1D4ED8',   icon: 'reingreso'    },
  'Envío de correo':            { bg: '#EDE9FE', color: '#7C3AED',   icon: 'correo'       },
  'Habilitación de subsanación':{ bg: '#FEF3C7', color: '#D97706',   icon: 'alerta'       },
  'Número de resolución':       { bg: '#D1FAE5', color: '#065F46',   icon: 'documento'    },
  'Guarda temporal':            { bg: '#E5E7EB', color: '#374151',   icon: 'archivo'      },
};
const DEFAULT_CONFIG = { bg: '#E0F2FE', color: '#0369A1', icon: 'pase' };

function IcoMovimiento({ tipo }) {
  const { color, icon } = CONFIG_MOVIMIENTO[tipo] ?? DEFAULT_CONFIG;
  const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (icon) {
    case 'flecha-abajo':
      return <svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>;
    case 'reingreso':
      return <svg {...p}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>;
    case 'correo':
      return <svg {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
    case 'alerta':
      return <svg {...p}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
    case 'documento':
      return <svg {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
    case 'archivo':
      return <svg {...p}><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>;
    default:
      return <svg {...p}><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/></svg>;
  }
}

function EventoHistorial({ mov, idx, esUltimo }) {
  const cfg = CONFIG_MOVIMIENTO[mov.tipoMovimiento] ?? DEFAULT_CONFIG;

  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: esUltimo ? 0 : 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10, flexShrink: 0,
          background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IcoMovimiento tipo={mov.tipoMovimiento} />
        </div>
        {!esUltimo && (
          <div style={{ width: 2, flex: 1, background: '#E5E7EB', marginTop: 4 }} />
        )}
      </div>

      <div style={{
        flex: 1, background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB',
        padding: '14px 18px', marginBottom: esUltimo ? 0 : 4,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap', gap: 6 }}>
          <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 500 }}>
            {formatFechaHora(mov.fecha, idx)}
          </span>
          <EstadoBadge estado={mov.estadoEnEseMomento} />
        </div>

        <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 12 }}>
          {mov.tipoMovimiento}
          {mov.numeroResolucion && (
            <span style={{
              marginLeft: 10, fontSize: 12, fontWeight: 600, color: '#065F46',
              background: '#D1FAE5', padding: '2px 8px', borderRadius: 4,
              border: '1px solid #6EE7B7', display: 'inline-flex', alignItems: 'center',
            }}>
              N° {mov.numeroResolucion}
            </span>
          )}
        </div>

        {(mov.usuarioOrigen || mov.usuarioDestino) && (
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
            background: '#F9FAFB', borderRadius: 6, border: '1px solid #E5E7EB',
            marginBottom: 12, overflow: 'hidden',
          }}>
            <div style={{ padding: '10px 14px', borderRight: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Origen:</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', lineHeight: 1.4 }}>
                {mov.usuarioOrigen}
                {mov.sectorOrigen && <span style={{ display: 'block', fontSize: 12, fontWeight: 400, color: '#6B7280' }}>({mov.sectorOrigen})</span>}
              </div>
            </div>
            <div style={{ padding: '10px 14px' }}>
              <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Destino:</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', lineHeight: 1.4 }}>
                {mov.usuarioDestino || <span style={{ color: '#D1D5DB' }}>—</span>}
                {mov.sectorDestino && <span style={{ display: 'block', fontSize: 12, fontWeight: 400, color: '#6B7280' }}>({mov.sectorDestino})</span>}
              </div>
            </div>
          </div>
        )}

        {mov.motivoPase && (
          <div>
            <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500, marginBottom: 5 }}>Motivo del pase:</div>
            <blockquote style={{
              margin: 0, paddingLeft: 14, borderLeft: '3px solid #37BBED',
              fontSize: 13, color: '#374151', fontStyle: 'italic', lineHeight: 1.6,
            }}>
              "{mov.motivoPase}"
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TabHistorial({ historial = [] }) {
  if (!historial.length) {
    return (
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: '60px 20px', textAlign: 'center', color: '#9CA3AF' }}>
        Sin movimientos registrados
      </div>
    );
  }

  const ordenado = [...historial].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: '24px 28px' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 4 }}>
          Línea de Tiempo del Trámite
        </div>
        <p style={{ margin: 0, fontSize: 13, color: '#9CA3AF' }}>
          Visualice todos los movimientos y pases realizados en el expediente de manera cronológica inversa.
        </p>
      </div>

      <div>
        {ordenado.map((mov, idx) => (
          <EventoHistorial key={idx} mov={mov} idx={idx} esUltimo={idx === ordenado.length - 1} />
        ))}
      </div>
    </div>
  );
}
