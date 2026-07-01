import { ESTADO_CONFIG } from '@shared/domain/estados.js';

export default function KpiCard({ estado, count, isTotal = false, activo, onClick }) {
  const config = estado ? ESTADO_CONFIG[estado] : null;
  const numColor = isTotal ? '#111827' : (config?.color ?? '#374151');

  return (
    <button
      onClick={onClick}
      aria-pressed={activo}
      style={{
        background: 'transparent',
        border: 'none',
        borderBottom: `2px solid ${activo ? (config?.color ?? '#111827') : 'transparent'}`,
        padding: '4px 20px 12px',
        cursor: 'pointer',
        textAlign: 'left',
        minWidth: 70,
        transition: 'border-color 0.15s',
      }}
    >
      <div style={{
        fontSize: 32,
        fontWeight: 700,
        color: numColor,
        lineHeight: 1.1,
        marginBottom: 4,
      }}>
        {typeof count === 'number' ? count.toLocaleString('es-AR') : (count ?? '—')}
      </div>
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        whiteSpace: 'nowrap',
      }}>
        {isTotal ? 'Total' : (config?.label ?? estado)}
      </div>
    </button>
  );
}
