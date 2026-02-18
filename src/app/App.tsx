import React from "react";
import { useSelector } from "react-redux";
import Budgets from "../features/budgets/Budgets.tsx";
import { selectBudgets } from "../features/budgets/budgetsSlice.ts";
import Transactions from "../features/transactions/Transactions.tsx";
import {
  CATEGORIES,
  selectFlattenedTransactions,
} from "../features/transactions/transactionsSlice.ts";
import SpendingPieChart from "../components/SpendingPieChart.tsx";

const App: React.FC = () => {
  const budgets = useSelector(selectBudgets);
  const transactions = useSelector(selectFlattenedTransactions);

  const totalAllocated = budgets.reduce(
    (runningTotal, budget) => runningTotal + budget.amount,
    0
  );
  const totalSpent = transactions.reduce(
    (runningTotal, transaction) => runningTotal + transaction.amount,
    0
  );
  const savingsRate =
    totalAllocated > 0
      ? ((totalAllocated - totalSpent) / totalAllocated) * 100
      : 0;

  const chartPalette = [
    "#1e63f6",
    "#29b388",
    "#f98f1c",
    "#e5484d",
    "#7e5bef",
    "#1792d2",
    "#f15bb5",
    "#5c7cfa",
    "#00a86b",
  ];

  const spendingByCategory = transactions.reduce<Record<string, number>>(
    (totals, transaction) => {
      totals[transaction.category] =
        (totals[transaction.category] || 0) + transaction.amount;
      return totals;
    },
    {}
  );

  const chartSegments = CATEGORIES.map((category, index) => ({
    label: category[0].toUpperCase() + category.slice(1),
    value: spendingByCategory[category] || 0,
    color: chartPalette[index % chartPalette.length],
  })).filter((segment) => segment.value > 0);

  const formatCurrency = (value: number): string => `$${value.toFixed(2)}`;
  const formatPercent = (value: number): string => `${value.toFixed(1)}%`;

  return (
    <div className="app-shell">
      <header className="app-hero">
        <div>
          <div className="brand-row">
            <img src="/app-logo.svg" alt="FinanceOS logo" className="brand-logo" />
            <span className="brand-name">FinanceOS</span>
          </div>
          <p className="eyebrow">Finance Workspace</p>
          <h1>Personal Finance Dashboard with Real-Time Budget Analytics</h1>
          <p className="hero-copy">
            Set monthly budgets, track expenses live, and monitor spending
            patterns with analytics that update on every transaction.
          </p>
        </div>
        <div className="kpi-grid">
          <article className="kpi-card">
            <p className="kpi-label">Total Monthly Budget</p>
            <p className="kpi-value">{formatCurrency(totalAllocated)}</p>
          </article>
          <article className="kpi-card">
            <p className="kpi-label">Total Spent</p>
            <p className="kpi-value">{formatCurrency(totalSpent)}</p>
          </article>
          <article className="kpi-card">
            <p className="kpi-label">Savings Rate</p>
            <p
              className={`kpi-value ${
                savingsRate < 0 ? "remaining-negative" : "remaining-positive"
              }`}
            >
              {formatPercent(savingsRate)}
            </p>
          </article>
        </div>
      </header>

      <main className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <h2 className="panel-title">Budget Planner</h2>
            <p className="panel-subtitle">
              Set category allocations and compare budgeted vs spent in real
              time.
            </p>
          </div>
          <Budgets />
        </section>

        <div className="dashboard-right-column">
          <section className="panel">
            <SpendingPieChart segments={chartSegments} />
          </section>

          <section className="panel">
            <Transactions />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>Personal Finance Dashboard with Real-Time Budget Analytics</p>
      </footer>
    </div>
  );
};

export default App;
