import { Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./Pages/Home";
import Login from "./Pages/login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import StoreEdit from "./Pages/StoreEdit";
import ModernDigitalPage from "./Pages/ModernDigitalPage";
import ClassicDigitalPage from "./Pages/ClassicDigitalPage";
import MinimalDigitalPage from "./Pages/MinimalDigitalPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp/:role" element={<SignUp/>}/>
       <Route path="/dashboard" element={<Dashboard/>}/>
       <Route path="/Store-Edit/:shopId" element={<StoreEdit></StoreEdit>}></Route>
       <Route path="/digital-page/:id/modern" element={<ModernDigitalPage></ModernDigitalPage>}></Route>
       <Route path="/digital-page/:id/clasic" element={<ClassicDigitalPage></ClassicDigitalPage>}></Route>
       <Route path="/digital-page/:id/minimal" element={<MinimalDigitalPage></MinimalDigitalPage>}></Route>
    </Routes>
  );
}

export default App;
