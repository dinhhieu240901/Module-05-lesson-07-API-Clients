import axios from "axios";
import React, { useEffect, useState } from "react";

function AppFunctional() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUsers = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .get("http://localhost:3001/api/users")
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      }, 3000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getUsers();
        setUsers(result.data);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>User List</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AppFunctional;
