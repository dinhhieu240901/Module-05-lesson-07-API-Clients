import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersList from "./components/UsersList";
import AddEditUser from "./components/AddEditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersList />}></Route>
        <Route path="/add" element={<AddEditUser />}></Route>
        <Route path="/edit/:id" element={<AddEditUser />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
