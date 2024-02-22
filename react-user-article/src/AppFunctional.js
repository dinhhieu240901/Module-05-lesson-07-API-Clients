import axios from "axios";
import React, { useEffect, useState } from "react";

function AppFunctional() {
  const [users, setUsers] = useState([]);

  //   useEffect(() => {
  //     const getUsers = axios.get("http://localhost:3001/api/users");
  //     const getArticles = axios.get("http://localhost:3001/api/articles");

  //     axios
  //       .all([getUsers, getArticles])
  //       .then(
  //         axios.spread((res1, res2) => { 
  //           const usersWithArticles = res1.data.map((user) => {
  //             return {
  //               ...user,
  //               articles: res2.data.filter((item) => {
  //                 return item.user_id === user.id;
  //               }),
  //             };
  //           });

  //           setUsers(usersWithArticles);
  //         })
  //       )
  //       .catch((err) => {
  //         throw err;
  //       });
  //   }, []);

  useEffect(() => {
    const getUsers = axios.get("http://localhost:3001/api/users");
    const getArticles = axios.get("http://localhost:3001/api/articles");
    axios
      .all([getUsers, getArticles])
      .then(
        axios.spread((res1, res2) => {
          const usersWithArticles = res1.data.map((user) => {
            const userArticles = res2.data.filter(
              (article) => article.user_id === user.id  
            );
            return { ...user, article: userArticles };
          });
          setUsers(usersWithArticles);
        })
      )
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <ul>
            <li>{user.article.length}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AppFunctional;
