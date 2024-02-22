import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/todos")
  //     .then((res) => {
  //       setToDos(res.data);
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // }, []);

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

  const addTodo = () => {
    console.log(input);
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: input,
      })
      .then((res) => {
        console.log(res.data);

        setToDos([...todos, res.data]);
        setInput("");
        alert("Todo added successfully");
        console.log(todos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={input} onChange={handleChangeInput} />
      <button onClick={addTodo}>Submit</button>
      <ul>
        {todos.map((todo) => (
          <>
            <li key={todo.id}>{todo.title}</li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default App;
