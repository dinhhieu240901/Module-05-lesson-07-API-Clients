import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditContact = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts/${id}`
      )
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleImageUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    const fd = new FormData();
    fd.append("file", selectedFile);
    axios
      .post("https://v2.convertapi.com/upload", fd)
      .then((res) => {
        console.log(res.data.Url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveContact = () => {
    const contactData = {
      name,
      email,
      phone,
    };
    if (selectedFile) {
      const fd = new FormData();
      fd.append("file", selectedFile);
      axios
        .post("https://v2.convertapi.com/upload", fd)
        .then((res) => {
          contactData.image = res.data.Url;
          updateContact(contactData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      updateContact(contactData);
    }
  };

  const updateContact = (contactData) => {
    axios
      .put(
        `https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts/${id}`,
        contactData
      )
      .then(() => {
        alert("Contact updated successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating contact:", err);
      });
  };

  return (
    <div>
      <h1>Edit Contact</h1>
      <input type="file" onChange={handleImageUpload} />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />
      <button onClick={handleSaveContact}>Save</button>
    </div>
  );
};

export default EditContact;
