export const API_URL = 'https://fluxbank-delta.vercel.app';

export interface Transaction {
  sourceAccount: string;
  destinationAccount: string;
  accountType: 'ahorro' | 'corriente';
  amount: number;
}

export interface TransactionCreated extends Transaction {
  id: string;
  createdAt: string;
}

/* POST /transactions → guarda y devuelve la transacción creada */
export async function createTransaction(
  tx: Transaction,
): Promise<TransactionCreated> {
  const resp = await fetch(`${API_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tx),
  });
  if (!resp.ok) throw new Error('Error al crear transacción');
  return resp.json() as Promise<TransactionCreated>;
}

/* GET /transactions → listado de transacciones del usuario */
export async function getTransactions(): Promise<TransactionCreated[]> {
  const resp = await fetch(`${API_URL}/transactions`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  if (!resp.ok) throw new Error('Error al obtener transacciones');
  return resp.json() as Promise<TransactionCreated[]>;
}
