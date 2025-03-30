// src/admin/admin_movi/admin_movi.tsx
import React, { useState, useEffect } from 'react';
import './admin_movi.css';
import { Movimiento } from '../../mis_movimientos/tabla_movimientos/movimientos_table';
import { API_URL } from '../../api'; // Asegúrate de que esta API_URL esté configurada correctamente

const AdminMovi: React.FC = () => {
  const [movimientosData, setMovimientosData] = useState<Movimiento[]>([]);

  useEffect(() => {
    // Llamada a la API para obtener los movimientos
    const fetchMovimientos = async () => {
      const response = await fetch(`${API_URL}/movimientos`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      setMovimientosData(data.movimientos);
    };

    fetchMovimientos();
  }, []);

  return (
    <div className="admin-movi-wrapper">
      <h2>Todos los movimientos</h2>
      <table className="movimientos-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Valor</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Usuario</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {movimientosData.map((mov, idx) => (
            <tr key={idx}>
              <td>{mov.fecha}</td>
              <td>{mov.valor}</td>
              <td>{mov.descripcion}</td>
              <td>{mov.estado}</td>
              <td><button>Ver detalles</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMovi;
