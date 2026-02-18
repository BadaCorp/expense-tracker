import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBudget } from "../features/budgets/budgetsSlice.ts";
import {
  selectTransactions,
  Transaction,
} from "../features/transactions/transactionsSlice.ts";

interface BudgetProps {
  budget: {
    category: string;
    amount: number;
  };
}

export default function Budget({ budget }: BudgetProps) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(budget.amount);
  const [saveMessage, setSaveMessage] = useState("");
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    setAmount(budget.amount);
  }, [budget.amount]);

  useEffect(() => {
    if (!saveMessage) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setSaveMessage("");
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [saveMessage]);

  const handleEdit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(editBudget({ category: budget.category, amount: amount || 0 }));
    setSaveMessage("Budget saved");
  };

  const calculateTotalExpenses = (): number => {
    const categoryTransactions = transactions[budget.category] || [];

    return categoryTransactions.reduce(
      (runningTotal: number, transaction: Transaction) =>
        runningTotal + transaction.amount,
      0
    );
  };

  const getFundsRemainingClassName = (value: number): string => {
    if (value === 0) {
      return "neutral";
    }

    return value > 0 ? "positive" : "negative";
  };

  const allocated = budget.amount || 0;
  const spent = calculateTotalExpenses();
  const remainingFunds = allocated - spent;
  const budgetUsage =
    allocated > 0 ? Math.min((spent / allocated) * 100, 100) : 0;
  const fundsRemainingClassName = getFundsRemainingClassName(remainingFunds);
  const formatCurrency = (value: number): string => `$${value.toFixed(2)}`;

  return (
    <li className="budget-card">
      <div className="category-wrapper">
        <div>
          <p className="category-label">Category</p>
          <h3 className="category-value">{budget.category}</h3>
        </div>

        <form onSubmit={handleEdit} className="budget-form">
          <label htmlFor={`budget-${budget.category}`} className="sr-only">
            Set budget amount for {budget.category}
          </label>
          <input
            id={`budget-${budget.category}`}
            className="amount-input"
            value={amount}
            onChange={(e) => setAmount(Number(e.currentTarget.value))}
            type="number"
            step="0.01"
            min="0"
          />
          <button className="update-button">Save</button>
        </form>
      </div>

      <div className="budget-metric-grid">
        <div>
          <p className="metric-label">Allocated</p>
          <p className="metric-value">{formatCurrency(allocated)}</p>
        </div>
        <div>
          <p className="metric-label">Spent</p>
          <p className="metric-value">{formatCurrency(spent)}</p>
        </div>
        <div>
          <p className="metric-label">Remaining</p>
          <p className={`metric-value remaining-funds ${fundsRemainingClassName}`}>
            {formatCurrency(remainingFunds)}
          </p>
        </div>
      </div>

      <div className="budget-progress-track" aria-hidden="true">
        <div
          className="budget-progress-fill"
          style={{ width: `${budgetUsage}%` }}
        />
      </div>

      {saveMessage && <p className="inline-feedback">{saveMessage}</p>}
    </li>
  );
}
