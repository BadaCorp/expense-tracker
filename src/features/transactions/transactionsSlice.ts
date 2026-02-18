import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const CATEGORIES = [
  "housing",
  "food",
  "transportation",
  "utilities",
  "clothing",
  "healthcare",
  "personal",
  "education",
  "entertainment",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Transaction {
  category: Category;
  id: string;
  description: string;
  amount: number;
  createdAt: string;
}

export type TransactionsState = Record<Category, Transaction[]>;

export const createInitialTransactionsState = (): TransactionsState =>
  Object.fromEntries(
    CATEGORIES.map((category) => [category, []])
  ) as unknown as TransactionsState;

const initialState: TransactionsState = createInitialTransactionsState();

const getTransactionTime = (transaction: {
  createdAt?: string;
  id?: string;
}): number => {
  if (transaction.createdAt) {
    const parsed = Date.parse(transaction.createdAt);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return 0;
};

export const selectTransactions = (state: { transactions: TransactionsState }) =>
  state.transactions;

export const selectFlattenedTransactions = (state: {
  transactions: TransactionsState;
}) =>
  Object.values(state.transactions)
    .flat()
    .sort((transactionA, transactionB) => {
      return getTransactionTime(transactionB) - getTransactionTime(transactionA);
    });

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state[action.payload.category].push(action.payload);
    },
    deleteTransaction: (
      state,
      action: PayloadAction<{ category: Category; id: string }>
    ) => {
      state[action.payload.category] = state[action.payload.category].filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
