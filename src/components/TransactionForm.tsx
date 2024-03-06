import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTransaction,
  CATEGORIES,
} from "../features/transactions/transactionsSlice.ts";
import { v4 as uuidv4 } from "uuid";

interface TransactionFormProps {
  categories: string[];
}

const TransactionForm: React.FC<TransactionFormProps> = ({ categories }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTransaction({
        category: category,
        description: description,
        amount: parseFloat(String(amount)),
        id: uuidv4(),
      })
    );
    setCategory(CATEGORIES[0]);
    setDescription("");
    setAmount(0);
  };

  return (
    <section className="new-transaction-section">
      <h2>New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.currentTarget.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              type="text"
            />
          </div>

          <div>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.currentTarget.value))}
              type="number"
              step="0.01"
            />
          </div>
        </div>

        <button>Add Transaction</button>
      </form>
    </section>
  );
};

export default TransactionForm;
