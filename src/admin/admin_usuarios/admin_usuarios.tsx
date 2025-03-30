// src/admin/admin_usuarios/admin_usuarios.tsx
import React, { useState, useEffect } from 'react';
import './admin_usuarios.css';
import { API_URL } from '../../api';

const AdminUsuarios: React.FC = () => {
  const [usuariosData, setUsuariosData] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await fetch(`${API_URL}/usuarios`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      setUsuariosData(data.usuarios);
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="admin-usuarios-wrapper">
      <h2>Usuarios Registrados</h2>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Producto</th>
            <th>Fecha de Registro</th>
          </tr>
        </thead>
        <tbody>
          {usuariosData.map((usuario, idx) => (
            <tr key={idx}>
              <td>{usuario.nombre}</td>
              <td>{usuario.producto ? usuario.producto : 'No tiene'}</td>
              <td>{usuario.fechaRegistro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsuarios;
