import React from "react";
import {Routes,Route,useLocation} from 'react-router-dom';
import Home from "../component/home";
import About from "../component/about";
import Signup from "../component/signup";
import Login from "../component/login";
function Animated(){
  const location=useLocation();
    return(
        <div>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home/>} />  
            <Route path='/about' element={<About/>} />
            <Route path='/signup' element={<Signup/>} />   
            <Route path='/login' element={<Login/>} />   
          </Routes>
        </div>
    )
}
export default Animated;