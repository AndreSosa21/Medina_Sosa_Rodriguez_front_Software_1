import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Transacciones from '../../../src/transacciones/transacciones';

beforeEach(() => {
  (globalThis as any).fetch = jest.fn()
    // 1) /userProfile
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: { accounts: [{ accountNumber: '12345678', balance: 500 }] }
      })
    })
    // 2) /users (no usado aquí)
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ([{ accounts: ['87654321'] }])
    });
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('alerta si monto > saldo', async () => {
  const { container } = render(
    <BrowserRouter>
      <Transacciones />
    </BrowserRouter>
  );

  // Espera a que cargue el select (balance)
  expect(await screen.findByDisplayValue('*5678')).toBeInTheDocument();

  // Ingresa un monto mayor al saldo y envía
  fireEvent.change(screen.getByPlaceholderText(/Ingrese el monto/i), {
    target: { value: '600' }
  });
  const form = container.querySelector('form')!;
  fireEvent.submit(form);

  // Verifica el alert
  expect(window.alert).toHaveBeenCalledWith('Saldo insuficiente');
});
