import axios from "axios";
import React, { useEffect, useState } from "react";

function AppFunctional() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return await axios.get("http://localhost:3001/api/users");
  };

  useEffect(() => {
    setLoading(true);
    getUser()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        throw err;
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}> {user.name} </li>
        ))}
      </ul>
    </div>
  );
}

export default AppFunctional;
