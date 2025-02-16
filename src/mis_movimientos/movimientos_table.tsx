import React from 'react';
import './movimientos_table.css';

// Solo la imagen de detalles
import iconDetalles from '../assets/detalles.png';

interface Movimiento {
  fecha: string;
  valor: string;
  descripcion: string;
  estado: string;
}

const MovimientosTable: React.FC = () => {
  const data: Movimiento[] = [
    { fecha: '12/02/2025', valor: '$10,000', descripcion: 'Transferencia a Nequi', estado: 'En proceso' },
    { fecha: '11/02/2025', valor: '$10,000', descripcion: 'Transferencia a Nequi', estado: 'Aprobado' },
    { fecha: '10/02/2025', valor: '$10,000', descripcion: 'Transferencia a Nequi', estado: 'Aprobado' },
    { fecha: '09/02/2025', valor: '$10,000', descripcion: 'Transferencia a Nequi', estado: 'Aprobado' },
    { fecha: '08/02/2025', valor: '$10,000', descripcion: 'Transferencia a Nequi', estado: 'Rechazado' }
  ];

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
            {/* Columna descripción en color #508CA4 (ver CSS) */}
            <td className="descripcion">{mov.descripcion}</td>
            <td>
              <span className={`estado-pill ${getEstadoClass(mov.estado)}`}>
                {mov.estado}
              </span>
            </td>
            <td>
              {/* Botón circular #BFD7EA con solo la imagen de detalles */}
              <button className="detalles-btn">
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
