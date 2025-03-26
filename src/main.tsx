import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './login/login';
import Register from './register/register';
import Transacciones from './transacciones/transacciones';
import MisMovimientos from './mis_movimientos/mis_movimientos';
import Detalles from './detalles/detalles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/transacciones" element={<Transacciones />} />
      <Route path="/movimientos" element={<MisMovimientos />} />
      {/* Ruta para Detalles del Movimiento */}
      <Route path="/detalles/:id" element={<Detalles />} />
    </Routes>
  </Router>
);
