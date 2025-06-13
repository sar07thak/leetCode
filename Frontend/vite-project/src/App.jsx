import { Route , Routes } from "react-router"
import Login from "./Pages/Login"
import HomePage from "./Pages/HomePage"
import Signup from "./Pages/Signup"



function App() {
 
  return (
    <>
    <Routes>
      <Route path="/" element = { <HomePage ></HomePage>}  ></Route>
      <Route path="/login" element ={<Login></Login>}></Route>
      <Route path="/Signup" element ={<Signup></Signup>}></Route>
    </Routes>
    </>
  )
}

export default App
