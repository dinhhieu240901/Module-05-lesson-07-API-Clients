import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL =
  "https://my-json-server.typicode.com/codegym-vn/mock-api-books/books";

const EditBook = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setQuantity(response.data.quantity);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, [id]);

  const saveBook = () => {
    axios
      .put(`${API_URL}/${id}`, { title, quantity })
      .then((response) => {
        alert(`Edit book successful: ${response.data.title}`);
        window.location.href = "/";
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <div>
      <h1>Edit</h1>
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
      <button onClick={saveBook}>Save</button>
    </div>
  );
};

export default EditBook;
