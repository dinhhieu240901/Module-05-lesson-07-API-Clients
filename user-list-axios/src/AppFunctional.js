import axios from "axios";
import React, { useEffect, useState } from "react";
import Users from "./components/Users";
import Articles from "./components/Articles";

function AppFunctional() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        throw err;
      });
    axios
      .get("http://localhost:3001/api/articles")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <div>
      <Users users={users} />
      <Articles articles={articles} />
    </div>
  );
}

export default AppFunctional;
