import { useNavigate } from 'react-router-dom';
import EstadoBadge from '../ui/EstadoBadge.jsx';

const FILAS_POR_PAGINA = 10;

function formatFecha(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

const thStyle = {
  padding: '10px 14px',
  textAlign: 'left',
  fontSize: 11,
  fontWeight: 700,
  color: '#374151',
  borderBottom: '2px solid #E5E7EB',
  background: '#fff',
  whiteSpace: 'nowrap',
};

const tdStyle = {
  padding: '12px 14px',
  fontSize: 13,
  color: '#374151',
  borderBottom: '1px solid #E5E7EB',
  whiteSpace: 'nowrap',
};

function SkeletonRow() {
  return (
    <tr>
      {[160, 130, 100, 70, 90, 80, 110, 80].map((w, j) => (
        <td key={j} style={tdStyle}>
          <div style={{ height: 12, borderRadius: 3, background: '#F3F4F6', width: w }} />
        </td>
      ))}
    </tr>
  );
}

export default function TablaExpedientes({ expedientes, loading, pagina, onPaginaChange }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Expediente', 'Entidad', 'CUIT', 'Tipo', 'Estado', 'Provincia', 'Responsable', 'Modificación'].map((col) => (
              <th key={col} style={thStyle}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
        </tbody>
      </table>
    );
  }

  if (!expedientes || expedientes.length === 0) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: '#6B7280' }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>No se encontraron expedientes</div>
        <div style={{ fontSize: 13 }}>Ajustá los filtros de búsqueda para ver resultados</div>
      </div>
    );
  }

  const totalPaginas = Math.ceil(expedientes.length / FILAS_POR_PAGINA);
  const inicio = (pagina - 1) * FILAS_POR_PAGINA;
  const filas = expedientes.slice(inicio, inicio + FILAS_POR_PAGINA);

  const paginasVisibles = () => {
    const rango = [];
    for (let i = Math.max(1, pagina - 1); i <= Math.min(totalPaginas, pagina + 1); i++) {
      rango.push(i);
    }
    return rango;
  };

  return (
    <div>
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
            <th style={thStyle}>Modificación</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((exp) => (
            <tr
              key={exp.id}
              onClick={() => navigate(`/expediente/${exp.id}`)}
              style={{ cursor: 'pointer' }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#F9FAFB')}
              onMouseOut={(e) => (e.currentTarget.style.background = '')}
            >
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12, fontWeight: 600, color: '#242C4F' }}>
                {exp.expediente}
              </td>
              <td style={{ ...tdStyle, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {exp.nombreEntidad}
              </td>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12, color: '#6B7280' }}>
                {exp.cuitEntidad}
              </td>
              <td style={tdStyle}>{exp.tipo}</td>
              <td style={tdStyle}>
                <EstadoBadge estado={exp.estado} />
              </td>
              <td style={tdStyle}>{exp.provincia}</td>
              <td style={{ ...tdStyle, color: '#6B7280' }}>{exp.responsable}</td>
              <td style={{ ...tdStyle, color: '#6B7280', fontSize: 12 }}>
                {formatFecha(exp.ultimaModificacion)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, padding: '0 2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <PagBtn disabled={pagina === 1} onClick={() => onPaginaChange(pagina - 1)}>
            &lsaquo; Anterior
          </PagBtn>
          {paginasVisibles().map((n) => (
            <PagBtn key={n} activo={pagina === n} onClick={() => onPaginaChange(n)}>
              {n}
            </PagBtn>
          ))}
          <PagBtn disabled={pagina === totalPaginas} onClick={() => onPaginaChange(pagina + 1)}>
            Siguiente &rsaquo;
          </PagBtn>
        </div>

        <span style={{ fontSize: 13, color: '#6B7280' }}>
          Mostrando {inicio + 1} a {Math.min(inicio + FILAS_POR_PAGINA, expedientes.length)} de{' '}
          <strong>{expedientes.length.toLocaleString('es-AR')}</strong> resultados
        </span>
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
