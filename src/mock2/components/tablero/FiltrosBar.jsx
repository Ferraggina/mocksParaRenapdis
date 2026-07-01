import { ESTADOS_LIST } from '@shared/domain/estados.js';
import { PROVINCIAS } from '@shared/domain/tipos.js';

const labelStyle = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 6,
};

const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  border: '1px solid #D1D5DB',
  borderRadius: 4,
  fontSize: 13,
  color: '#111827',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
};

const selectStyle = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' strokeWidth='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: 30,
  cursor: 'pointer',
};

export default function FiltrosBar({ filtros, onChange, onLimpiar, responsables }) {
  const handleChange = (campo) => (e) => onChange({ ...filtros, [campo]: e.target.value });

  return (
    <div style={{
      border: '1px solid #E5E7EB',
      borderRadius: 6,
      padding: '20px 24px',
      background: '#fff',
    }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: '2 1 180px' }}>
          <label style={labelStyle}>Expediente o CUIT</label>
          <input
            type="text"
            placeholder="Ej: 20-34567890-9"
            value={filtros.busqueda ?? ''}
            onChange={handleChange('busqueda')}
            style={inputStyle}
            aria-label="Buscar por expediente o CUIT"
          />
        </div>

        <div style={{ flex: '1 1 140px' }}>
          <label style={labelStyle}>Estado</label>
          <select value={filtros.estado ?? ''} onChange={handleChange('estado')} style={selectStyle} aria-label="Filtrar por estado">
            <option value="">Todos los estados</option>
            {ESTADOS_LIST.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>

        <div style={{ flex: '1 1 140px' }}>
          <label style={labelStyle}>Provincia</label>
          <select value={filtros.provincia ?? ''} onChange={handleChange('provincia')} style={selectStyle} aria-label="Filtrar por provincia">
            <option value="">Todas las provincias</option>
            {PROVINCIAS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div style={{ flex: '1 1 140px' }}>
          <label style={labelStyle}>Responsable</label>
          <select value={filtros.responsable ?? ''} onChange={handleChange('responsable')} style={selectStyle} aria-label="Filtrar por responsable">
            <option value="">Todos los responsables</option>
            {(responsables ?? []).map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', paddingBottom: 1 }}>
          <button
            onClick={onLimpiar}
            style={{
              background: 'none',
              border: 'none',
              color: '#37BBED',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              padding: '8px 4px',
              whiteSpace: 'nowrap',
            }}
          >
            Limpiar
          </button>
          <button
            style={{
              padding: '8px 20px',
              background: '#242C4F',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'default',
              whiteSpace: 'nowrap',
            }}
          >
            Filtrar
          </button>
        </div>
      </div>
    </div>
  );
}
