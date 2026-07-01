import { useNavigate } from 'react-router-dom';
import EstadoBadge from '../ui/EstadoBadge.jsx';

const FILAS_POR_PAGINA = 10;

const thStyle = {
  padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 700,
  color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.6,
  borderBottom: '1px solid #E5E7EB', background: '#fff', whiteSpace: 'nowrap',
};

const tdStyle = {
  padding: '13px 14px', fontSize: 13, color: '#374151',
  borderBottom: '1px solid #F3F4F6', whiteSpace: 'nowrap',
};

function formatFecha(iso) {
  if (!iso) return { fecha: '-', hora: '' };
  const [y, m, d] = iso.split('-');
  return { fecha: `${d}/${m}/${y}`, hora: horaFake(iso) };
}

function horaFake(iso) {
  const seed = iso.replace(/-/g, '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const h = String(8 + (seed % 10)).padStart(2, '0');
  const min = String((seed * 7) % 60).padStart(2, '0');
  return `${h}:${min}`;
}

function SkeletonRow() {
  return (
    <tr>
      {[180, 120, 100, 70, 90, 80, 110, 80].map((w, j) => (
        <td key={j} style={tdStyle}>
          <div style={{ height: 13, borderRadius: 3, background: '#F3F4F6', width: w }} />
        </td>
      ))}
    </tr>
  );
}

function BtnPagina({ children, activo, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        minWidth: 34, height: 34, padding: '0 8px', borderRadius: 6,
        border: `1px solid ${activo ? '#242C4F' : '#E5E7EB'}`,
        background: activo ? '#242C4F' : '#fff',
        color: activo ? '#fff' : disabled ? '#D1D5DB' : '#374151',
        fontSize: 13, fontWeight: activo ? 700 : 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {children}
    </button>
  );
}

export default function TablaExpedientes({ expedientes, loading, pagina, onPaginaChange }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Expediente', 'Entidad', 'CUIT', 'Tipo', 'Estado', 'Provincia', 'Responsable', 'Modificado'].map((col) => (
                <th key={col} style={thStyle}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
          </tbody>
        </table>
      </div>
    );
  }

  if (!expedientes || expedientes.length === 0) {
    return (
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>No se encontraron expedientes</div>
        <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Ajustá los filtros de búsqueda para ver resultados</div>
      </div>
    );
  }

  const totalPaginas = Math.ceil(expedientes.length / FILAS_POR_PAGINA);
  const inicio = (pagina - 1) * FILAS_POR_PAGINA;
  const filas = expedientes.slice(inicio, inicio + FILAS_POR_PAGINA);

  const paginasVisibles = () => {
    const rango = [];
    const delta = 1;
    for (let i = Math.max(1, pagina - delta); i <= Math.min(totalPaginas, pagina + delta); i++) {
      rango.push(i);
    }
    return rango;
  };

  return (
    <div>
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
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
              <th style={thStyle}>Modificado</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((exp) => {
              const { fecha, hora } = formatFecha(exp.ultimaModificacion);
              return (
                <tr
                  key={exp.id}
                  onClick={() => navigate(`/expediente/${exp.id}`)}
                  style={{ cursor: 'pointer', transition: 'background 0.1s' }}
                  onMouseOver={(e) => (e.currentTarget.style.background = '#F0F9FF')}
                  onMouseOut={(e) => (e.currentTarget.style.background = '')}
                >
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#242C4F' }}>
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
                  <td style={{ ...tdStyle, color: '#9CA3AF', fontSize: 12, lineHeight: 1.4 }}>
                    <div>{fecha}</div>
                    <div>{hora}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, padding: '0 2px' }}>
        <span style={{ fontSize: 13, color: '#6B7280' }}>
          Mostrando <strong>{inicio + 1}–{Math.min(inicio + FILAS_POR_PAGINA, expedientes.length)}</strong> de <strong>{expedientes.length.toLocaleString('es-AR')}</strong> expedientes
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <BtnPagina disabled={pagina === 1} onClick={() => onPaginaChange(1)}>|◀</BtnPagina>
          <BtnPagina disabled={pagina === 1} onClick={() => onPaginaChange(pagina - 1)}>◀</BtnPagina>
          {paginasVisibles().map((n) => (
            <BtnPagina key={n} activo={pagina === n} onClick={() => onPaginaChange(n)}>{n}</BtnPagina>
          ))}
          <BtnPagina disabled={pagina === totalPaginas} onClick={() => onPaginaChange(pagina + 1)}>▶</BtnPagina>
          <BtnPagina disabled={pagina === totalPaginas} onClick={() => onPaginaChange(totalPaginas)}>▶|</BtnPagina>
        </div>
      </div>
    </div>
  );
}
