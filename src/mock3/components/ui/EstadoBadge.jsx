import { ESTADO_CONFIG } from '@shared/domain/estados.js';

export default function EstadoBadge({ estado }) {
  const config = ESTADO_CONFIG[estado] ?? {
    label: estado,
    color: '#374151',
    bg: '#F9FAFB',
    border: '#D1D5DB',
  };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 8px',
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 0.5,
      color: config.color,
      background: config.bg,
      border: `1.5px solid ${config.border}`,
      whiteSpace: 'nowrap',
      textTransform: 'uppercase',
    }}>
      {config.label}
    </span>
  );
}
