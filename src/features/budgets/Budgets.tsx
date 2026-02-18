import React from "react";
import { useSelector } from "react-redux";
import { selectBudgets } from "./budgetsSlice.ts";
import Budget from "../../components/Budget.tsx";

const Budgets = () => {
  const budgets = useSelector(selectBudgets);

  return (
    <ul className="budget-grid">
      {budgets.map((budget) => (
        <Budget budget={budget} key={budget.category} />
      ))}
    </ul>
  );
};

export default Budgets;
