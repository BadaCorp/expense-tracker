import React from "react";
import { useSelector } from "react-redux";
import { selectBudgets } from "./budgetsSlice.ts";
import Budget from "../../components/Budget.tsx";

const Transactions = () => {
  const budgets = useSelector(selectBudgets);
  console.log(budgets);
  return (
    <ul className="comments-container">
      {budgets.map((budget) => (
        <Budget budget={budget} key={budget.category} />
      ))}
    </ul>
  );
};

export default Transactions;
