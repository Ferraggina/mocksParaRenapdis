import { ESTADO_CONFIG } from '@shared/domain/estados.js';

export default function KpiCard({ estado, count, isTotal = false, activo, onClick }) {
  const config = estado ? ESTADO_CONFIG[estado] : null;
  const valorColor = isTotal ? '#374151' : (config?.color ?? '#374151');

  return (
    <button
      onClick={onClick}
      aria-pressed={activo}
      style={{
        background: 'transparent',
        border: 'none',
        borderBottom: `3px solid ${activo ? (config?.color ?? '#242C4F') : 'transparent'}`,
        padding: '8px 16px 12px',
        cursor: 'pointer',
        textAlign: 'left',
        minWidth: 80,
        flex: '1 1 80px',
        transition: 'border-color 0.15s',
      }}
    >
      <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 6, whiteSpace: 'nowrap' }}>
        {isTotal ? 'Total' : (config?.label ?? estado)}
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: valorColor, lineHeight: 1 }}>
        {typeof count === 'number' ? count.toLocaleString('es-AR') : count}
      </div>
    </button>
  );
}
