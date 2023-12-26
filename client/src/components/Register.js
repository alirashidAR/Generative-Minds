import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './layout/header';

const Register = () => {
    const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;

    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', registrationData);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
    setRegistrationData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center bg-light vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2> Sign Up </h2>
          <form onSubmit={handleRegistrationSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                <strong>Username</strong>
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="username"
                name="username"
                placeholder="Enter username"
                value={registrationData.username}
                onChange={handleRegistrationChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                className="form-control rounded-0"
                id="email"
                name="email"
                placeholder="Enter email"
                value={registrationData.email}
                onChange={handleRegistrationChange}
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
                name="password"
                placeholder="Enter password"
                value={registrationData.password}
                onChange={handleRegistrationChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
