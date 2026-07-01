import { ESTADO_CONFIG } from '@shared/domain/estados.js';

export default function KpiCard({ estado, count, isTotal = false, activo, onClick, showDivider = false }) {
  const config = estado ? ESTADO_CONFIG[estado] : null;
  const numColor = isTotal ? '#111827' : (config?.color ?? '#374151');

  return (
    <button
      onClick={onClick}
      aria-pressed={activo}
      style={{
        background: activo ? '#FAFAFA' : 'transparent',
        border: 'none',
        borderLeft: showDivider ? '1px solid #E5E7EB' : 'none',
        padding: '16px 24px 14px',
        cursor: 'pointer',
        textAlign: 'left',
        flex: '1 1 0',
        minWidth: 80,
        transition: 'background 0.12s',
        position: 'relative',
      }}
    >
      {activo && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 3, background: numColor, borderRadius: '2px 2px 0 0',
        }} />
      )}
      <div style={{
        fontSize: 28,
        fontWeight: 700,
        color: numColor,
        lineHeight: 1.1,
        marginBottom: 4,
      }}>
        {typeof count === 'number' ? count.toLocaleString('es-AR') : (
          <span style={{ display: 'inline-block', width: 40, height: 24, borderRadius: 4, background: '#F3F4F6', verticalAlign: 'middle' }} />
        )}
      </div>
      <div style={{
        fontSize: 10,
        fontWeight: 700,
        color: '#9CA3AF',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        whiteSpace: 'nowrap',
      }}>
        {isTotal ? 'Total' : (config?.label ?? estado)}
      </div>
    </button>
  );
}
