import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // URL donde corre tu aplicación en desarrollo
    baseUrl: 'http://localhost:5173',

    // Patrón para localizar tus specs E2E
    specPattern: 'src/test/e2e/**/*.spec.ts',

    // Archivo de soporte que se carga antes de cada spec
    supportFile: 'cypress/support/e2e.ts',

    // Tiempo máximo para comandos (opcional)
    defaultCommandTimeout: 8000,
  },
});
