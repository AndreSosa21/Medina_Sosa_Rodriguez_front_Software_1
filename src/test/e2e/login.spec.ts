/// <reference types="cypress" />

describe('Flujo de Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('redirige al dashboard después de login válido', () => {
    cy.get('input[placeholder="Usuario"]').type('user@example.com');
    cy.get('input[placeholder="Contraseña"]').type('password123');

    cy.intercept('POST', '/oauth/token', {
      statusCode: 200,
      body: { accessToken: 'tok' }
    }).as('login');

    cy.intercept('GET', '/profile', {
      statusCode: 200,
      body: { user: { role: 'admin' } }
    }).as('profile');

    cy.contains('Ingresar').click();
    cy.wait('@login');
    cy.wait('@profile');
    cy.url().should('include', '/admin');
  });
});
