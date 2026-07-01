import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F5F6F8', fontFamily: '"Encode Sans", system-ui, sans-serif' }}>
      <Header />
      <main style={{ flex: 1, maxWidth: 1100, width: '100%', margin: '0 auto', padding: '32px 24px', boxSizing: 'border-box' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
