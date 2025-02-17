import React from 'react';
import './movimientos_table.css';
import iconDetalles from '../../assets/detalles.png';

export interface Movimiento {
  transactionId: string;
  sourceAccount: string;
  destinationAccount: string;
  date: string;
  time: string;
  amount: string;
  descripcion?: string;
  status: string;
  canal?: string;
  
}

interface MovimientosTableProps {
  data: Movimiento[];
  onDetallesClick?: (mov: Movimiento) => void;
}

const MovimientosTable: React.FC<MovimientosTableProps> = ({ data, onDetallesClick }) => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'inprogress':
        return 'estado-en-proceso';
      case 'approved':
        return 'estado-aprobado';
      case 'rejected':
        return 'estado-rechazado';
      default:
        return '';
    }
  };

  return (
    <table className="movimientos-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Descripción</th>
          <th>Status</th>
          <th>Detalles</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={5} className="no-data">No hay transacciones registradas.</td>
          </tr>
        ) : (
          data.map((mov, idx) => (
            <tr key={idx}>
              <td>{mov.date}</td>
              <td>{mov.amount}</td>
              <td className="descripcion">
                {mov.descripcion ? mov.descripcion : "Sin descripción"}
              </td>
              <td>
                <span className={`status-pill ${getStatusClass(mov.status)}`}>
                  {mov.status}
                </span>
              </td>
              <td>
                <button className="detalles-btn" onClick={() => onDetallesClick?.(mov)}>
                  <img src={iconDetalles} alt="Detalles" />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default MovimientosTable;
