import React from "react";
import { createRoot } from "react-dom/client";
import store from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";
import axios from "axios";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

axios.defaults.baseURL = process.env.PATH_BACK || "http://localhost:3001";

console.log("process.env.PATH_BACK", process.env.PATH_BACK);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
