export const API_URL = 'https://fluxbank-delta.vercel.app';

// Define an interface for a transaction
export interface Transaction {
    sourceAccount: string;
    destinationAccount: string;
    accountType: string;
    amount: number;
}

// Function to create a new transaction
export const createTransaction = async (transactionData: Transaction): Promise<any> => {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
    });
    return response.json();
};

// Function to get all transactions
export const getTransactions = async (): Promise<any> => {
    const response = await fetch(`${API_URL}`);
    return response.json();
};


