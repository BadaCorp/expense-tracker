import React from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../features/transactions/transactionsSlice.ts";

interface TransactionProps {
  transaction: {
    id: string;
    description: string;
    category: string;
    amount: number;
  };
}

const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  const dispatch = useDispatch();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteTransaction(transaction));
  };

  return (
    <li className="new-transaction">
      <span>
        {transaction.amount} – {transaction.category}{" "}
        <span className="description">( {transaction.description} )</span>
      </span>
      <button onClick={handleDelete} aria-label="Remove">
        X
      </button>
    </li>
  );
};

export default Transaction;
