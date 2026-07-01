export default function Footer() {
  return (
    <footer style={{
      borderTop: '2px solid #E5E7EB',
      background: '#fff',
      padding: '28px 24px 24px',
      textAlign: 'center',
      marginTop: 48,
    }}>
      <div style={{
        width: 40, height: 2, background: '#37BBED',
        margin: '0 auto 16px',
        borderRadius: 2,
      }} />
      <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
        Ministerio de Salud
      </div>
      <div style={{ fontSize: 12, color: '#9CA3AF' }}>
        Presidencia de la Nación Argentina © 2024
      </div>
    </footer>
  );
}
