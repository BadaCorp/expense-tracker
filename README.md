[![Netlify Status](https://api.netlify.com/api/v1/badges/e9aed493-5e34-4011-868d-8acc495287e8/deploy-status)](https://app.netlify.com/sites/badacorp-expense-tracker/deploys)

# Personal Finance Dashboard with Real-Time Budget Analytics

A modern expense tracking dashboard built with React + Redux Toolkit.

## Overview

This app helps users:

- Set monthly budgets by category
- Add and delete transactions
- Track spending vs. allocation in real time
- View savings rate analytics
- View spending distribution with a pie chart
- Review transaction history in a table
- Persist data locally using LocalStorage

## Core Features

1. Budget Planner

- Category budget cards
- Allocated, spent, and remaining metrics
- Progress bar for category usage

2. Real-Time Analytics

- Total Monthly Budget
- Total Spent
- Savings Rate

3. Spending Breakdown

- Pie chart by category
- Legend with category totals

4. Transaction History

- Date, category, description, amount
- Delete action for each row

5. Local Persistence

- Redux state for budgets and transactions is saved to LocalStorage
- Data is restored on page load

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Redux
- Create React App

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install

```bash
npm install
```

### Run in Development

```bash
npm start
```

Open:
http://localhost:3000

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## Project Structure (High Level)

- `src/app` - Store and app shell
- `src/features/budgets` - Budget state + feature components
- `src/features/transactions` - Transaction state + feature components
- `src/components` - UI components (budget cards, chart, table, forms)
- `public` - Static assets

## Notes

- This project stores user data in browser LocalStorage and does not use a backend.
- For production hosting, deploy the generated `build` folder.
