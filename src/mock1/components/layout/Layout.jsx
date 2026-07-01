import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F5F6F8', minWidth: 0 }}>
          <main style={{ flex: 1, padding: '24px 28px' }}>
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
