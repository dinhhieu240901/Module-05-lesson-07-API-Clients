import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./components/BooksList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/add" element={<AddBook />} />
      <Route path="/edit/:id" element={<EditBook />} />
    </Routes>
  </Router>
);

export default App;
