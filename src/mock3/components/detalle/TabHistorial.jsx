const DOT_COLOR = {
  'Ingreso':                    '#9CA3AF',
  'Subsanación':                '#3B82F6',
  'Reingreso':                  '#3B82F6',
  'Envío de correo':            '#F59E0B',
  'Habilitación de subsanación':'#F59E0B',
  'Número de resolución':       '#10B981',
  'Guarda temporal':            '#6B7280',
};

const TIPO_LABEL = {
  'Ingreso':                    'Ingreso',
  'Reingreso':                  'Reingreso',
  'Envío de correo':            'Envío de correo',
  'Habilitación de subsanación':'Habilitación de subsanación',
  'Número de resolución':       'N° de resolución',
  'Guarda temporal':            'Guarda temporal',
  'Subsanación':                'Subsanación',
};

const HORAS = ['09:00', '10:32', '11:20', '13:15', '14:00', '15:45', '16:30', '08:45'];

function horaFake(iso, idx) {
  const seed = (iso?.charCodeAt(5) || 0) + idx;
  return HORAS[seed % HORAS.length];
}

function formatFechaCorta(iso, idx) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y} ${horaFake(iso, idx)}`;
}

function TipoBadge({ tipo }) {
  const color = DOT_COLOR[tipo] ?? '#6B7280';
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 4,
      fontSize: 11, fontWeight: 600,
      background: `${color}18`,
      color: color,
      border: `1px solid ${color}40`,
      whiteSpace: 'nowrap',
    }}>
      {TIPO_LABEL[tipo] ?? tipo}
    </span>
  );
}

function EstadoTag({ estado }) {
  if (!estado) return null;
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 4,
      fontSize: 11, fontWeight: 600,
      background: '#F3F4F6', color: '#374151',
      border: '1px solid #E5E7EB',
      whiteSpace: 'nowrap',
    }}>
      {estado}
    </span>
  );
}

function IcoArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', margin: '0 4px' }}>
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

export default function TabHistorial({ historial = [] }) {
  if (!historial.length) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: '#6B7280' }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>Sin movimientos registrados</div>
      </div>
    );
  }

  const ordenado = [...historial].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>
          Historial de movimientos
        </h2>
        <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
          Trazabilidad completa del expediente desde su ingreso inicial al sistema hasta su estado actual.
        </p>
      </div>

      <div style={{ position: 'relative', paddingLeft: 28 }}>
        {/* Línea vertical */}
        <div style={{
          position: 'absolute', left: 7, top: 14, bottom: 14,
          width: 2, background: '#E5E7EB', borderRadius: 1,
        }} />

        {ordenado.map((mov, idx) => {
          const color = DOT_COLOR[mov.tipoMovimiento] ?? '#9CA3AF';
          return (
            <div key={idx} style={{ position: 'relative', marginBottom: 16 }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: -28, top: 16,
                width: 16, height: 16, borderRadius: '50%',
                background: color,
                border: '2px solid #fff',
                boxShadow: `0 0 0 2px ${color}40`,
                zIndex: 1,
              }} />

              {/* Card */}
              <div style={{
                border: '1px solid #E5E7EB',
                borderRadius: 6,
                background: '#fff',
                overflow: 'hidden',
              }}>
                {/* Card header */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 16px', borderBottom: '1px solid #F3F4F6',
                  flexWrap: 'wrap', gap: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TipoBadge tipo={mov.tipoMovimiento} />
                    <EstadoTag estado={mov.estadoEnEseMomento} />
                    {mov.numeroResolucion && (
                      <span style={{
                        fontSize: 11, fontWeight: 600,
                        color: '#065F46', background: '#D1FAE5',
                        padding: '2px 8px', borderRadius: 4,
                        border: '1px solid #6EE7B7',
                      }}>
                        N° {mov.numeroResolucion}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9CA3AF', fontSize: 12 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {formatFechaCorta(mov.fecha, idx)}
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: '12px 16px' }}>
                  {(mov.usuarioOrigen || mov.usuarioDestino) && (
                    <div style={{ fontSize: 13, color: '#374151', marginBottom: mov.motivoPase ? 10 : 0 }}>
                      {mov.usuarioOrigen && (
                        <span>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', marginRight: 4 }}>De:</span>
                          <span style={{ color: '#37BBED', fontWeight: 600 }}>{mov.sectorOrigen || mov.usuarioOrigen}</span>
                        </span>
                      )}
                      {mov.usuarioOrigen && mov.usuarioDestino && (
                        <span style={{ color: '#9CA3AF' }}><IcoArrow /></span>
                      )}
                      {mov.usuarioDestino && (
                        <span>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', marginRight: 4 }}>A:</span>
                          <span style={{ color: '#37BBED', fontWeight: 600 }}>{mov.usuarioDestino}</span>
                        </span>
                      )}
                    </div>
                  )}

                  {mov.motivoPase && (
                    <p style={{
                      margin: 0, fontSize: 13, color: '#4B5563',
                      fontStyle: 'italic', lineHeight: 1.6,
                    }}>
                      {mov.tipoMovimiento === 'Envío de correo'
                        ? `Motivo: "${mov.motivoPase}"`
                        : mov.motivoPase
                      }
                    </p>
                  )}

                  {!mov.usuarioOrigen && !mov.usuarioDestino && !mov.motivoPase && (
                    <p style={{ margin: 0, fontSize: 13, color: '#6B7280' }}>
                      {mov.tipoMovimiento === 'Ingreso' && 'Apertura del expediente electrónico en plataforma TAD.'}
                      {mov.tipoMovimiento === 'Habilitación de subsanación' && 'El sistema habilitó el módulo de carga para el solicitante.'}
                      {mov.tipoMovimiento === 'Guarda temporal' && 'Expediente derivado a guarda temporal por vencimiento de plazos.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
