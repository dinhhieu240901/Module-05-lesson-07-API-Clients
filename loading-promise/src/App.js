import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
    };
  }
  getUsers = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .get("http://localhost:3001/api/users")
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      }, 3000);
    });
  };
  componentDidMount() {
    this.setState({ loading: true });
    this.getUsers()
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, users } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>User List</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
