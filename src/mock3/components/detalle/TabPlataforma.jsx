import { TIPOS } from '@shared/domain/tipos.js';

const DJ_CONFIG = {
  a: { titulo: 'Base de Datos inscripta en Datos Personales', desc: 'El sistema declara tener su base de datos registrada ante la AAIP conforme a la Ley 25.326.' },
  b: { titulo: 'Protección de Datos Personales (Ley 25.326)', desc: 'Declara cumplir con los estándares de encriptación y anonimización de datos de salud.' },
  c: { titulo: 'Derechos del Paciente (Ley 26.529)', desc: 'Se garantiza el acceso libre y exportabilidad de la historia clínica digital.' },
  d: { titulo: 'Ley de Recetas Electrónicas o Digitales', desc: 'La plataforma cumple con la normativa vigente para la emisión de recetas electrónicas.' },
  e: { titulo: 'Acceso de Farmacias al Repositorio', desc: 'La plataforma permite el acceso de farmacias al repositorio conforme a la normativa vigente.' },
  f: { titulo: 'Integridad y Disponibilidad', desc: 'Uptime garantizado superior al 99.9% anual para servicios críticos de salud.' },
  g: { titulo: 'Art. 4 Anexo Dec. 98/23', desc: 'Se cumple con todos los requisitos técnicos establecidos en el artículo 4 del Decreto 98/2023.' },
  h: { titulo: 'Compromiso de Actualización de Información', desc: 'El operador se compromete a mantener actualizada la información declarada ante el Ministerio.' },
};

function IcoCheck() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#DCFCE7"/>
      <path d="M7 12l3.5 3.5L17 8" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IcoCross() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#FEE2E2"/>
      <path d="M8 8l8 8M16 8l-8 8" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IcoShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
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
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}
function IcoValid() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#37BBED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  );
}

function CardSection({ titulo, children }) {
  return (
    <div style={{ border: '1px solid #E5E7EB', borderRadius: 6, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #F3F4F6', background: '#FAFAFA' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{titulo}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

function CampoGrid({ label, value, esLink, colspan }) {
  return (
    <div style={{
      gridColumn: colspan ? '1 / -1' : undefined,
      padding: '12px 16px',
      borderBottom: '1px solid #F9FAFB',
    }}>
      <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
        {label}
      </div>
      {esLink && value ? (
        <a href={value} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#37BBED', textDecoration: 'none' }}>
          {value}
          <span style={{ marginLeft: 4, verticalAlign: 'middle', display: 'inline-block' }}><IcoExternal /></span>
        </a>
      ) : (
        <div style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{value || '—'}</div>
      )}
    </div>
  );
}

function ConsumeRefeps({ valor }) {
  return (
    <div style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB' }}>
      <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
        Consume REFEPS
      </div>
      {valor ? (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: '#DCFCE7', color: '#16A34A',
          fontSize: 12, fontWeight: 700, padding: '3px 10px',
          borderRadius: 20, border: '1px solid #86EFAC',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
          </svg>
          Sí
        </span>
      ) : (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: '#F3F4F6', color: '#6B7280',
          fontSize: 12, fontWeight: 700, padding: '3px 10px',
          borderRadius: 20, border: '1px solid #E5E7EB',
        }}>
          No
        </span>
      )}
    </div>
  );
}

export default function TabPlataforma({ expediente }) {
  const esRecetario = expediente.tipo === TIPOS.RECETARIO;
  const djs = expediente.declaracionesJuradas || [];
  const certPct = 88 + (parseInt(expediente.id || 0) % 10);

  const docs = [
    ...(esRecetario ? [
      { titulo: 'Modelo de Receta Digital', disponible: !!expediente.imagenReceta },
      { titulo: 'Pantalla de Prescripción', disponible: !!expediente.imagenPantallaPrescripcion },
    ] : []),
    { titulo: 'Constancia de Personería', disponible: !!expediente.acreditaPersoneria },
    { titulo: 'Registro Bases de Datos', disponible: !!expediente.certificadoInscripcionBD },
    { titulo: 'Certificado de Integración REFEPS', disponible: !!expediente.inscripcionBD },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 24, alignItems: 'start' }}>

      {/* Columna izquierda */}
      <div>
        <CardSection titulo="Datos de la plataforma">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <CampoGrid label="Tipo de Sistema" value={expediente.tipo} />
            <CampoGrid label="Software" value={expediente.nombreSoftware} />
            <CampoGrid label="Versión" value={expediente.versionProduccion} />
            <CampoGrid label="Modalidad de uso" value={expediente.modalidadPrescripcion} />
            <ConsumeRefeps valor={expediente.consumeREFEPS} />
            <CampoGrid label="Estándar de Intercambio" value={expediente.estandarInteroperabilidad} />
            <CampoGrid label="URL del Servicio" value={expediente.urlSitio} esLink colspan />
          </div>
        </CardSection>

        <CardSection titulo="Declaraciones juradas">
          {djs.map((dj) => {
            const cfg = DJ_CONFIG[dj.clave] ?? { titulo: dj.texto, desc: '' };
            return (
              <div key={dj.clave} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '14px 16px', borderBottom: '1px solid #F3F4F6',
              }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  {dj.valor ? <IcoCheck /> : <IcoCross />}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 3 }}>
                    {cfg.titulo}
                  </div>
                  {cfg.desc && (
                    <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>{cfg.desc}</div>
                  )}
                </div>
              </div>
            );
          })}
        </CardSection>
      </div>

      {/* Columna derecha */}
      <div>
        {/* Evidencia documental */}
        <div style={{ border: '1px solid #E5E7EB', borderRadius: 6, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #F3F4F6', background: '#FAFAFA' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Evidencia documental</span>
          </div>
          {docs.map((doc) => (
            <div key={doc.titulo} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px', borderBottom: '1px solid #F9FAFB',
              opacity: doc.disponible ? 1 : 0.45,
            }}>
              <IcoDoc />
              <span style={{ flex: 1, fontSize: 13, color: '#374151' }}>{doc.titulo}</span>
              {doc.disponible ? (
                <button title="Etapa 1 — link de demostración" style={{
                  background: 'none', border: 'none',
                  color: '#37BBED', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0,
                }}>
                  Ver PDF <IcoExternal />
                </button>
              ) : (
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>No adjunto</span>
              )}
            </div>
          ))}
        </div>

        {/* Certificación vigente */}
        <div style={{
          background: '#1a2744', borderRadius: 6, padding: '18px 18px 14px', marginBottom: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: '#fff' }}>
            <IcoShield />
            <span style={{ fontSize: 13, fontWeight: 700 }}>Certificación Vigente</span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: '0 0 14px', lineHeight: 1.6 }}>
            Esta plataforma ha completado el {certPct}% de los requerimientos de interoperabilidad nacional.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 4, height: 6, marginBottom: 12, overflow: 'hidden' }}>
            <div style={{ width: `${certPct}%`, height: '100%', background: '#37BBED', borderRadius: 4, transition: 'width 0.6s ease' }} />
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            Expira el {expediente.ultimaModificacion ? expediente.ultimaModificacion.split('-').reverse().join('/') : '—'}
          </div>
        </div>

        {/* Última validación */}
        <div style={{ border: '1px solid #E5E7EB', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid #F3F4F6', background: '#FAFAFA' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#6B7280', letterSpacing: 1, textTransform: 'uppercase' }}>
              Última Validación
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px' }}>
            <div style={{ width: 36, height: 36, background: '#EFF6FF', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <IcoValid />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Validación Automática</div>
              <div style={{ fontSize: 11, color: '#6B7280' }}>Hace 2 horas vía RENAPER API</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
