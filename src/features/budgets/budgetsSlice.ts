import { createSlice } from "@reduxjs/toolkit";

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
];
const initialState = CATEGORIES.map((category) => ({
  category: category,
  amount: 0,
}));

const budgetsSlice = createSlice({
  name: "budgets",
  initialState: initialState,
  reducers: {
    editBudget: (state, action) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].category === action.payload.category) {
          state[i].amount = action.payload.amount;
          break;
        }
      }
    },
  },
});

export const selectBudgets = (state) => state.budgets;
export default budgetsSlice.reducer;
export const { editBudget } = budgetsSlice.actions;
