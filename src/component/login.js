import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
function Login() {
    const [data, setData] = useState({
      email: "",
      password: "",
      });
      let history=useNavigate()
      const onchange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };
    const handleLognin=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://127.0.0.1:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
      body: JSON.stringify({email:data.email,password:data.password}),
        })
    const Json = await response.json();
    console.log(Json)
    if(Json.succus){
        localStorage.setItem('token',Json.token);
      history('/')
    }
    else{
        alert("Please try to login with correct credentials")
    }
            
    }
  return (
    <div className="container">
    <form onSubmit={handleLognin}>
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
      <button type="submit" className="btn btn-primary" >
        Login
      </button>
    </form>
    </div>
  );
}

export default Login;