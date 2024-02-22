import React, { useState } from "react";
import axios from "axios";

const API_URL =
  "https://my-json-server.typicode.com/codegym-vn/mock-api-books/books";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");

  const addBook = () => {
    axios
      .post(API_URL, { title, quantity })
      .then((response) => {
        alert(`Add book successful: ${response.data.title}`);
        window.location.href = "/";
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <div>
      <h1>Add a new Book</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />
      <button onClick={addBook}>Add</button>
    </div>
  );
};

export default AddBook;
