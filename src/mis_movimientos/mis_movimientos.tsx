import React, { useState, useEffect } from 'react';
import './mis_movimientos.css';
import MovimientosTable, { Movimiento } from './tabla_movimientos/movimientos_table';
import { getTransactions } from '../api'; // Importamos la API para obtener transacciones

import iconTransacciones from '../assets/transacciones.png';
import iconTarjeta from '../assets/targeta.png';
import iconMovimientos from '../assets/movimientos.png';
import iconSeguridad from '../assets/seguridad.png';
import iconAudifonos from '../assets/audifonos.png';
import iconCampana from '../assets/campana.png';

interface MisMovimientosProps {
  onDetallesClick?: (mov: Movimiento) => void;
  onMovimientosClick?: () => void;
  onTransaccionesClick?: () => void;
}

const MisMovimientos: React.FC<MisMovimientosProps> = ({
  onDetallesClick,
  onMovimientosClick,
  onTransaccionesClick
}) => {
  const [selectedProduct, setSelectedProduct] = useState('1234');
  const [transactions, setTransactions] = useState<Movimiento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Función para generar la descripción de la transacción
  const generarDescripcion = (transaction: Movimiento) => {
    console.log("🔍 Procesando transacción:", transaction); // ✅ Verifica la estructura en consola

    if (!transaction.destinationAccount) {
        return "Destino no especificado"; // ✅ Evita errores si destinationAccount es undefined
    }

    if (transaction.sourceAccount.startsWith("1234")) {
        return `Transferencia enviada a ${transaction.destinationAccount}`;
    } else if (transaction.destinationAccount.startsWith("1234")) {
        return `Depósito recibido de ${transaction.sourceAccount}`;
    } else if (transaction.status === "approved") {
        return "Pago exitoso desde tu cuenta";
    } else if (transaction.status === "rejected") {
        return "Transacción rechazada por el banco";
    } else {
        return "Transacción en proceso de validación";
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTransactions();
            
            console.log("📢 Datos obtenidos del backend:", data.transactions); // ✅ Verifica que llegan datos

            if (!data.transactions || data.transactions.length === 0) {
                console.log("❌ No hay transacciones recibidas.");
                return;
            }

            console.log("🔄 Filtrando transacciones por cuenta:", selectedProduct); // ✅ Verifica el valor de `selectedProduct`

            const filteredTransactions = data.transactions
                .filter((transaction: Movimiento) => {
                    const lastFourDigits = transaction.sourceAccount.slice(0,4); // 🔄 Extrae los últimos 4 dígitos de `sourceAccount`
                    console.log(`🔍 Filtrando: ${lastFourDigits} == ${selectedProduct}`); // ✅ Verifica comparación
                    return lastFourDigits === selectedProduct;
                })
                .map((transaction: Movimiento) => {
                    console.log("🛠 Generando descripción para TXN:", transaction.transactionId); // ✅ Verifica que `map()` ahora se ejecuta

                    const descripcionGenerada = generarDescripcion(transaction);
                    console.log("📌 Descripción generada:", descripcionGenerada); // ✅ Verifica que la descripción ahora se genera

                    return {
                        ...transaction,
                        descripcion: descripcionGenerada
                    };
                });

            console.log("✅ Transacciones con descripción:", filteredTransactions); // ✅ Verifica si `descripcion` está en las transacciones

            setTransactions(filteredTransactions);
            setTransactions([]); // Reseteamos temporalmente
            setTimeout(() => setTransactions(filteredTransactions), 0); // Volvemos a cargar los datos

        } catch (err) {
            setError('Error al cargar los movimientos. Intenta nuevamente.');
            console.error('Error fetching transactions:', err);
        } finally {
            setLoading(false);
        }
    };

    fetchTransactions();
}, [selectedProduct]);



  return (
    <div className="mis-movimientos-wrapper">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo">FluxBank</div>
        </div>
        <div className="header-right">
          <span className="welcome-text">Bienvenidx, Andrea Sosa</span>
          <div className="help-bubble">
            <img src={iconAudifonos} alt="Audífonos" className="header-icon" />
            <span>¿Necesitas ayuda?</span>
          </div>
          <button className="notification-btn">
            <img src={iconCampana} alt="Notificaciones" className="header-icon" />
          </button>
          <div className="user-initials">AS</div>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li onClick={onMovimientosClick}>
              <img src={iconTransacciones} alt="Transacciones" className="sidebar-icon" />
            </li>
            <li>
              <img src={iconTarjeta} alt="Tarjeta" className="sidebar-icon" />
            </li>
            <li onClick={onTransaccionesClick}>
              <img src={iconMovimientos} alt="Movimientos" className="sidebar-icon" />
            </li>
            <li>
              <img src={iconSeguridad} alt="Seguridad" className="sidebar-icon" />
            </li>
          </ul>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        <section className="movimientos-section">
          <h2>Mis movimientos</h2>
          <div className="filter-container">
            <label htmlFor="producto-select">Producto:</label>
            <select
              id="producto-select"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="1234">Cuenta de Ahorros *1234</option>
              <option value="5678">Cuenta de Ahorros *5678</option>
            </select>
          </div>

          {loading ? (
            <p>Cargando movimientos...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="table-container">
              <MovimientosTable data={transactions} onDetallesClick={onDetallesClick} />
            </div>
          )}

          <button className="load-more-btn">Cargar más movimientos</button>
        </section>
      </main>
    </div>
  );
};

export default MisMovimientos;
