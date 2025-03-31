// src/admin/admin_usuarios/admin_usuarios.tsx
import React, { useState, useEffect } from 'react';
import './admin_usuarios.css';
import { API_URL } from '../../api';

const AdminUsuarios: React.FC = () => {
  const [usuariosData, setUsuariosData] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsuariosData(data.users);
      } else {
        // Manejar errores si es necesario
        console.error('Error al obtener los usuarios');
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="admin-usuarios-wrapper">
      <h2>Usuarios Registrados</h2>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Correo Electrónico</th>
            <th>Cuentas Asociadas</th>
          </tr>
        </thead>
        <tbody>
          {usuariosData.map((usuario, idx) => (
            <tr key={idx}>
              <td>{usuario.username}</td>
              <td>
                {usuario.accounts.length > 0 ? (
                  <ul>
                    {usuario.accounts.map((cuenta: any, index: number) => (
                      <li key={index}>
                        {cuenta.accountNumber} - {cuenta.accountType} - Saldo: ${cuenta.balance}
                      </li>
                    ))}
                  </ul>
                ) : (
                  'No tiene cuentas asociadas'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsuarios;
