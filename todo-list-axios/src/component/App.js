import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [lastId, setLastId] = useState(200);

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

  const addTodo = () => {
    console.log(input);
    setLastId(lastId + 1);
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        userId: 1,
        id: lastId,
        title: input,
        completed: false,
      })
      .then((res) => {
        console.log(res.data);

        setToDos([res.data]);
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
