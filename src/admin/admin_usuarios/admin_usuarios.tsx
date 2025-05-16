interface Account {
  accountNumber: string;
  accountType: string;
  balance: number;
}

interface User {
  username: string;
  accounts: Account[];
}

type UsersResponse = { users: User[] };

import React, { useState, useEffect } from 'react';
import './admin_usuarios.css';
import { API_URL } from '../../api';

const AdminUsuarios: React.FC = () => {
  const [usuariosData, setUsuariosData] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }

        const data: UsersResponse = await response.json();
        setUsuariosData(data.users);
      } catch (err) {
        console.error(err);
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
          {usuariosData.map((usuario) => (
            <tr key={usuario.username}>
              <td>{usuario.username}</td>
              <td>
                {usuario.accounts.length ? (
                  <ul>
                    {usuario.accounts.map((cuenta) => (
                      <li key={cuenta.accountNumber}>
                        {cuenta.accountNumber} – {cuenta.accountType} – Saldo: ${cuenta.balance}
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