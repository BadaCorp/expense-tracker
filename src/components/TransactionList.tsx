import React from "react";
import Transaction from "./Transaction.tsx";

interface TransactionProps {
  transactions: {
    id: string;
    description: string;
    amount: number;
    category: string;
  }[];
}

export default function TransactionList({ transactions }: TransactionProps) {
  return (
    <section className="new-transactions-section">
      <h2>Transactions</h2>
      <ul className="new-transaction-list">
        {transactions.map((t) => (
          <Transaction transaction={t} key={t.id} />
        ))}
      </ul>
    </section>
  );
}
