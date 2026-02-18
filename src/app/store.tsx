import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionsSlice.ts";
import budgetsReducer from "../features/budgets/budgetsSlice.ts";
import {
  CATEGORIES,
  Category,
  createInitialTransactionsState,
  TransactionsState,
} from "../features/transactions/transactionsSlice.ts";
import {
  BudgetsState,
  createInitialBudgetsState,
} from "../features/budgets/budgetsSlice.ts";

const STORAGE_KEY = "expense-tracker-state-v1";

type PersistedState = {
  budgets: BudgetsState;
  transactions: TransactionsState;
};

const sanitizeBudgets = (rawBudgets: unknown): BudgetsState => {
  const defaultBudgets = createInitialBudgetsState();

  if (!Array.isArray(rawBudgets)) {
    return defaultBudgets;
  }

  return defaultBudgets.map((defaultBudget) => {
    const matchingBudget = rawBudgets.find((budget) => {
      if (!budget || typeof budget !== "object") {
        return false;
      }

      const candidateBudget = budget as { category?: unknown };
      return candidateBudget.category === defaultBudget.category;
    }) as { amount?: unknown } | undefined;

    return {
      ...defaultBudget,
      amount:
        matchingBudget && Number.isFinite(Number(matchingBudget.amount || 0))
          ? Number(matchingBudget.amount)
          : defaultBudget.amount,
    };
  });
};

const sanitizeTransactions = (rawTransactions: unknown): TransactionsState => {
  const defaultTransactions = createInitialTransactionsState();

  if (!rawTransactions || typeof rawTransactions !== "object") {
    return defaultTransactions;
  }

  const parsedTransactions = rawTransactions as Record<string, unknown>;

  CATEGORIES.forEach((category) => {
    const categoryTransactions = parsedTransactions[category];

    if (!Array.isArray(categoryTransactions)) {
      return;
    }

    defaultTransactions[category] = categoryTransactions.reduce(
      (sanitizedTransactions, transaction) => {
        if (!transaction || typeof transaction !== "object") {
          return sanitizedTransactions;
        }

        const item = transaction as {
          id: string;
          description: string;
          amount: number;
          createdAt?: string;
        };

        if (
          typeof item.id !== "string" ||
          typeof item.description !== "string" ||
          !Number.isFinite(Number(item.amount))
        ) {
          return sanitizedTransactions;
        }

        sanitizedTransactions.push({
          id: item.id,
          category: category as Category,
          description: item.description,
          amount: Number(item.amount),
          createdAt: item.createdAt || new Date(0).toISOString(),
        });

        return sanitizedTransactions;
      },
      [] as TransactionsState[Category]
    );
  });

  return defaultTransactions;
};

const loadState = (): PersistedState | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const serializedState = window.localStorage.getItem(STORAGE_KEY);

    if (!serializedState) {
      return undefined;
    }

    const parsedState = JSON.parse(serializedState) as {
      budgets?: unknown;
      transactions?: unknown;
    };

    return {
      budgets: sanitizeBudgets(parsedState.budgets),
      transactions: sanitizeTransactions(parsedState.transactions),
    };
  } catch {
    return undefined;
  }
};

const saveState = (state: PersistedState): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem(STORAGE_KEY, serializedState);
  } catch {
    // Intentionally ignored to avoid breaking UI when storage is unavailable.
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budgets: budgetsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();

  saveState({
    budgets: state.budgets,
    transactions: state.transactions,
  });
});

export default store;
