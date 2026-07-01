import { useLocation } from 'react-router-dom';

function IcoCampana() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  );
}
function IcoAyuda() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'Dashboard', path: null },
  { label: 'Expedientes', path: '/' },
  { label: 'Reportes', path: null },
  { label: 'Configuración', path: null },
];

export default function Header() {
  const location = useLocation();
  const esExpedientes = location.pathname === '/' || location.pathname.startsWith('/expediente');

  return (
    <header style={{
      background: '#242C4F', color: '#fff',
      padding: '0 24px', height: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 200,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 0.2, whiteSpace: 'nowrap' }}>
          Ministerio de Salud
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV_LINKS.map(({ label, path }) => {
            const activo = path ? (label === 'Expedientes' ? esExpedientes : false) : false;
            return (
              <button
                key={label}
                style={{
                  background: 'transparent', border: 'none', cursor: path ? 'pointer' : 'default',
                  color: activo ? '#37BBED' : 'rgba(255,255,255,0.7)',
                  fontSize: 13, fontWeight: activo ? 600 : 400,
                  padding: '4px 12px', height: 60,
                  borderBottom: activo ? '2px solid #37BBED' : '2px solid transparent',
                  transition: 'color 0.12s, border-color 0.12s',
                }}
                onMouseOver={(e) => { if (!activo) e.currentTarget.style.color = 'rgba(255,255,255,0.95)'; }}
                onMouseOut={(e) => { if (!activo) e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              >
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {[IcoCampana, IcoAyuda].map((Ico, i) => (
          <button
            key={i}
            style={{
              background: 'transparent', border: 'none',
              color: 'rgba(255,255,255,0.75)', cursor: 'pointer',
              padding: '6px 8px', borderRadius: 6,
              display: 'flex', alignItems: 'center', transition: 'background 0.12s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <Ico />
          </button>
        ))}

        <div style={{
          marginLeft: 8, paddingLeft: 14,
          borderLeft: '1px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Operador de Gestión</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>GBA — Región Sanitaria VIII</div>
          </div>
          <div style={{
            width: 34, height: 34, borderRadius: '50%', background: '#37BBED',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 13, color: '#fff', flexShrink: 0, letterSpacing: 0.5,
          }}>
            OG
          </div>
        </div>
      </div>
    </header>
  );
}
