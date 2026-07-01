import { ESTADO_CONFIG } from '@shared/domain/estados.js';

export default function EstadoBadge({ estado }) {
  const config = ESTADO_CONFIG[estado] ?? {
    label: estado,
    icono: '•',
    color: '#374151',
    bg: '#F9FAFB',
    border: '#D1D5DB',
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 10px',
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
        color: config.color,
        background: config.bg,
        border: `1px solid ${config.border}`,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: 11, lineHeight: 1 }}>{config.icono}</span>
      {config.label.toUpperCase()}
    </span>
  );
}
