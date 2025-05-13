// cypress/support/e2e.ts

// Captura excepciones no atrapadas en la aplicación
Cypress.on('uncaught:exception', (err) => {
  // Ignora sólo este error concreto de React Router
  if (
    err.message.includes(
      'A <Route> is only ever to be used as the child of <Routes>'
    )
  ) {
    return false;
  }
  // Para cualquier otro error, deja que falle la prueba
  return true;
});
