export default function CampoLectura({ label, value, link }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 5 }}>
        {label}
      </div>
      {link ? (
        <a href={link} style={{ fontSize: 14, color: '#37BBED', fontWeight: 500, textDecoration: 'none' }}>
          {value || '—'}
        </a>
      ) : (
        <div style={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>
          {value || '—'}
        </div>
      )}
    </div>
  );
}
