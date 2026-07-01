import { TIPOS } from '@shared/domain/tipos.js';

function IcoPDF() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  );
}

function DocCard({ titulo, disponible }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 8, border: `1px solid ${disponible ? '#E5E7EB' : '#F3F4F6'}`,
      padding: '20px 16px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center',
      opacity: disponible ? 1 : 0.55,
    }}>
      <div style={{
        width: 52, height: 52, background: disponible ? '#FEF2F2' : '#F9FAFB',
        borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <IcoPDF />
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', lineHeight: 1.4 }}>{titulo}</div>
      {disponible ? (
        <button title="Link de demostración — Etapa 1" style={{
          padding: '6px 18px', borderRadius: 6, border: '1.5px solid #37BBED',
          background: '#fff', color: '#37BBED', fontSize: 12, fontWeight: 600, cursor: 'pointer',
        }}>
          Ver PDF
        </button>
      ) : (
        <span style={{ fontSize: 12, color: '#9CA3AF', background: '#F3F4F6', padding: '4px 12px', borderRadius: 4 }}>
          No presentado
        </span>
      )}
    </div>
  );
}

export default function TabDocumentacion({ expediente }) {
  const esRecetario = expediente.tipo === TIPOS.RECETARIO;

  return (
    <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: '24px' }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 6 }}>
        Documentación presentada
      </div>
      <p style={{ fontSize: 13, color: '#9CA3AF', margin: '0 0 24px' }}>
        Evidencia documental adjuntada al expediente. Los archivos están disponibles en el sistema GDE.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12 }}>
        <DocCard titulo="Acreditación de Personería" disponible={expediente.acreditaPersoneria} />
        <DocCard titulo="Certificado de Inscripción en BD" disponible={expediente.certificadoInscripcionBD} />
        <DocCard titulo="Constancia de Inscripción en BD" disponible={expediente.inscripcionBD} />
        {esRecetario && (
          <>
            <DocCard titulo="Imagen de Receta" disponible={!!expediente.imagenReceta} />
            <DocCard titulo="Pantalla de Prescripción" disponible={!!expediente.imagenPantallaPrescripcion} />
          </>
        )}
      </div>

      <div style={{ marginTop: 24, padding: '12px 16px', background: '#F9FAFB', borderRadius: 6, border: '1px solid #F3F4F6' }}>
        <div style={{ fontSize: 12, color: '#6B7280' }}>
          <span style={{ fontWeight: 600 }}>Completitud documental: </span>
          {(() => {
            const docs = [expediente.acreditaPersoneria, expediente.certificadoInscripcionBD, expediente.inscripcionBD, ...(esRecetario ? [!!expediente.imagenReceta, !!expediente.imagenPantallaPrescripcion] : [])];
            const presentados = docs.filter(Boolean).length;
            const pct = Math.round((presentados / docs.length) * 100);
            return (
              <>
                <span style={{ color: pct === 100 ? '#166534' : pct >= 60 ? '#92400E' : '#991B1B', fontWeight: 700 }}>{pct}%</span>
                {' '}({presentados}/{docs.length} documentos presentados)
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
