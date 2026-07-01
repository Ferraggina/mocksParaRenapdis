import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tablero from './routes/Tablero.jsx';
import DetalleExpediente from './routes/DetalleExpediente.jsx';

export default function App() {
  return (
    <BrowserRouter basename="/mock1">
      <Routes>
        <Route path="/" element={<Tablero />} />
        <Route path="/expediente/:id" element={<DetalleExpediente />} />
      </Routes>
    </BrowserRouter>
  );
}
