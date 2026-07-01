import { useLocation, useNavigate } from 'react-router-dom';

function IcoBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  );
}

function IcoGear() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  );
}

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const enDashboard = location.pathname === '/' || location.pathname.startsWith('/expediente');

  const navItems = [
    { label: 'Dashboard', activo: enDashboard, onClick: () => navigate('/') },
    { label: 'Reportes', activo: false, onClick: null },
  ];

  return (
    <header style={{
      background: '#242C4F',
      color: '#fff',
      padding: '0 32px',
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 200,
      gap: 32,
    }}>
      <div
        style={{ fontSize: 15, fontWeight: 700, letterSpacing: 0.1, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
        onClick={() => navigate('/')}
      >
        Ministerio de Salud — RENAPDIS
      </div>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {navItems.map(({ label, activo, onClick }) => (
          <button
            key={label}
            onClick={onClick || undefined}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: `2px solid ${activo ? '#fff' : 'transparent'}`,
              color: activo ? '#fff' : 'rgba(255,255,255,0.6)',
              fontSize: 14,
              fontWeight: activo ? 600 : 400,
              padding: '0 18px',
              height: 56,
              cursor: onClick ? 'pointer' : 'default',
              transition: 'color 0.12s',
              whiteSpace: 'nowrap',
            }}
            onMouseOver={(e) => { if (!activo) e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
            onMouseOut={(e) => { if (!activo) e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            {label}
          </button>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 'auto' }}>
        <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: 4, lineHeight: 0 }}>
          <IcoBell />
        </button>
        <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: 4, lineHeight: 0 }}>
          <IcoGear />
        </button>

        <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.2)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: '#37BBED',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            MG
          </div>
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>
              María González
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Cerrar Sesión
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
