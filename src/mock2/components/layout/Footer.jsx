const linkStyle = {
  color: '#374151',
  textDecoration: 'none',
  fontSize: 13,
  cursor: 'pointer',
};

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #E5E7EB', background: '#fff', marginTop: 40 }}>
      <div style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '24px 24px 12px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Ministerio de Salud</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacidad', 'Términos y condiciones', 'Contacto', 'Ayuda'].map((l) => (
              <span key={l} style={linkStyle}>{l}</span>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 12 }}>
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>
            Ministerio de Salud - Presidencia de la Nación © 2024
          </span>
        </div>
      </div>
    </footer>
  );
}
