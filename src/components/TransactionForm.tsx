import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTransaction,
  Category,
  CATEGORIES,
} from "../features/transactions/transactionsSlice.ts";
import { v4 as uuidv4 } from "uuid";

const TransactionForm: React.FC = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [formMessage, setFormMessage] = useState("");

  const isFormValid = description.trim().length > 0 && amount > 0;

  useEffect(() => {
    if (!formMessage) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setFormMessage(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [formMessage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      setFormMessage("Add a description and amount greater than $0.00.");
      return;
    }

    dispatch(
      addTransaction({
        category,
        description: description.trim(),
        amount: parseFloat(String(amount)),
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      })
    );

    setCategory(CATEGORIES[0]);
    setDescription("");
    setAmount(0);
    setFormMessage("Transaction added");
  };

  return (
    <section className="new-transaction-section">
      <h3 className="section-heading">Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="form-input"
              value={category}
              onChange={(e) =>
                setCategory(e.currentTarget.value as Category)
              }
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              type="text"
              placeholder="Coffee with client"
            />
          </div>

          <div className="form-field">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(Number(e.currentTarget.value))}
              type="number"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div className="submit-row">
          <button type="submit" disabled={!isFormValid}>
            Add Transaction
          </button>
          {formMessage && <p className="form-feedback">{formMessage}</p>}
        </div>
      </form>
    </section>
  );
};

export default TransactionForm;
