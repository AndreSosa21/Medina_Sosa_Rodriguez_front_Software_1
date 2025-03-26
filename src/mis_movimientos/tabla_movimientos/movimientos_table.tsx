import React from 'react';
import './movimientos_table.css';
import iconDetalles from '../../assets/detalles.png';

export interface Movimiento {
  fecha: string;
  hora: string;
  valor: string;
  descripcion: string;
  estado: string;
  noAprobacion: string;
  canal: string;
}

interface MovimientosTableProps {
  data: Movimiento[];
  onDetallesClick: (mov: Movimiento) => void;
}

const MovimientosTable: React.FC<MovimientosTableProps> = ({ data, onDetallesClick }) => {
  const getEstadoClass = (estado: string) => {
    switch (estado) {
      case 'En proceso':
        return 'estado-en-proceso';
      case 'Aprobado':
        return 'estado-aprobado';
      case 'Rechazado':
        return 'estado-rechazado';
      default:
        return '';
    }
  };

  return (
    <table className="movimientos-table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Valor</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Detalles</th>
        </tr>
      </thead>
      <tbody>
        {data.map((mov, idx) => (
          <tr key={idx}>
            <td>{mov.fecha}</td>
            <td>{mov.valor}</td>
            <td className="descripcion">{mov.descripcion}</td>
            <td>
              <span className={`status-pill ${getEstadoClass(mov.estado)}`}>
                {mov.estado}
              </span>
            </td>
            <td>
              <button
                className="detalles-btn"
                onClick={() => onDetallesClick(mov)}
              >
                <img src={iconDetalles} alt="Detalles" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovimientosTable;
