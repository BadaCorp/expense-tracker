import Transactions from "../features/transactions/Transactions.tsx";
import Budgets from "../features/budgets/Budgets.tsx";
import React from "react";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Expense Tracker</h1>
        <Budgets />
        <Transactions />
      </header>
    </div>
  );
};

export default App;
