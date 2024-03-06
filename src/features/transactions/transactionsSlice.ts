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

type Category = (typeof CATEGORIES)[number];
type Transaction = {
  category: string;
  id: string;
  description: string;
  amount: number;
};
type State = Record<Category, Transaction[]>;

const initialState: State = Object.fromEntries(
  CATEGORIES.map((category) => [category, []])
) as unknown as State;

export const selectTransactions = (state: { transactions: State }) =>
  state.transactions;
export const selectFlattenedTransactions = (state: { transactions: State }) =>
  Object.values(state.transactions).reduce((a, b) => [...a, ...b], []);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state[action.payload.category].push(action.payload);
    },
    deleteTransaction: (
      state,
      action: PayloadAction<{ category: string; id: string }>
    ) => {
      state[action.payload.category] = state[action.payload.category].filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
