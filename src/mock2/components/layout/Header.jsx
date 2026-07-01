import { useLocation, useNavigate } from 'react-router-dom';

function IcoUsuario() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const enTramites = location.pathname === '/' || location.pathname.startsWith('/expediente');

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
    }}>
      <div
        style={{ fontSize: 15, fontWeight: 700, letterSpacing: 0.1, cursor: 'pointer', whiteSpace: 'nowrap' }}
        onClick={() => navigate('/')}
      >
        Ministerio de Salud — RENAPDIS
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {[
          { label: 'Trámites', activo: enTramites, onClick: () => navigate('/') },
          { label: 'Reportes', activo: false, onClick: null },
        ].map(({ label, activo, onClick }) => (
          <button
            key={label}
            onClick={onClick || undefined}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: `2px solid ${activo ? '#fff' : 'transparent'}`,
              color: activo ? '#fff' : 'rgba(255,255,255,0.65)',
              fontSize: 13,
              fontWeight: activo ? 600 : 400,
              padding: '0 16px',
              height: 56,
              cursor: onClick ? 'pointer' : 'default',
              transition: 'color 0.12s',
              whiteSpace: 'nowrap',
            }}
            onMouseOver={(e) => { if (!activo) e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
            onMouseOut={(e) => { if (!activo) e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
          >
            {label}
          </button>
        ))}

        <div style={{
          marginLeft: 16,
          paddingLeft: 16,
          borderLeft: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: 'rgba(255,255,255,0.85)',
          fontSize: 13,
        }}>
          <IcoUsuario />
          <span style={{ fontWeight: 500 }}>Operador Administrativo</span>
        </div>
      </div>
    </header>
  );
}
