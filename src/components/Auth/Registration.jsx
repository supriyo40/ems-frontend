import React, { useState } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    username: '',
    email: '',
    password: '',
    role: 'employee', // Default role
  });

  const [message, setMessage] = useState(''); // For success or error messages

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add validation here (e.g., email format, password strength)
    if (!formData.email.includes('@')) {
      setMessage('Invalid email address');
      return;
    }

    // Placeholder for saving data to backend or context
    console.log('User Registered:', formData);
    fetch(`${backendUrl}/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((res)=> res.json())
    .then((data)=> localStorage.setItem('authToken',data.token));

    // Clear the form
    setFormData({
      firstName: '',
      username: '',
      email: '',
      password: '',
      role: 'employee',
    });

    setMessage('Registration successful!');
  };
  
  return (
    <div className="p-5 bg-[#1c1c1c] rounded shadow-md max-w-md mx-auto my-5">
      <h2 className="text-xl text-gray-300 font-bold mb-4">Registration Form</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className=" block text-lg font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="outline-none w-full text-black px-3 py-2 border rounded"
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="outline-none w-full px-3 text-black py-2 border rounded"
            placeholder="Enter username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="outline-none w-full px-3 py-2 text-black border rounded"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="outline-none w-full px-3 py-2 text-black border rounded"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border rounded"
          >
            <option className='text-black' value="employee">Employee</option>
            <option className='text-black' value="admin">Admin</option>
          </select>
        </div>
        <div className='flex justify-center items-center'>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        </div>
      </form>
    </div>
  );
};