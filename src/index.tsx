import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { Provider } from "react-redux";
import store from "./app/store.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
