import EstadoBadge from '../ui/EstadoBadge.jsx';

const HORAS = ['09:00', '10:32', '11:20', '13:15', '14:00', '15:45', '16:30', '08:45'];

function horaFake(fecha, idx) {
  const seed = (fecha.charCodeAt(5) || 0) + idx;
  return HORAS[seed % HORAS.length];
}

function formatFechaLarga(iso, idx) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${parseInt(d)} de ${meses[parseInt(m) - 1]}, ${y} — ${horaFake(iso, idx)} hs`;
}

const TIPO_ACCION = {
  'Ingreso': 'Caratulación de Expediente',
  'Reingreso': 'Reingreso de Documentación',
  'Envío de correo': 'Notificación por Correo Electrónico',
  'Habilitación de subsanación': 'Habilitación de Subsanación',
  'Número de resolución': 'Emisión de Número de Resolución',
  'Guarda temporal': 'Pase a Guarda Temporal',
};

export default function TabHistorial({ historial = [] }) {
  if (!historial.length) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: '#6B7280' }}>
        Sin movimientos registrados
      </div>
    );
  }

  const ordenado = [...historial].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 24px' }}>
        Actuaciones del Expediente
      </h2>

      {ordenado.map((mov, idx) => (
        <div key={idx}>
          <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8, fontWeight: 500 }}>
            {formatFechaLarga(mov.fecha, idx)}
          </div>

          <div style={{
            border: '1px solid #E5E7EB',
            borderRadius: 6,
            padding: '16px 20px',
            marginBottom: 20,
            background: '#fff',
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 16 }}>
              {TIPO_ACCION[mov.tipoMovimiento] || mov.tipoMovimiento}
              {mov.numeroResolucion && (
                <span style={{
                  marginLeft: 10, fontSize: 12, fontWeight: 600,
                  color: '#065F46', background: '#D1FAE5',
                  padding: '2px 8px', borderRadius: 4, border: '1px solid #6EE7B7',
                }}>
                  N° {mov.numeroResolucion}
                </span>
              )}
            </div>

            {(mov.usuarioOrigen || mov.usuarioDestino) && (
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                border: '1px solid #E5E7EB', borderRadius: 4,
                overflow: 'hidden', marginBottom: 14,
              }}>
                <div style={{ padding: '10px 14px', borderRight: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>ORIGEN</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
                    {mov.usuarioOrigen || '—'}
                    {mov.sectorOrigen && (
                      <div style={{ fontSize: 12, fontWeight: 400, color: '#6B7280' }}>({mov.sectorOrigen})</div>
                    )}
                  </div>
                </div>
                <div style={{ padding: '10px 14px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>DESTINO</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
                    {mov.usuarioDestino || '—'}
                    {mov.sectorDestino && (
                      <div style={{ fontSize: 12, fontWeight: 400, color: '#6B7280' }}>({mov.sectorDestino})</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {mov.motivoPase && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                  MOTIVO DEL PASE
                </div>
                <p style={{
                  margin: 0, fontSize: 13, color: '#374151',
                  fontStyle: 'italic', lineHeight: 1.6,
                }}>
                  "{mov.motivoPase}"
                </p>
              </div>
            )}

            <div>
              <EstadoBadge estado={mov.estadoEnEseMomento} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
