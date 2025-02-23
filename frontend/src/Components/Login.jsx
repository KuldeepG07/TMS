import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Login.css';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
  }, [navigate]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Username and password are required!');
      return;
    }
    if (!rememberMe) {
      toast.error('Please check "Agree Terms & Conditions" to proceed.');
      return;
    }

    try {
      const formData = { username: username, password: password };
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("contactNumber", data.contactNumber);
        localStorage.setItem("dob", data.dob);
        localStorage.setItem("userid", data.userid);
        toast.success("Login Successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error logging in. Please try again.");
      console.error("Login Error: ", error);
    }
  };

  return (
    <div className="bg">
      <div className="signin-page">
        <div className="signin-data">
          <div className="signin-left">
            <h1 className="welcome-text">Teacher Management System</h1>
          </div>
          <div className="signin-form">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <div className="password-field">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span onClick={togglePasswordVisibility} className="eye-icon">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className="remember-forgot">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe" style={{marginBottom: 0, fontWeight:400}}>Accept Terms & Conditions</label>
                </div>
              </div>
              <br />
              <button type="submit">Sign In</button>
            </form>
            <div className="extra-options">
              <a href="/signup">Don't have an account? Sign Up</a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;