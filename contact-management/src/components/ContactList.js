import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts"
      )
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
      });
  }, []); // Added dependency array to prevent infinite loop

  const handleDelete = (id) => {
    axios
      .delete(
        `https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts/${id}`
      )
      .then(() => {
        alert("Contact deleted successfully!");
        setContacts(contacts.filter((contact) => contact.id !== id));
      })
      .catch((error) => console.error("Error deleting contact:", error));
  };
        
  return (
    <div>
      <h1>Contacts</h1>
      <Link to="/add">
        <button>Add Contact</button>
      </Link>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.name}</strong>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <button>
              <Link to={`/edit/${contact.id}`}>Edit</Link>
            </button>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
