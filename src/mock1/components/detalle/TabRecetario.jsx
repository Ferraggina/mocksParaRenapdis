import { TIPOS } from '@shared/domain/tipos.js';

function formatFecha(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

const DJ_META = {
  a: { titulo: 'Registro de Bases de Datos', descripcion: 'Base de datos debidamente inscripta ante la Agencia de Acceso a la Información Pública.' },
  b: { titulo: 'Protección de Datos Personales', descripcion: 'Cumplimiento íntegro de la Ley N° 25.326 y sus normas reglamentarias.' },
  c: { titulo: 'Derechos del Paciente', descripcion: 'Asegura la confidencialidad, integridad y disponibilidad según Ley N° 26.529.' },
  d: { titulo: 'Ley de Recetas Electrónicas', descripcion: 'Adecuación a las disposiciones de la Ley N° 27.553 y Decreto N° 98/23.' },
  e: { titulo: 'Acceso libre a Farmacias' },
  f: { titulo: 'Cumplimiento Ley 25.649' },
  g: { titulo: 'Art. 4 Anexo Dec 98/23' },
  h: { titulo: 'Compromiso Actualización' },
};

function CheckExpandido({ clave, valor }) {
  const meta = DJ_META[clave] || {};
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12,
      padding: '13px 15px', borderRadius: 6, marginBottom: 8,
      background: valor ? '#F0FDF4' : '#FFF7F7',
      border: `1px solid ${valor ? '#BBF7D0' : '#FECACA'}`,
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: '50%', flexShrink: 0, marginTop: 1,
        background: valor ? '#16A34A' : '#DC2626',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: 12, fontWeight: 800,
      }}>
        {valor ? '✓' : '✕'}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: meta.descripcion ? 3 : 0 }}>
          {clave}. {meta.titulo}
        </div>
        {meta.descripcion && (
          <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>{meta.descripcion}</div>
        )}
      </div>
    </div>
  );
}

function CheckCompacto({ clave, valor }) {
  const meta = DJ_META[clave] || {};
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 6,
      background: valor ? '#F0FDF4' : '#FFF7F7',
      border: `1px solid ${valor ? '#BBF7D0' : '#FECACA'}`,
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
        background: valor ? '#16A34A' : '#DC2626',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: 11, fontWeight: 800,
      }}>
        {valor ? '✓' : '✕'}
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{clave}. {meta.titulo}</span>
    </div>
  );
}

function IcoPDF() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
}
function IcoDescarga() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}

function DocCard({ titulo, filename, size, disponible }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB',
      padding: '14px 15px', opacity: disponible ? 1 : 0.5,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 6, background: '#FEF2F2', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IcoPDF />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', lineHeight: 1.3, marginBottom: 3 }}>{titulo}</div>
          {disponible && filename ? (
            <div style={{ fontSize: 11, color: '#9CA3AF', wordBreak: 'break-all' }}>{filename}{size ? ` (${size})` : ''}</div>
          ) : (
            <div style={{ fontSize: 11, color: '#D1D5DB' }}>No adjuntado</div>
          )}
        </div>
      </div>
      {disponible ? (
        <button title="Link de demostración — Etapa 1" style={{
          width: '100%', padding: '8px', borderRadius: 6, border: 'none',
          background: '#242C4F', color: '#fff', fontSize: 12, fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <IcoDescarga /> Ver / Descargar
        </button>
      ) : (
        <div style={{ width: '100%', padding: '8px', borderRadius: 6, background: '#F3F4F6', color: '#9CA3AF', fontSize: 12, fontWeight: 600, textAlign: 'center' }}>
          No presentado
        </div>
      )}
    </div>
  );
}

function SeccionTitulo({ icono, titulo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #F3F4F6' }}>
      {icono}{titulo}
    </div>
  );
}

function IcoPlataforma() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>; }
function IcoDJ() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function IcoDocEv() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>; }

function CampoPlataforma({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>{label}</div>
      {children}
    </div>
  );
}

export default function TabRecetario({ expediente }) {
  const esRecetario = expediente.tipo === TIPOS.RECETARIO;
  const djs = expediente.declaracionesJuradas || [];
  const djsExpandidas = djs.filter(d => ['a', 'b', 'c', 'd'].includes(d.clave));
  const djsCompactas = djs.filter(d => ['e', 'f', 'g', 'h'].includes(d.clave));

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: 16 }}>
          <SeccionTitulo icono={<IcoPlataforma />} titulo="Datos de la plataforma" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 32px' }}>
            <CampoPlataforma label="Tipo">
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{expediente.tipo || '—'}</div>
            </CampoPlataforma>
            <CampoPlataforma label="Nombre del Software">
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{expediente.nombreSoftware || '—'}</div>
            </CampoPlataforma>
            <CampoPlataforma label="Versión">
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{expediente.versionProduccion || '—'}</div>
            </CampoPlataforma>
            <CampoPlataforma label="Modalidad">
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{expediente.modalidadPrescripcion || '—'}</div>
            </CampoPlataforma>
            <CampoPlataforma label="Consume REFEPS">
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: 600, color: '#111827' }}>
                {expediente.consumeREFEPS ? (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Sí</>
                ) : (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>No</>
                )}
              </div>
            </CampoPlataforma>
            <CampoPlataforma label="URL de Acceso">
              {expediente.urlSitio ? (
                <a href={expediente.urlSitio} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#37BBED', fontWeight: 600, textDecoration: 'none' }}>
                  {expediente.urlSitio}
                </a>
              ) : <span style={{ fontSize: 14, color: '#9CA3AF' }}>—</span>}
            </CampoPlataforma>
            <div style={{ gridColumn: '1 / -1' }}>
              <CampoPlataforma label="Estándar de Interoperabilidad">
                <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{expediente.estandarInteroperabilidad || '—'}</div>
              </CampoPlataforma>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: '20px 24px' }}>
          <SeccionTitulo icono={<IcoDJ />} titulo="Declaraciones juradas" />
          {djsExpandidas.map(dj => <CheckExpandido key={dj.clave} clave={dj.clave} valor={dj.valor} />)}
          {djsCompactas.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: djsExpandidas.length > 0 ? 8 : 0 }}>
              {djsCompactas.map(dj => <CheckCompacto key={dj.clave} clave={dj.clave} valor={dj.valor} />)}
            </div>
          )}
        </div>
      </div>

      <div style={{ width: 270, flexShrink: 0 }}>
        <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: '20px 16px' }}>
          <SeccionTitulo icono={<IcoDocEv />} titulo="Evidencia documental" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {esRecetario && (
              <>
                <DocCard titulo="Imagen de receta" filename="receta-modelo-digital.pdf" size="1.2 MB" disponible={!!expediente.imagenReceta} />
                <DocCard titulo="Imagen de pantalla de prescripción" filename="ui-prescripcion-captura.pdf" size="2.4 MB" disponible={!!expediente.imagenPantallaPrescripcion} />
              </>
            )}
            <DocCard titulo="Documentación de personería" filename="estatuto-legal-apoderado.pdf" size="4.8 MB" disponible={!!expediente.acreditaPersoneria} />
            <DocCard titulo="Certificado de Reg. Datos" filename="certificado-aaip-2026.pdf" size="0.9 MB" disponible={!!expediente.certificadoInscripcionBD} />
          </div>
        </div>
      </div>
    </div>
  );
}
