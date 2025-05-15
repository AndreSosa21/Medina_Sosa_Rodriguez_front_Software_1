// src/test/pages/MisMovimientos.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MisMovimientos from '../../mis_movimientos/mis_movimientos';

beforeEach(() => {
  (globalThis as any).fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      user: {
        accounts: [
          { accountNumber: '0000000000001111', balance: 100 },
          { accountNumber: '0000000000001234', balance: 200 }
        ]
      }
    })
  });
});

test('muestra movimientos y cambia al seleccionar otra cuenta', async () => {
  render(
    <BrowserRouter>
      <MisMovimientos />
    </BrowserRouter>
  );

  // 1) El <select> debe mostrar por defecto la opción completa, no solo "1111"
  //    La etiqueta de la opción es "Cuenta de Ahorros *1111"
  expect(
    await screen.findByDisplayValue(/Cuenta de Ahorros \*1111/)
  ).toBeInTheDocument();

  // 2) Valores iniciales: $5,000 y $20,000
  expect(await screen.findByText('$5,000')).toBeInTheDocument();
  expect(await screen.findByText('$20,000')).toBeInTheDocument();

  // 3) Cambia a la opción cuyo texto incluye "*1234"
  fireEvent.change(screen.getByLabelText(/Producto:/i), {
    target: { value: '1234' }
  });

  // 4) Ahora debe mostrar dos celdas con $10,000
  const diezMil = await screen.findAllByText('$10,000');
  expect(diezMil).toHaveLength(2);

  // 5) Verifica que hay 1 fila de encabezado + 2 filas de datos = 3 filas
  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(3);
});
