import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import Nav from '../components/Nav'
import Footer from "../components/Footer";
import { GoogleLogin } from 'react-google-login'

const clientId = "147882014855-3832v5d3qoi2rdgqutqme655ia02p65v.apps.googleusercontent.com"


function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authtoken", json.authToken);
      navigate("/");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const onSuccess=(res)=>{
    console.log('Login Success: currentUser:', res.profileObj);
  }

  const onFailure=(res)=>{
    console.log('Login Failed: currentUser:', res.profileObj);
  }

  return (
    <>
    <Nav />
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-box p-4 shadow">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <Link to="/signup" className="btn btn-danger w-100 mt-3">
            I'm a new User
          </Link>
          <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Login;
