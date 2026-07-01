import CampoLectura from '../ui/CampoLectura.jsx';
import EstadoBadge from '../ui/EstadoBadge.jsx';

function iniciales(nombre = '') {
  return nombre
    .replace(/^(Lic\.|Dr\.|Dra\.|Ing\.|Sr\.|Sra\.)\s+/i, '')
    .split(' ').filter(Boolean).slice(0, 2)
    .map((p) => p[0].toUpperCase()).join('');
}

function TarjetaSeccion({ titulo, icono, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: '20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #F3F4F6' }}>
        <span style={{ color: '#6B7280', display: 'flex' }}>{icono}</span>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{titulo}</span>
      </div>
      {children}
    </div>
  );
}

function IcoEdificio() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9M15 21V9"/></svg>;
}
function IcoPersona() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function IcoCandado() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
}

function GestionInterna({ expediente }) {
  const ini = iniciales(expediente.responsable);
  const now = new Date();
  const hora = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return (
    <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #F3F4F6' }}>
        <span style={{ color: '#6B7280', display: 'flex' }}><IcoCandado /></span>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>Gestión Interna</span>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>
          Responsable del Trámite
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', background: '#F9FAFB', borderRadius: 6, border: '1px solid #F3F4F6',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: '#374151',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 12, flexShrink: 0, letterSpacing: 0.5,
          }}>
            {ini}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{expediente.responsable}</div>
            <div style={{ fontSize: 11, color: '#9CA3AF' }}>Unidad de Auditoría RENAPDIS</div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>
          Estado Actual
        </div>
        <EstadoBadge estado={expediente.estado} />
        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 8 }}>
          Última actualización: Hoy, {hora} hs
        </div>
      </div>

      {expediente.observaciones && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>
            Observaciones
          </div>
          <p style={{
            fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.6,
            padding: '10px 12px', background: '#FFFBEB', borderRadius: 6, border: '1px solid #FCD34D',
          }}>
            {expediente.observaciones}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { label: 'Agregar Observación', border: 'none', bg: '#1E3A5F', color: '#fff' },
          { label: 'Aprobar Trámite', border: '1.5px solid #16A34A', bg: '#fff', color: '#16A34A' },
          { label: 'Rechazar / Observar', border: '1.5px solid #DC2626', bg: '#fff', color: '#DC2626' },
        ].map(({ label, border, bg, color }) => (
          <button key={label} title="No disponible en Etapa 1 (solo lectura)" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '10px 16px', borderRadius: 6, border,
            background: bg, color, fontSize: 13, fontWeight: 600,
            cursor: 'not-allowed', width: '100%', opacity: 0.9,
          }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TabAgenda({ expediente }) {
  const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 32px' };

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ flex: 2, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TarjetaSeccion titulo="Información de la Entidad" icono={<IcoEdificio />}>
          <div style={gridStyle}>
            <div style={{ gridColumn: '1 / -1' }}>
              <CampoLectura label="Nombre de la Entidad" value={expediente.nombreEntidad} />
            </div>
            <CampoLectura label="CUIT de la Entidad" value={expediente.cuitEntidad} />
            <CampoLectura label="Naturaleza de la Entidad" value={expediente.naturalezaEntidad} />
            <CampoLectura label="Provincia" value={expediente.provincia} />
            <CampoLectura label="Departamento" value={expediente.departamento} />
          </div>
        </TarjetaSeccion>

        <TarjetaSeccion titulo="Datos de Contacto" icono={<IcoPersona />}>
          <div style={gridStyle}>
            <CampoLectura label="Nombre del Contacto" value={expediente.contacto} />
            <CampoLectura label="CUIT/CUIL del Contacto" value={expediente.cuitCuilContacto} />
            <CampoLectura label="Función que Desempeña" value={expediente.funcionEnEntidad} />
            <CampoLectura label="Teléfono" value={expediente.telefono} />
            <CampoLectura label="Email" value={expediente.email} link={`mailto:${expediente.email}`} />
            <CampoLectura label="Referente Técnico" value={expediente.referenteTecnico} />
          </div>
        </TarjetaSeccion>
      </div>

      <div style={{ flex: '0 0 280px' }}>
        <GestionInterna expediente={expediente} />
      </div>
    </div>
  );
}
