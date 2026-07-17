import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";

import "./index.css";
import "./styles/theme.css";

import { store } from "./app/store";

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <Provider store={store}>

            <BrowserRouter>

                <App />

            </BrowserRouter>

            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#0f172a",
                  color: "#fff",
                  border: "1px solid #334155"
                },

              }}
            />
        </Provider>

    </React.StrictMode>

);