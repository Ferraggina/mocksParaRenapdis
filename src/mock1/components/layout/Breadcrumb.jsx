import { Link } from 'react-router-dom';

function IconoCasa() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export default function Breadcrumb({ items }) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        color: '#9CA3AF',
        marginBottom: 4,
      }}
      aria-label="Ruta de navegación"
    >
      {items.map((item, idx) => (
        <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {idx > 0 && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
          {item.href ? (
            <Link
              to={item.href}
              style={{ color: '#9CA3AF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              {idx === 0 && <IconoCasa />}
              {item.label}
            </Link>
          ) : (
            <span style={{ color: '#374151', fontWeight: 600 }}>
              {idx === 0 && <IconoCasa />}
              {' '}{item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
