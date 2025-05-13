/// <reference types="cypress" />

describe('Mis Movimientos', () => {
  beforeEach(() => {
    // 1) Simula el token en localStorage
    window.localStorage.setItem('token', 'tok');

    // 2) Intercepta la llamada que obtiene las cuentas del usuario
    cy.intercept('GET', '**/userProfile', {
      statusCode: 200,
      body: {
        user: {
          accounts: [
            { accountNumber: '0000000000001111', balance: 100 },
            { accountNumber: '0000000000001234', balance: 200 }
          ]
        }
      }
    }).as('profile');
  });

  it('muestra lista de movimientos y abre detalle', () => {
    // 3) Visita la ruta de movimientos
    cy.visit('/movimientos');

    // 4) Espera a que se resuelva la petición de cuentas
    cy.wait('@profile');

    // 5) La tabla debería tener 2 filas de datos (primer fetch y llenado local)
    cy.get('table.movimientos-table tbody tr').should('have.length', 2);

    // 6) Haz clic en Detalles y comprueba que la URL cambie al detalle correcto
    cy.get('button.detalles-btn').first().click();
    cy.url().should('include', '/detalles/6758435-3');
  });
});
