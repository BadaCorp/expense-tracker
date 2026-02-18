import { createSlice } from "@reduxjs/toolkit";
import { CATEGORIES, Category } from "../transactions/transactionsSlice";

export interface Budget {
  category: Category;
  amount: number;
}

export type BudgetsState = Budget[];

export const createInitialBudgetsState = (): BudgetsState =>
  CATEGORIES.map((category) => ({
    category,
    amount: 0,
  }));

const initialState: BudgetsState = createInitialBudgetsState();

const budgetsSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    editBudget: (state, action: { payload: Budget }) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].category === action.payload.category) {
          state[i].amount = action.payload.amount;
          break;
        }
      }
    },
  },
});

export const selectBudgets = (state: { budgets: BudgetsState }) => state.budgets;
export default budgetsSlice.reducer;
export const { editBudget } = budgetsSlice.actions;
