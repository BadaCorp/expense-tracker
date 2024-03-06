import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBudget } from "../features/budgets/budgetsSlice.ts";
import { selectTransactions } from "../features/transactions/transactionsSlice.ts";
import { Transaction } from "../types/Transaction.ts";

interface BudgetProps {
  budget: {
    category: string;
    amount: number;
  };
}

export default function Budget({ budget }: BudgetProps) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(budget.amount);
  const transactions = useSelector(selectTransactions);

  const handleEdit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(editBudget({ category: budget.category, amount: amount }));
  };

  const calculateTotalExpenses = (): number => {
    return transactions[budget.category]
      .map((transaction: Transaction) => transaction.amount)
      .reduce((amount1: string, amount2: string) => amount1 + amount2, 0);
  };

  const getFundsRemainingClassName = (amount: string): string | null => {
    if (parseFloat(amount) === 0) {
      return null;
    }

    return parseFloat(amount) > 0 ? "positive" : "negative";
  };

  const remainingFunds = Number.parseFloat(
    JSON.stringify(budget.amount - calculateTotalExpenses())
  ).toFixed(2);
  const fundsRemainingClassName = getFundsRemainingClassName(remainingFunds);

  return (
    <li className="budget-container">
      <div className="category-label">Category</div>{" "}
      <div className="category-wrapper">
        <h3 className="category-value">{budget.category}</h3>
        <form onSubmit={handleEdit} className="budget-form">
          <input
            className="amount-input"
            value={amount}
            onChange={(e) => setAmount(Number(e.currentTarget.value))}
            type="number"
            step="0.01"
          />
          <button className="update-button">Update</button>
        </form>
      </div>
      <h4 className={`remaining-funds ${fundsRemainingClassName}`}>
        Funds Remaining: {remainingFunds}
      </h4>
    </li>
  );
}
