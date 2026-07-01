function Seccion({ titulo, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 10px' }}>{titulo}</h2>
      <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 20px' }} />
      {children}
    </div>
  );
}

function FilaDato({ label, value, fullWidth, link }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: fullWidth ? '1fr' : '180px 1fr',
      gap: '0 24px',
      padding: '10px 0',
      borderBottom: '1px solid #F3F4F6',
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{label}</span>
      {link ? (
        <a href={link} style={{ fontSize: 13, color: '#37BBED', textDecoration: 'none' }}>{value || '—'}</a>
      ) : (
        <span style={{ fontSize: 13, color: '#6B7280' }}>{value || '—'}</span>
      )}
    </div>
  );
}

export default function TabAgenda({ expediente }) {
  return (
    <div>
      <Seccion titulo="Entidad">
        <FilaDato label="Nombre" value={expediente.nombreEntidad} />
        <FilaDato label="CUIT" value={expediente.cuitEntidad} />
        <FilaDato label="Naturaleza" value={expediente.naturalezaEntidad} />
        <FilaDato label="Provincia" value={expediente.provincia} />
        <FilaDato label="Departamento" value={expediente.departamento} />
      </Seccion>

      <Seccion titulo="Contacto">
        <FilaDato label="Nombre" value={expediente.contacto} />
        <FilaDato label="CUIT/CUIL" value={expediente.cuitCuilContacto} />
        <FilaDato label="Función" value={expediente.funcionEnEntidad} />
        <FilaDato label="Teléfono" value={expediente.telefono} />
        <FilaDato label="Email" value={expediente.email} link={expediente.email ? `mailto:${expediente.email}` : null} />
        <FilaDato label="Referente técnico" value={expediente.referenteTecnico} />
      </Seccion>

      <Seccion titulo="Gestión interna">
        <FilaDato label="Responsable del trámite" value={expediente.responsable} />
        <FilaDato label="Estado actual" value={expediente.estado} />
      </Seccion>

      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button title="No disponible en Etapa 1" style={{
          padding: '10px 20px', borderRadius: 4, border: 'none',
          background: '#37BBED', color: '#fff', fontSize: 13, fontWeight: 600,
          cursor: 'not-allowed', opacity: 0.85,
        }}>
          Descargar Resumen PDF
        </button>
        <button title="No disponible en Etapa 1" style={{
          padding: '10px 20px', borderRadius: 4,
          border: '1.5px solid #D1D5DB', background: '#fff',
          color: '#374151', fontSize: 13, fontWeight: 600,
          cursor: 'not-allowed', opacity: 0.85,
        }}>
          Ver Documentación Adjunta
        </button>
      </div>
    </div>
  );
}
