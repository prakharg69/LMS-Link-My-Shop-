import { Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./Pages/Home";
import Login from "./Pages/login";
import SignUp from "./Pages/SignUp";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/:role" element={<Login />} />
      <Route path="/signUp/:role" element={<SignUp/>}/>
    </Routes>
  );
}

export default App;
