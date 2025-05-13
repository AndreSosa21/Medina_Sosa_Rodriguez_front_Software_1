// src/test/integration/setupTests.ts
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

// Polyfills para JSDOM (TextEncoder/TextDecoder)
import { TextEncoder, TextDecoder } from 'util';
;(globalThis as any).TextEncoder = TextEncoder;
;(globalThis as any).TextDecoder = TextDecoder;
