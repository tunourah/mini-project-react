import React, { useState } from 'react';
import image from '../assets/bg.png';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(''); // Clear error message when the user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('https://66f168d9415379191550c6e8.mockapi.io/product');
      const users = response.data;

      // Check if user exists
      const user = users.find(user => user.email === formData.email && user.password === formData.password);
      if (user) {
        console.log('Login successful:', user);
        navigate('/home'); // Redirect to /home on successful login
      } else {
        setError('Invalid email or password'); // Set error message
        console.error('Invalid email or password');
      }
    } catch (error) {
      setError('Error logging in. Please try again.'); // Handle error
      console.error('Error logging in:', error);
    }
  };

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="text-center py-5">
        <div className="flex items-center justify-center">
          <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-black" stroke="currentColor" aria-label="User Icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h2 className="text-4xl text-black tracking-tight">Sign in to your account</h2>
        <span className="text-sm">
          or <Link to="/signup"><div className="text-red-500 font-bold text-xl hover:text-black"> register a new account</div></Link>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0 ">
        <form className="w-full max-w-xl text-black rounded-lg shadow-md p-6 bg-red-200" onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 text-red-600 text-center">
              {error}
            </div>
          )}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-black text-xs font-bold mb-2" htmlFor="email">Email address</label>
              <input
                className="appearance-none block w-full text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-black text-xs font-bold mb-2" htmlFor="password">Password</label>
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
              <label htmlFor="remember" className="flex items-center w-1/2">
                <input type="checkbox" id="remember" className="mr-1 bg-white shadow" />
                <span className="text-sm text-black pt-1">Remember Me</span>
              </label>
              <div className="w-1/2 text-right">
                <a href="#" className="text-black text-sm tracking-tight">Forget your password?</a>
              </div>
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <button className="appearance-none block w-full text-black font-bold border border-red-500 rounded-lg py-3 px-3 leading-tight hover:bg-white hover:text-red-500 focus:outline-none focus:bg-white focus:border-gray-500" type="submit">Sign in</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
