export default function TabObservaciones({ expediente }) {
  const obs = expediente.observaciones;

  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 10px' }}>Observaciones</h2>
      <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 20px' }} />

      {obs ? (
        <div style={{
          fontSize: 14, color: '#374151', lineHeight: 1.7,
          padding: '16px 20px',
          background: '#FFFBEB',
          border: '1px solid #FDE68A',
          borderRadius: 6,
        }}>
          {obs}
        </div>
      ) : (
        <div style={{ fontSize: 14, color: '#9CA3AF', padding: '40px 0', textAlign: 'center' }}>
          Sin observaciones registradas para este expediente.
        </div>
      )}
    </div>
  );
}
