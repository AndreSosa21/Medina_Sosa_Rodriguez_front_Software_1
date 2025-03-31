// src/index.tsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import AuthLayout from './layout/AuthLayout';
import Login from './login/login';
import Register from './register/register';
import Transacciones from './transacciones/transacciones';
import MisMovimientos from './mis_movimientos/mis_movimientos';
import Detalles from './detalles/detalles';
import Cuenta from './Cuenta/Cuenta';
import Admin from './admin/admin';
import PrivateRoute from './PrivateRoute'; // Importamos la ruta protegida

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>
    <Routes>
      {/* Rutas de autenticación con layout común */}
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Rutas protegidas */}
      <Route path="/transacciones" element={<PrivateRoute element={<Transacciones />} />} />
      <Route path="/movimientos" element={<PrivateRoute element={<MisMovimientos />} />} />
      <Route path="/detalles/:id" element={<PrivateRoute element={<Detalles />} />} />
      <Route path="/cuenta" element={<PrivateRoute element={<Cuenta />} />} />

      {/* Ruta para Admin */}
      <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
    </Routes>
  </Router>
);
