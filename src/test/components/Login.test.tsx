// src/test/components/Login.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../../src/login/login';

beforeEach(() => {
  (globalThis as any).fetch = jest.fn()
    // 1) Enviar credenciales válidas → token
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ accessToken: 'tok' }),
    })
    // 2) Luego /profile → rol
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { role: 'admin' } }),
    });
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('valida campos vacíos y luego hace login exitoso', async () => {
  const { container } = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const form = container.querySelector('form')!;

  // 1) envío en vacío → mensaje de validación
  fireEvent.submit(form);
  expect(
    await screen.findByText(/Por favor ingrese usuario y contraseña/i)
  ).toBeInTheDocument();

  // 2) rellena inputs y envía
  fireEvent.change(screen.getByPlaceholderText(/Usuario/i), {
    target: { value: 'u@x.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
    target: { value: 'pass' },
  });
  fireEvent.submit(form);

  // Espera 2 llamadas: token + profile
  await waitFor(() =>
    expect((globalThis as any).fetch).toHaveBeenCalledTimes(2)
  );
});
