import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './layout/header';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  // Submit function
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', loginData);
      const { success, message } = response.data;

      if (success) {
        console.log('Login Successfully');
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error('Login error', error);
    }

    setLoginData({
      username: '',
      password: '',
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center bg-light vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2> Log In </h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                <strong>Username</strong>
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="username"
                placeholder="Enter username"
                name="username"
                value={loginData.username}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                className="form-control rounded-0"
                id="password"
                placeholder="Enter password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 rounded-0">
              Log In
            </button>
            <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 mt-10">
              Sign Up
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
