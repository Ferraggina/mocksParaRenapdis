import EstadoBadge from '../ui/EstadoBadge.jsx';

function IcoBuilding() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
    </svg>
  );
}
function IcoPerson() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
function IcoDoc() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}
function IcoDownload() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#37BBED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}
function IcoLock() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  );
}

function SeccionCard({ icon, titulo, children }) {
  return (
    <div style={{ border: '1px solid #E5E7EB', borderRadius: 6, marginBottom: 16, overflow: 'hidden' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '12px 16px', borderBottom: '1px solid #F3F4F6',
        background: '#FAFAFA',
      }}>
        {icon}
        <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: 1, textTransform: 'uppercase' }}>
          {titulo}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}

function FilaCard({ label, value, link }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '140px 1fr', gap: '0 16px',
      padding: '11px 16px', borderBottom: '1px solid #F9FAFB',
    }}>
      <span style={{ fontSize: 12, color: '#9CA3AF' }}>{label}</span>
      {link ? (
        <a href={link} style={{ fontSize: 13, color: '#37BBED', textDecoration: 'none' }}>{value || '—'}</a>
      ) : (
        <span style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{value || '—'}</span>
      )}
    </div>
  );
}

function MapPlaceholder({ provincia, departamento }) {
  return (
    <div style={{ borderRadius: 6, overflow: 'hidden', marginBottom: 0, position: 'relative' }}>
      <svg width="100%" height="170" style={{ display: 'block', background: '#0f1825' }}>
        <g stroke="#1e3a5f" strokeWidth="0.8" opacity="0.7">
          {[25, 50, 75, 100, 125, 150].map(y => (
            <line key={`h${y}`} x1="0" y1={y} x2="500" y2={y}/>
          ))}
          {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390].map(x => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200"/>
          ))}
        </g>
        <line x1="0" y1="75" x2="500" y2="75" stroke="#1e4a80" strokeWidth="2" opacity="0.8"/>
        <line x1="0" y1="110" x2="500" y2="110" stroke="#1e4a80" strokeWidth="2" opacity="0.8"/>
        <line x1="150" y1="0" x2="150" y2="200" stroke="#1e4a80" strokeWidth="2" opacity="0.8"/>
        <line x1="270" y1="0" x2="270" y2="200" stroke="#1e4a80" strokeWidth="2" opacity="0.8"/>
        <circle cx="210" cy="93" r="7" fill="#37BBED" opacity="0.9"/>
        <circle cx="210" cy="93" r="3" fill="#fff"/>
        <circle cx="210" cy="93" r="14" fill="#37BBED" opacity="0.15"/>
      </svg>
      <div style={{
        position: 'absolute', bottom: 10, left: 10,
        background: 'rgba(0,0,0,0.72)', color: '#fff',
        fontSize: 10, fontWeight: 700, padding: '3px 8px',
        borderRadius: 3, letterSpacing: 0.6,
      }}>
        {[departamento, provincia].filter(Boolean).join(', ').toUpperCase()}
      </div>
    </div>
  );
}

function AvatarIniciales(nombre) {
  if (!nombre) return 'OP';
  const partes = nombre.trim().split(' ');
  return (partes[0]?.[0] ?? '') + (partes[1]?.[0] ?? '');
}

export default function TabAgenda({ expediente }) {
  const iniciales = AvatarIniciales(expediente.responsable);

  const docFake = [
    { nombre: `IF-${new Date().getFullYear()}-${(expediente.id || '001').toString().padStart(6, '0')}-SST.pdf` },
    { nombre: 'PLIEGO-REQUISITOS.pdf' },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 24, alignItems: 'start' }}>

        {/* Columna izquierda */}
        <div>
          <SeccionCard icon={<IcoBuilding />} titulo="Entidad">
            <FilaCard label="Nombre" value={expediente.nombreEntidad} />
            <FilaCard label="CUIT" value={expediente.cuitEntidad} />
            <FilaCard label="Naturaleza" value={expediente.naturalezaEntidad} />
            <FilaCard label="Provincia" value={expediente.provincia} />
            <FilaCard label="Departamento" value={expediente.departamento} />
          </SeccionCard>

          <SeccionCard icon={<IcoPerson />} titulo="Contacto">
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
              padding: '11px 16px', borderBottom: '1px solid #F9FAFB',
            }}>
              <span style={{ fontSize: 13, color: '#111827', fontWeight: 600 }}>{expediente.contacto || '—'}</span>
              <span style={{ fontSize: 12, color: '#6B7280' }}>{expediente.funcionEnEntidad || '—'}</span>
            </div>
            <FilaCard label="CUIT/CUIL" value={expediente.cuitCuilContacto} />
            <FilaCard label="Función" value={expediente.funcionEnEntidad} />
            <FilaCard label="Teléfono" value={expediente.telefono} />
            <FilaCard
              label="Email"
              value={expediente.email}
              link={expediente.email ? `mailto:${expediente.email}` : null}
            />
            <FilaCard label="Referente técnico" value={expediente.referenteTecnico} />
          </SeccionCard>
        </div>

        {/* Columna derecha */}
        <div>
          <SeccionCard icon={<IcoDoc />} titulo="Gestión interna">
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #F9FAFB' }}>
              <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Responsable asignado
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#EFF6FF', color: '#3B82F6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>
                  {iniciales.toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{expediente.responsable}</div>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>Área de Inspecciones</div>
                </div>
              </div>
            </div>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #F9FAFB' }}>
              <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Estado actual
              </div>
              <EstadoBadge estado={expediente.estado} />
            </div>
            <div style={{ padding: '12px 16px' }}>
              <button title="No disponible en Etapa 1" style={{
                width: '100%', padding: '9px 16px',
                border: '1px solid #D1D5DB', borderRadius: 4,
                background: '#fff', color: '#374151',
                fontSize: 13, fontWeight: 500, cursor: 'not-allowed',
                opacity: 0.75,
              }}>
                Ver bitácora de cambios
              </button>
            </div>
          </SeccionCard>

          {/* Mapa */}
          <div style={{ border: '1px solid #E5E7EB', borderRadius: 6, overflow: 'hidden', marginBottom: 16 }}>
            <MapPlaceholder provincia={expediente.provincia} departamento={expediente.departamento} />
            <div style={{ padding: '10px 14px', background: '#fff' }}>
              <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
                Dirección declarada
              </div>
              <div style={{ fontSize: 12, color: '#374151' }}>
                {expediente.departamento && `${expediente.departamento}, `}{expediente.provincia}
              </div>
            </div>
          </div>

          {/* Adjuntos GDE */}
          <div style={{ border: '1px solid #E5E7EB', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 14px', borderBottom: '1px solid #F3F4F6', background: '#FAFAFA',
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: 1, textTransform: 'uppercase' }}>
                Adjuntos GDE
              </span>
              <span style={{
                background: '#EFF6FF', color: '#3B82F6',
                fontSize: 10, fontWeight: 700, padding: '2px 7px',
                borderRadius: 10, border: '1px solid #BFDBFE',
              }}>
                {docFake.length} DOCS
              </span>
            </div>
            {docFake.map((doc) => (
              <div key={doc.nombre} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', borderBottom: '1px solid #F9FAFB',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span style={{ fontSize: 12, color: '#374151' }}>{doc.nombre}</span>
                </div>
                <button title="No disponible en Etapa 1" style={{ background: 'none', border: 'none', cursor: 'not-allowed', opacity: 0.6, lineHeight: 0, padding: 2 }}>
                  <IcoDownload />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginTop: 32, paddingTop: 16, borderTop: '1px solid #E5E7EB',
        fontSize: 11, color: '#9CA3AF',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <IcoLock />
          <span>Información auditada por el Ministerio de Salud</span>
        </div>
        <span>
          Última actualización: {expediente.ultimaModificacion ? expediente.ultimaModificacion.replace(/-/g, '/') : '—'} — ID de Sesión: MS-{(expediente.id || '00000').toString().padStart(5, '0')}
        </span>
      </div>
    </div>
  );
}
