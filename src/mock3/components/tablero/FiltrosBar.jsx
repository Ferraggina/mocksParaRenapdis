import { ESTADOS_LIST } from '@shared/domain/estados.js';
import { PROVINCIAS } from '@shared/domain/tipos.js';

function IcoSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

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
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
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
      padding: '16px 20px',
      background: '#fff',
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: '2 1 200px', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
            pointerEvents: 'none', display: 'flex', alignItems: 'center',
          }}>
            <IcoSearch />
          </div>
          <input
            type="text"
            placeholder="Buscar por expediente, entidad o CUIT..."
            value={filtros.busqueda ?? ''}
            onChange={handleChange('busqueda')}
            style={{ ...inputStyle, paddingLeft: 34 }}
            aria-label="Buscar"
          />
        </div>

        <div style={{ flex: '1 1 130px' }}>
          <select value={filtros.estado ?? ''} onChange={handleChange('estado')} style={selectStyle} aria-label="Estado">
            <option value="">Estado (Todos)</option>
            {ESTADOS_LIST.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>

        <div style={{ flex: '1 1 120px' }}>
          <select value={filtros.provincia ?? ''} onChange={handleChange('provincia')} style={selectStyle} aria-label="Provincia">
            <option value="">Provincia</option>
            {PROVINCIAS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div style={{ flex: '1 1 130px' }}>
          <select value={filtros.responsable ?? ''} onChange={handleChange('responsable')} style={selectStyle} aria-label="Responsable">
            <option value="">Responsable</option>
            {(responsables ?? []).map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
          <button
            style={{
              padding: '8px 22px',
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
          <button
            onClick={onLimpiar}
            style={{
              background: 'none', border: 'none',
              color: '#37BBED', fontSize: 13, fontWeight: 500,
              cursor: 'pointer', padding: '8px 4px',
              whiteSpace: 'nowrap',
            }}
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}
