import { Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./Pages/Home";
import Login from "./Pages/login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp/:role" element={<SignUp/>}/>
       <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
