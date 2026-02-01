import { BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/Register/Register";
import "../src/index.css";
import "../src/App.css"
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

   
export default function App(){
  return(
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="register" element={<Register/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
   </Routes>
   </BrowserRouter>
  )
}