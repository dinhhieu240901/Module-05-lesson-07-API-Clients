import axios from "axios";
import React, { useEffect, useState } from "react";

function AppFunctional() {
  const [users, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  const handleCreate = () => {
    window.location.href = "/user/add";
  };
  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <a href={`/user/${user.id}`}> {user.name} </a>
        </div>
      ))}
      <button type="button" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}

export default AppFunctional;
