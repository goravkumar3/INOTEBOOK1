import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
function Signup() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        });
        let history=useNavigate()
        const onchange = (e) => {
          setData({ ...data, [e.target.name]: e.target.value });
        };
      const handleSignUp=async (e)=>{
          e.preventDefault();
          const response = await fetch(`http://127.0.0.1:5000/api/auth/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
        body: JSON.stringify({name:data.name,email:data.email,password:data.password}),
          
          })
      const Json = await response.json();
      console.log(Json)
      if(Json.succus){
          localStorage.setItem('token',Json.token);
        history('/')
      }
      else{
          alert(Json.error)
      }
              
      }
  return (
    <div className="container">
    <form onSubmit={handleSignUp}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          aria-describedby="emailHelp"
          onChange={onchange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          onChange={onchange}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          onChange={onchange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
    </div>
  );
}

export default Signup;
