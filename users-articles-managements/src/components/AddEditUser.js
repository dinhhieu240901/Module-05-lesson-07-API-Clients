// AddEditUser.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  useEffect(() => {
    if (id) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `https://my-json-server.typicode.com/codegym-vn/mock-api-users/users/${id}`
          );
          setName(response.data.name);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (id) {
        await axios.put(
          `https://my-json-server.typicode.com/codegym-vn/mock-api-users/users/${id}`,
          { name }
        );
        alert("User updated successfully!");
      } else {
        await axios.post(
          "https://my-json-server.typicode.com/codegym-vn/mock-api-users/users",
          { name }
        );
        alert("User added successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting user:", error);
    }
  };

  return (
    <div>
      <h2>User Detail</h2>
      <label>Name: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>{id ? "Update" : "Add"}</button>
      <button onClick={() => navigate("/    ")}>Back to Home</button>
    </div>
  );
};

export default AddEditUser;
