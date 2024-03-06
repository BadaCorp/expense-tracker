import React from "react";
import { useSelector } from "react-redux";
import { selectFlattenedTransactions } from "./transactionsSlice.ts";
import TransactionForm from "../../components/TransactionForm.tsx";
import TransactionList from "../../components/TransactionList.tsx";

const Transactions = () => {
  const transactions = useSelector(selectFlattenedTransactions);
  return (
    <div className="comments-container">
      <TransactionList transactions={transactions} />
      <TransactionForm categories={undefined} />
    </div>
  );
};

export default Transactions;
