import React, { useState } from 'react';
import image from '../assets/bg.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://66f168d9415379191550c6e8.mockapi.io/product', formData);
      console.log('Sign up successful:', response.data);
      // Redirect or update UI as needed
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error as needed
    }
  };

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="text-center py-5">
        <div className="flex items-center justify-center">
          <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-white" stroke="currentColor" aria-label="User Icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h2 className="text-4xl text-white tracking-tight">Create a new account</h2>
        <span className="text-sm">
          or <Link to="/login"><div className="text-white"> Log In</div></Link>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form className="w-full max-w-xl text-white rounded-lg shadow-md p-6" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="name">Full Name</label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="email">Email address</label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="password">Password</label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full flex items-center justify-between px-3 mb-3">
              <label htmlFor="terms" className="flex items-center w-1/2">
                <input type="checkbox" id="terms" className="mr-1 bg-white shadow" required />
                <span className="text-sm text-white pt-1">I agree to the terms and conditions</span>
              </label>
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <button className="appearance-none block w-full text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-black focus:outline-none focus:bg-white focus:border-gray-500" type="submit">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
