import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({

    name: '',
    password: '',
    email: '',
    phoneNumber: '',
    profession: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
   
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    }

    if (!formData.profession) {
      newErrors.profession = 'Profession is required';
    }

    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      // Retrieve existing user data from local storage
      const existingUserDataString = localStorage.getItem('userData');
      let existingUserData = [];
  
      if (existingUserDataString) {
        // Convert the JSON string to an array if it exists
        try {
          existingUserData = JSON.parse(existingUserDataString);
          if (!Array.isArray(existingUserData)) {
            existingUserData = [];
          }
        } catch (error) {
          // Handle JSON parsing errors
          console.error(error);
          existingUserData = [];
        }
      }
  
      // Check if the user with the same email already exists
      const userExists = existingUserData.some(
        (user) => user.email === formData.email
      );
  
      if (userExists) {
        alert('User with the same email already exists!');
      } else {
        // Append the new user data to the existing data
        existingUserData.push(formData);
  
        // Store the updated data in local storage
        localStorage.setItem('userData', JSON.stringify(existingUserData));
  
        // Log the retrieved data
        console.log(existingUserData);
  
        alert('Registration successful!');
        navigate('/Login');
      }
    }
  };
  
  
  
  

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        </div>
        <div className="form-group">
          <select
            name="profession"
            value={formData.profession}
            onChange={handleChange}
          >
            <option value="">Select Profession</option>
            <option value="Backend Devolper">Backend Devolper</option>
            <option value="Frontend Devolper">Frontend Devolper</option>
            <option value="FullStack Devloperr">FullStack Devloper</option>
            <option value="Database manager">Database manager</option>
            <option value="Database administrator">Database administrator</option>
          </select>
          {errors.profession && <p className="error-message">{errors.profession}</p>}
        </div>
        <button type="submit" onClick={handleSubmit}>
        Sign Up
      </button>
      </form>
    </div>
  );
};

export default Signup;
