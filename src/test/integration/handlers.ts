// test/integration/handlers.ts
import { rest } from 'msw';

const API = process.env.API_URL ?? '';

export const handlers = [
  rest.post(`${API}/oauth/token`, (req: any, res: any, ctx: any) =>
    res(ctx.status(200), ctx.json({ accessToken: 'tok' }))
  ),

  rest.get(`${API}/profile`, (req: any, res: any, ctx: any) =>
    res(ctx.status(200), ctx.json({ user: { role: 'admin' } }))
  ),

  rest.get(`${API}/movimientos`, (req: any, res: any, ctx: any) =>
    res(ctx.status(200), ctx.json({ movimientos: [] }))
  ),

  rest.get(`${API}/users`, (req: any, res: any, ctx: any) =>
    res(ctx.status(200), ctx.json({ users: [] }))
  )
];
