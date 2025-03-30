// src/admin/admin.tsx
import React, { useState } from 'react';
import './admin.css';
import { useNavigate } from 'react-router-dom';
import AdminMovi from './admin_movi/admin_movi';
import AdminUsuarios from './admin_usuarios/admin_usuarios';

const Admin: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<'usuarios' | 'movimientos'>('movimientos');
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="admin-wrapper">
      <header className="admin-header">
        <div className="logo">FluxBank Admin</div>
        <div className="admin-profile">
          <div className="user-initials" onClick={() => setSelectedOption(selectedOption === 'movimientos' ? 'usuarios' : 'movimientos')}>
            Admin
          </div>
          <div className="profile-dropdown">
            <button onClick={handleLogOut}>Cerrar sesión</button>
          </div>
        </div>
      </header>

      <main className="admin-content">
        <button onClick={() => setSelectedOption('usuarios')}>Usuarios registrados</button>
        <button onClick={() => setSelectedOption('movimientos')}>Todos los movimientos</button>

        {selectedOption === 'usuarios' ? <AdminUsuarios /> : <AdminMovi />}
      </main>
    </div>
  );
};

export default Admin;
