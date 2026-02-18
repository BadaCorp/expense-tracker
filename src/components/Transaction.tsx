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
  const formatCurrency = (value: number): string => `$${value.toFixed(2)}`;

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction));
  };

  return (
    <li className="new-transaction">
      <div className="transaction-main">
        <span className="transaction-amount">
          {formatCurrency(transaction.amount)}
        </span>
        <div>
          <p className="transaction-category">{transaction.category}</p>
          <p className="description">{transaction.description}</p>
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="delete-button"
        aria-label="Remove transaction"
      >
        x
      </button>
    </li>
  );
};

export default Transaction;
