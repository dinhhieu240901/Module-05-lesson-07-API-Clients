import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const getUsers = axios.get("http://localhost:3001/api/users");
    const getArrticle = axios.get("http://localhost:3001/api/articles");

    axios
      .all([getUsers, getArrticle])
      .then(
        axios.spread((res1, res2) => {
          const usersWithArticles = res1.data.map((user) => {
            return {
              ...user,
              article: res2.data.filter((item) => {
                return item.user_id === user.id;
              }),
            };
          });
          this.setState({ users: usersWithArticles });
        })
      )
      .catch((error) => {
        throw error;
      });
  }

  render() {
    const { users } = this.state;
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
}

export default App;
