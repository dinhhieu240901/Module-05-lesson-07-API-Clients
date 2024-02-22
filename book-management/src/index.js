import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import BooksList from "./components/BooksList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import App from "./components/TongHop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksList />}></Route>
        <Route path="/add" element={<AddBook />}></Route>
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
