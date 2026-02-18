import React from "react";
import { useSelector } from "react-redux";
import { selectFlattenedTransactions } from "./transactionsSlice.ts";
import TransactionForm from "../../components/TransactionForm.tsx";
import TransactionList from "../../components/TransactionList.tsx";

const Transactions = () => {
  const transactions = useSelector(selectFlattenedTransactions);
  return (
    <div className="transactions-stack">
      <div className="panel-heading">
        <h2 className="panel-title">Transaction History</h2>
        <p className="panel-subtitle">
          Capture expenses quickly and review a real-time history table of all
          spending activity.
        </p>
      </div>
      <TransactionList transactions={transactions} />
      <TransactionForm />
    </div>
  );
};

export default Transactions;
