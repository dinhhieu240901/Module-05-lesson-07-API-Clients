import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

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
    <div>
      <h1>Library</h1>
      <Link to="/add">Add a new Book</Link>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.quantity}</p>
          <Link to={`/edit/${book.id}`}>Edit</Link>
          <button onClick={() => deleteBook(book.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

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
