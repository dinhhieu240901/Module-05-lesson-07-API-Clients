import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddContact() {
  const [selectedFile, setSelectedFile] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleImageUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const navigate = useNavigate();

  const handleAdd = () => {
    const fd = new FormData();
    if (selectedFile) {
      fd.append("file", selectedFile);
      axios
        .post("https://v2.convertapi.com/upload", fd)
        .then((res) => {
          console.log(res.data.Url);
          addContact(res.data.Url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
          addContact();
    }
  };

  const addContact = (imageUrl = "") => {
    axios
      .post(
        "https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts",
        {
          name,
          email,
          phone,
          image: imageUrl, 
        }
      )
      .then((response) => {
        alert("Contact added successfully!");
        navigate("/");
      })
      .catch((error) => console.error("Error adding contact:", error));
  };

  return (
    <div>
      <h1>Add Contact</h1>
      <label>File</label>
      <input type="file" onChange={handleImageUpload} />
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Phone:</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddContact;
