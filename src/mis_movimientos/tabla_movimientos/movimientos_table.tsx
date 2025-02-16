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
  data?: Movimiento[];
  onDetallesClick?: (mov: Movimiento) => void;
}

const defaultData: Movimiento[] = [
  {
    fecha: '12/02/2025',
    hora: '8:00am',
    valor: '$10,000',
    descripcion: 'Transferencia a Nequi',
    estado: 'En proceso',
    noAprobacion: '6758435-1',
    canal: 'Info. no disponible'
  },
  {
    fecha: '11/02/2025',
    hora: '9:15am',
    valor: '$10,000',
    descripcion: 'Transferencia a Nequi',
    estado: 'Aprobado',
    noAprobacion: '6758435-2',
    canal: 'Info. no disponible'
  },
  {
    fecha: '10/02/2025',
    hora: '3:00pm',
    valor: '$10,000',
    descripcion: 'Transferencia a Nequi',
    estado: 'Aprobado',
    noAprobacion: '6758435-3',
    canal: 'Info. no disponible'
  },
  {
    fecha: '09/02/2025',
    hora: '1:00pm',
    valor: '$10,000',
    descripcion: 'Transferencia a Nequi',
    estado: 'Aprobado',
    noAprobacion: '6758435-4',
    canal: 'Info. no disponible'
  },
  {
    fecha: '08/02/2025',
    hora: '11:30am',
    valor: '$10,000',
    descripcion: 'Transferencia a Nequi',
    estado: 'Rechazado',
    noAprobacion: '6758435-5',
    canal: 'Info. no disponible'
  }
];

const MovimientosTable: React.FC<MovimientosTableProps> = ({
  data = defaultData,
  onDetallesClick
}) => {
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
              <span className={`estado-pill ${getEstadoClass(mov.estado)}`}>
                {mov.estado}
              </span>
            </td>
            <td>
              <button
                className="detalles-btn"
                onClick={() => onDetallesClick?.(mov)}
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
