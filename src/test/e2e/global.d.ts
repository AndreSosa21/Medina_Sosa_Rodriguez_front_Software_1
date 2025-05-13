/// <reference types="cypress" />

// Extiende Chainable para incluir intercept, as, etc.
declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Mapea cy.intercept para TypeScript
     */
    intercept(
      method: string,
      url: string | RegExp,
      response: any
    ): Chainable<Subject>;

    /**
     * Alias para intercept/route
     */
    as(alias: string): Chainable<Subject>;
  }
}
