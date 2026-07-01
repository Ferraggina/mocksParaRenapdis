import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff', fontFamily: '"Encode Sans", system-ui, sans-serif' }}>
      <Header />
      <main style={{ flex: 1, maxWidth: 960, width: '100%', margin: '0 auto', padding: '32px 24px', boxSizing: 'border-box' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
