import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import MisMovimientos from './mis_movimientos/mis_movimientos';
import Detalles from './detalles/detalles';
import Transacciones from './transacciones/transacciones';
import { Movimiento } from './mis_movimientos/tabla_movimientos/movimientos_table';

type Screen = 'movimientos' | 'detalles' | 'transacciones';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('movimientos');
  const [selectedMovimiento, setSelectedMovimiento] = useState<Movimiento | null>(null);

  const handleShowMovimientos = () => {
    setCurrentScreen('movimientos');
  };

  const handleShowDetalles = (mov: Movimiento) => {
    setSelectedMovimiento(mov);
    setCurrentScreen('detalles');
  };

  const handleShowTransacciones = () => {
    setCurrentScreen('transacciones');
  };

  if (currentScreen === 'movimientos') {
    return (
      <StrictMode>
        <MisMovimientos
          onDetallesClick={handleShowDetalles}
          onMovimientosClick={handleShowMovimientos}
          onTransaccionesClick={handleShowTransacciones}
        />
      </StrictMode>
    );
  }

  if (currentScreen === 'detalles') {
    return (
      <StrictMode>
        <Detalles
          movimiento={selectedMovimiento}
          onBack={handleShowMovimientos}
          onMovimientosClick={handleShowMovimientos}
          onTransaccionesClick={handleShowTransacciones}
        />
      </StrictMode>
    );
  }

  return (
    <StrictMode>
      <Transacciones
        onMovimientosClick={handleShowMovimientos}
        onTransaccionesClick={handleShowTransacciones}
      />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
