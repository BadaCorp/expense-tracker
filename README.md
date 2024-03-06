[![Netlify Status](https://api.netlify.com/api/v1/badges/e9aed493-5e34-4011-868d-8acc495287e8/deploy-status)](https://app.netlify.com/sites/badacorp-expense-tracker/deploys)

# Expense Tracker

This project is a budgeting and expense-tracking app that allows you to set budgets for various categories and track transactions in those categories, such as food and transportation. It then sums your spending in each category to calculate the amount of money that remains.

## State
This application has two slices of state:

* budgets: An array of objects representing the budget amount for each category.
* transactions: An object that maps the user's transactions by category.


```
{
  "budgets": [ 
    { "category": "housing", "amount": 400 },
    { "category": "food", "amount": 100 },
    ...
  ],
  "transactions": {
    "housing": [ 
      { 
        "category": "housing", 
        "description": "rent", 
        "amount": 400, 
        "id": 123 
      }
    ],
    "food": [ 
      { 
        "category": "food", 
        "description": "groceries on 1/12/2021", 
        "amount": 50, 
        "id": 456 
      },
      { 
        "category": "food", 
        "description": "dinner on 1/16/2021", 
        "amount": 12, 
        "id": 789 
      },
    ]
  }
}
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

