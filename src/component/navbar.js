import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navb() {
  const navigate=useNavigate() 
  const location = useLocation();
  const logout=()=>{
    localStorage.removeItem('token')
    if(localStorage.getItem('token')){

    }else{}
       navigate('/signup')
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#a">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link to="/"
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  href="#a"
                >
                  Home
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/about"
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                >
                  About
                </Link>
            </li>
          </ul>
          <form className="d-flex">
              {localStorage.getItem('token')?<button  className="btn btn-primary mx-2" onClick={logout}>
                Logout
              </button>:<><Link to='/login' className="btn btn-primary mx-2" role="button">
                Login
              </Link>
              <Link to='/signup' className="btn btn-primary mx-2" role="button">
                SignUp
              </Link></>}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navb;
