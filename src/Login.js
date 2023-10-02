import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    name: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setErrorMessage('');
  };

  const validateForm = () => {
    if (!loginData.name || !loginData.password) {
      setErrorMessage('Both Name and Password are required');
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Retrieve existing user data from local storage
      const storedUserDataString = localStorage.getItem('userData');
      const storedUserData = JSON.parse(storedUserDataString);

      if (!Array.isArray(storedUserData)) {
        setErrorMessage('Invalid user data');
      } else {
        // Find a user with matching name and password
        const matchingUser = storedUserData.find(
          (user) =>
            user.name === loginData.name && user.password === loginData.password
        );

        if (matchingUser) {
         alert("Login Successfull!")
          navigate('/Movies');
        } else {
          setErrorMessage('Invalid Credentials');
          console.log()
        }
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={loginData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
