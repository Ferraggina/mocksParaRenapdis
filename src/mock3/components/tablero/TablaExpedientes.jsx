import { useNavigate } from 'react-router-dom';
import EstadoBadge from '../ui/EstadoBadge.jsx';

const FILAS_POR_PAGINA = 8;

function formatFecha(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function IcoEye() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

const thStyle = {
  padding: '10px 14px',
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 700,
  color: '#374151',
  borderBottom: '2px solid #E5E7EB',
  background: '#fff',
  whiteSpace: 'nowrap',
  userSelect: 'none',
};

const tdStyle = {
  padding: '13px 14px',
  fontSize: 13,
  color: '#374151',
  borderBottom: '1px solid #E5E7EB',
  whiteSpace: 'nowrap',
};

function SkeletonRow() {
  return (
    <tr>
      {[140, 120, 100, 70, 90, 80, 100, 80, 60].map((w, j) => (
        <td key={j} style={tdStyle}>
          <div style={{ height: 12, borderRadius: 3, background: '#F3F4F6', width: w }} />
        </td>
      ))}
    </tr>
  );
}

function buildPaginasVisibles(pagina, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [];
  pages.push(1);
  if (pagina > 3) pages.push('...');
  for (let i = Math.max(2, pagina - 1); i <= Math.min(total - 1, pagina + 1); i++) {
    pages.push(i);
  }
  if (pagina < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}

export default function TablaExpedientes({ expedientes, loading, pagina, onPaginaChange }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Expediente', 'Entidad', 'CUIT', 'Tipo', 'Estado', 'Provincia', 'Responsable', 'Últ. modif.', ''].map((col) => (
                <th key={col} style={thStyle}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
          </tbody>
        </table>
      </div>
    );
  }

  if (!expedientes || expedientes.length === 0) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: '#6B7280', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>No se encontraron expedientes</div>
        <div style={{ fontSize: 13, color: '#9CA3AF' }}>Ajustá los filtros de búsqueda para ver resultados</div>
      </div>
    );
  }

  const totalPaginas = Math.ceil(expedientes.length / FILAS_POR_PAGINA);
  const inicio = (pagina - 1) * FILAS_POR_PAGINA;
  const filas = expedientes.slice(inicio, inicio + FILAS_POR_PAGINA);
  const paginasVisibles = buildPaginasVisibles(pagina, totalPaginas);

  return (
    <div>
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Expediente</th>
              <th style={thStyle}>Entidad</th>
              <th style={thStyle}>CUIT</th>
              <th style={thStyle}>Tipo</th>
              <th style={thStyle}>Estado</th>
              <th style={thStyle}>Provincia</th>
              <th style={thStyle}>Responsable</th>
              <th style={thStyle}>Últ. modif.</th>
              <th style={{ ...thStyle, width: 60 }}></th>
            </tr>
          </thead>
          <tbody>
            {filas.map((exp) => (
              <tr
                key={exp.id}
                onMouseOver={(e) => (e.currentTarget.style.background = '#FAFAFA')}
                onMouseOut={(e) => (e.currentTarget.style.background = '')}
              >
                <td style={{ ...tdStyle, maxWidth: 180 }}>
                  <span
                    onClick={() => navigate(`/expediente/${exp.id}`)}
                    style={{
                      color: '#37BBED', fontWeight: 600, fontSize: 13,
                      cursor: 'pointer', textDecoration: 'none',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    {exp.expediente}
                  </span>
                </td>
                <td style={{ ...tdStyle, maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {exp.nombreEntidad}
                </td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12, color: '#6B7280' }}>
                  {exp.cuitEntidad}
                </td>
                <td style={tdStyle}>{exp.tipo}</td>
                <td style={tdStyle}><EstadoBadge estado={exp.estado} /></td>
                <td style={tdStyle}>{exp.provincia}</td>
                <td style={{ ...tdStyle, color: '#6B7280' }}>{exp.responsable}</td>
                <td style={{ ...tdStyle, color: '#6B7280', fontSize: 12 }}>{formatFecha(exp.ultimaModificacion)}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => navigate(`/expediente/${exp.id}`)}
                    style={{
                      background: 'none', border: 'none',
                      color: '#37BBED', fontSize: 13, fontWeight: 500,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                      padding: 0, whiteSpace: 'nowrap',
                    }}
                  >
                    Ver <IcoEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, padding: '0 2px' }}>
        <span style={{ fontSize: 13, color: '#6B7280' }}>
          Mostrando {expedientes.length === 0 ? 0 : inicio + 1}–{Math.min(inicio + FILAS_POR_PAGINA, expedientes.length)} de{' '}
          <strong style={{ color: '#374151' }}>{expedientes.length.toLocaleString('es-AR')}</strong> trámites
        </span>

        {totalPaginas > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PagBtn disabled={pagina === 1} onClick={() => onPaginaChange(pagina - 1)}>
              &lsaquo; Anterior
            </PagBtn>
            {paginasVisibles.map((n, i) =>
              n === '...' ? (
                <span key={`dots-${i}`} style={{ padding: '6px 8px', fontSize: 13, color: '#9CA3AF' }}>…</span>
              ) : (
                <PagBtn key={n} activo={pagina === n} onClick={() => onPaginaChange(n)}>
                  {n}
                </PagBtn>
              )
            )}
            <PagBtn disabled={pagina === totalPaginas} onClick={() => onPaginaChange(pagina + 1)}>
              Siguiente &rsaquo;
            </PagBtn>
          </div>
        )}
      </div>
    </div>
  );
}

function PagBtn({ children, activo, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '6px 10px',
        border: `1px solid ${activo ? '#242C4F' : '#E5E7EB'}`,
        borderRadius: 4,
        background: activo ? '#242C4F' : '#fff',
        color: activo ? '#fff' : disabled ? '#D1D5DB' : '#374151',
        fontSize: 13,
        fontWeight: activo ? 700 : 400,
        cursor: disabled ? 'not-allowed' : 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  );
}
