import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL =
  "https://my-json-server.typicode.com/codegym-vn/mock-api-books/books";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setBooks(response.data))
      .catch((error) => console.error(`Error: ${error}`));
  }, []);

  const deleteBook = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => { 
        alert("Delete successful");
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <div className="container">
      <h1>Library</h1>
      <Link to="/add" className="btn btn-primary mb-3">
        Add a new Book
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.quantity}</td>

              <td>
                <Link to={`/edit/${book.id}`} className="btn btn-warning mx-4 ">
                  Edit
                </Link>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
