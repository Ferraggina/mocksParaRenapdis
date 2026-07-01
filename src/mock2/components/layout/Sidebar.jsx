import { NavLink } from 'react-router-dom';

function IcoHome() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function IcoExpedientes() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
}
function IcoReportes() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}
function IcoEstadisticas() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 118 2.83"/><path d="M22 12A10 10 0 0012 2v10z"/></svg>;
}
function IcoAuditoria() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
function IcoAjustes() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
}
function IcoSalir() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
}
function IcoMas() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
}

function NavItem({ Icon, label, to, end }) {
  if (to) {
    return (
      <NavLink
        to={to}
        end={end !== false}
        style={({ isActive }) => ({
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '9px 14px', borderRadius: 7, fontSize: 13,
          fontWeight: isActive ? 600 : 500, textDecoration: 'none',
          color: isActive ? '#0E7490' : '#6B7280',
          background: isActive ? '#ECFEFF' : 'transparent',
          margin: '1px 0', transition: 'background 0.12s, color 0.12s',
        })}
      >
        {({ isActive }) => (
          <>
            <span style={{ color: isActive ? '#0E7490' : '#9CA3AF', flexShrink: 0, display: 'flex' }}>
              <Icon />
            </span>
            {label}
          </>
        )}
      </NavLink>
    );
  }
  return (
    <button
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 14px', borderRadius: 7, fontSize: 13,
        fontWeight: 500, color: '#6B7280', background: 'transparent',
        border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
        margin: '1px 0', transition: 'background 0.12s, color 0.12s',
      }}
      onMouseOver={(e) => { e.currentTarget.style.background = '#F9FAFB'; e.currentTarget.style.color = '#374151'; }}
      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280'; }}
    >
      <span style={{ color: '#9CA3AF', flexShrink: 0, display: 'flex' }}><Icon /></span>
      {label}
    </button>
  );
}

export default function Sidebar() {
  return (
    <nav style={{
      width: 220, minWidth: 220, background: '#fff',
      borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 60, height: 'calc(100vh - 60px)', overflowY: 'auto',
    }}>
      <div style={{ padding: '18px 16px 16px', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: 'linear-gradient(135deg, #242C4F 60%, #37BBED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>Gestión Central</div>
            <div style={{ fontSize: 11, color: '#9CA3AF' }}>Sistema de Salud</div>
          </div>
        </div>

        <button
          title="No disponible en Etapa 1 (solo lectura)"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            width: '100%', marginTop: 14, padding: '9px 12px',
            background: '#37BBED', color: '#fff', border: 'none', borderRadius: 7,
            fontSize: 13, fontWeight: 600, cursor: 'not-allowed', opacity: 0.85,
          }}
        >
          <IcoMas /> Nuevo Expediente
        </button>
      </div>

      <div style={{ flex: 1, padding: '10px 8px' }}>
        <NavItem Icon={IcoHome} label="Inicio" />
        <NavItem Icon={IcoExpedientes} label="Expedientes" to="/" end={false} />
        <NavItem Icon={IcoReportes} label="Reportes" />
        <NavItem Icon={IcoEstadisticas} label="Estadísticas" />
        <NavItem Icon={IcoAuditoria} label="Auditoría" />
      </div>

      <div style={{ padding: '8px 8px 12px', borderTop: '1px solid #F3F4F6' }}>
        <NavItem Icon={IcoAjustes} label="Ajustes" />
        <button
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 14px', borderRadius: 7, fontSize: 13,
            fontWeight: 500, color: '#6B7280', background: 'transparent',
            border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
            transition: 'background 0.12s, color 0.12s',
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.color = '#DC2626'; e.currentTarget.querySelector('span').style.color = '#DC2626'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280'; e.currentTarget.querySelector('span').style.color = '#9CA3AF'; }}
        >
          <span style={{ color: '#9CA3AF', flexShrink: 0, display: 'flex' }}><IcoSalir /></span>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
