import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteTransaction,
  Transaction,
} from "../features/transactions/transactionsSlice.ts";

interface TransactionProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionProps) {
  const dispatch = useDispatch();
  const formatCurrency = (value: number): string => `$${value.toFixed(2)}`;

  const formatDate = (createdAt: string): string => {
    const parsedDate = Date.parse(createdAt);

    if (Number.isNaN(parsedDate)) {
      return "Unknown";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(parsedDate);
  };

  const handleDelete = (transaction: Transaction) => {
    dispatch(
      deleteTransaction({
        id: transaction.id,
        category: transaction.category,
      })
    );
  };

  return (
    <section className="new-transactions-section">
      <h3 className="section-heading">Transaction History</h3>

      {transactions.length === 0 ? (
        <p className="empty-state">
          No transactions yet. Add your first expense to populate this table.
        </p>
      ) : (
        <div className="table-scroll">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td data-label="Date">{formatDate(transaction.createdAt)}</td>
                  <td className="table-category" data-label="Category">
                    {transaction.category}
                  </td>
                  <td data-label="Description">{transaction.description}</td>
                  <td className="table-amount" data-label="Amount">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td data-label="Actions">
                    <button
                      onClick={() => handleDelete(transaction)}
                      className="delete-button"
                      aria-label={`Delete ${transaction.description}`}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
