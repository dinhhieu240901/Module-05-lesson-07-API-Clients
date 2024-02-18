import axios from "axios";
import React, { Component } from "react";
import Users from "./components/Users";
import Articles from "./components/Articles";
import AppFunctional from "./AppFunctional";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      articles: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/users")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => {
        throw err;
      });

    axios
      .get("http://localhost:3001/api/articles")
      .then((res) => {
        this.setState({ articles: res.data });
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { users, articles } = this.state;
    return (
      <div className="horizontal-layout">
        <div className="left-column">
          <h1>Class Components</h1>
          <Users users={users} />
          <Articles articles={articles} />
        </div>
        <div className="right-column">
          <h1>Functional Components with Hooks</h1>
          <AppFunctional />
        </div>
      </div>
    );
  }
}

export default App;
