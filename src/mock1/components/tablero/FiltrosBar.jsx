import { ESTADOS_LIST } from '@shared/domain/estados.js';
import { PROVINCIAS } from '@shared/domain/tipos.js';

function IconoBuscar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconoFiltro() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

const labelStyle = {
  fontSize: 10, fontWeight: 700, color: '#9CA3AF',
  textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 6, display: 'block',
};

const inputStyle = {
  padding: '8px 10px 8px 30px', borderRadius: 6, border: '1px solid #E5E7EB',
  fontSize: 13, color: '#374151', background: '#fff', outline: 'none', width: '100%',
};

const selectStyle = {
  padding: '8px 28px 8px 10px', borderRadius: 6, border: '1px solid #E5E7EB',
  fontSize: 13, color: '#374151', background: '#fff', outline: 'none',
  cursor: 'pointer', width: '100%', appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' strokeWidth='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center',
};

const dividerStyle = { width: 1, alignSelf: 'stretch', background: '#E5E7EB', margin: '0 4px' };

export default function FiltrosBar({ filtros, onChange, onLimpiar, responsables }) {
  const handleChange = (campo) => (e) => onChange({ ...filtros, [campo]: e.target.value });

  return (
    <div style={{
      background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB',
      padding: '16px 20px', display: 'flex', alignItems: 'flex-end', gap: 0, flexWrap: 'wrap',
    }}>
      <div style={{ flex: '2 1 200px', paddingRight: 16 }}>
        <label style={labelStyle}>Expediente / CUIT</label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', display: 'flex', pointerEvents: 'none' }}>
            <IconoBuscar />
          </span>
          <input
            type="text"
            placeholder="Buscar..."
            value={filtros.busqueda ?? ''}
            onChange={handleChange('busqueda')}
            style={inputStyle}
            aria-label="Buscar por expediente o CUIT"
          />
        </div>
      </div>

      <div style={dividerStyle} />

      <div style={{ flex: '1 1 150px', padding: '0 16px' }}>
        <label style={labelStyle}>Estado</label>
        <select value={filtros.estado ?? ''} onChange={handleChange('estado')} style={selectStyle} aria-label="Filtrar por estado">
          <option value="">Todos los estados</option>
          {ESTADOS_LIST.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      <div style={dividerStyle} />

      <div style={{ flex: '1 1 150px', padding: '0 16px' }}>
        <label style={labelStyle}>Provincia</label>
        <select value={filtros.provincia ?? ''} onChange={handleChange('provincia')} style={selectStyle} aria-label="Filtrar por provincia">
          <option value="">Todas las provincias</option>
          {PROVINCIAS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div style={dividerStyle} />

      <div style={{ flex: '1 1 150px', padding: '0 16px' }}>
        <label style={labelStyle}>Responsable</label>
        <select value={filtros.responsable ?? ''} onChange={handleChange('responsable')} style={selectStyle} aria-label="Filtrar por responsable">
          <option value="">Todos los responsables</option>
          {(responsables ?? []).map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div style={{ paddingLeft: 16 }}>
        <button
          onClick={onLimpiar}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 6, border: '1px solid #E5E7EB',
            background: '#F9FAFB', fontSize: 13, color: '#6B7280',
            cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#F3F4F6')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#F9FAFB')}
        >
          <IconoFiltro />
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
