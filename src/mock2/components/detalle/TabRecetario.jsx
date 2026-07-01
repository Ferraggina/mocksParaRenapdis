import { TIPOS } from '@shared/domain/tipos.js';

const DJ_TEXTOS = {
  a: 'El sistema garantiza la inalterabilidad de los registros una vez firmados por el profesional de salud.',
  b: 'Los datos personales de los pacientes se encuentran encriptados según normativa vigente de Protección de Datos Personales.',
  c: 'Existe un mecanismo de contingencia offline para la emisión de recetas en caso de caída del servicio de red.',
  d: 'El repositorio permite la auditoría en tiempo real por parte de la autoridad de aplicación.',
  e: 'Se cumple con el estándar de interoperabilidad establecido en la Resolución 123/2023.',
  f: 'La firma electrónica/digital utilizada cumple con los requisitos de la Ley 25.506.',
  g: 'Se dispone de un log de eventos detallado para todas las acciones realizadas en el sistema.',
  h: 'El software ha sido sometido a pruebas de penetración y seguridad en el último año calendario.',
};

function Seccion({ titulo, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 10px' }}>{titulo}</h2>
      <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 0' }} />
      {children}
    </div>
  );
}

function FilaDato({ label, value, link }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '180px 1fr', gap: '0 24px',
      padding: '10px 0', borderBottom: '1px solid #F3F4F6',
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{label}</span>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#37BBED', textDecoration: 'none' }}>
          {value || '—'}
        </a>
      ) : (
        <span style={{ fontSize: 13, color: '#6B7280' }}>{value || '—'}</span>
      )}
    </div>
  );
}

function IcoCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#DCFCE7"/>
      <path d="M7 12l3.5 3.5L17 8" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IcoCross() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#FEE2E2"/>
      <path d="M8 8l8 8M16 8l-8 8" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IcoDoc() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}
function IcoExternal() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

export default function TabRecetario({ expediente }) {
  const esRecetario = expediente.tipo === TIPOS.RECETARIO;
  const djs = expediente.declaracionesJuradas || [];

  const docs = [
    ...(esRecetario ? [
      { titulo: 'Imagen de receta', disponible: !!expediente.imagenReceta },
      { titulo: 'Pantalla de prescripción', disponible: !!expediente.imagenPantallaPrescripcion },
    ] : []),
    { titulo: 'Manual de arquitectura y despliegue', disponible: true },
    { titulo: 'Certificación de seguridad de datos', disponible: !!expediente.certificadoInscripcionBD },
    { titulo: 'Constancia de integración con REFEPS', disponible: !!expediente.inscripcionBD },
    { titulo: 'Términos y condiciones de uso de la plataforma', disponible: !!expediente.acreditaPersoneria },
  ];

  return (
    <div>
      <Seccion titulo="Datos de la plataforma">
        <FilaDato label="Tipo" value={expediente.tipo} />
        <FilaDato label="Nombre software" value={expediente.nombreSoftware} />
        <FilaDato label="Versión" value={expediente.versionProduccion} />
        <FilaDato label="Modalidad" value={expediente.modalidadPrescripcion} />
        <FilaDato label="Consume REFEPS" value={expediente.consumeREFEPS ? 'Sí, integración activa API-REST' : 'No'} />
        <FilaDato label="URL" value={expediente.urlSitio} link={expediente.urlSitio} />
        <FilaDato label="Estándar" value={expediente.estandarInteroperabilidad} />
      </Seccion>

      <Seccion titulo="Declaraciones juradas">
        {djs.map((dj) => (
          <div key={dj.clave} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 0', borderBottom: '1px solid #F3F4F6',
          }}>
            <div style={{ flexShrink: 0 }}>{dj.valor ? <IcoCheck /> : <IcoCross />}</div>
            <span style={{ flex: 1, fontSize: 13, color: '#374151' }}>
              <strong>{dj.clave}.</strong> {DJ_TEXTOS[dj.clave] || dj.texto}
            </span>
            <span style={{
              flexShrink: 0, padding: '2px 8px', borderRadius: 3,
              fontSize: 11, fontWeight: 700,
              border: `1.5px solid ${dj.valor ? '#16A34A' : '#DC2626'}`,
              color: dj.valor ? '#16A34A' : '#DC2626',
              background: dj.valor ? '#F0FDF4' : '#FFF1F1',
            }}>
              {dj.valor ? 'SI' : 'NO'}
            </span>
          </div>
        ))}
      </Seccion>

      <Seccion titulo="Evidencia documental">
        {docs.map((doc) => (
          <div key={doc.titulo} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '11px 0', borderBottom: '1px solid #F3F4F6',
            opacity: doc.disponible ? 1 : 0.45,
          }}>
            <IcoDoc />
            <span style={{ flex: 1, fontSize: 13, color: '#374151' }}>{doc.titulo}</span>
            {doc.disponible ? (
              <button title="Link de demostración — Etapa 1" style={{
                background: 'none', border: 'none', color: '#37BBED',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4,
                whiteSpace: 'nowrap', padding: 0,
              }}>
                Ver PDF <IcoExternal />
              </button>
            ) : (
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>No adjuntado</span>
            )}
          </div>
        ))}
      </Seccion>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', paddingTop: 8, borderTop: '1px solid #E5E7EB' }}>
        <button title="No disponible en Etapa 1" style={{
          padding: '10px 20px', borderRadius: 4, border: 'none',
          background: '#37BBED', color: '#fff', fontSize: 13, fontWeight: 600,
          cursor: 'not-allowed', opacity: 0.85,
        }}>
          Aprobar Trámite
        </button>
        <button title="No disponible en Etapa 1" style={{
          padding: '10px 20px', borderRadius: 4,
          border: '1.5px solid #D1D5DB', background: '#fff',
          color: '#374151', fontSize: 13, fontWeight: 600,
          cursor: 'not-allowed', opacity: 0.85,
        }}>
          Solicitar Subsanación
        </button>
        <button title="No disponible en Etapa 1" style={{
          marginLeft: 'auto', background: 'none', border: 'none',
          color: '#DC2626', fontSize: 13, fontWeight: 600,
          cursor: 'not-allowed', opacity: 0.85, padding: 0,
        }}>
          Rechazar
        </button>
      </div>
    </div>
  );
}
