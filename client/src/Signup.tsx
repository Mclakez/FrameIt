import { useState } from 'react';
import AuthHeader from './authHeader';
import googleIcon from './assets/pngwing.com.png';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Signup data:', formData);

    try {
      const username = formData.username
    const password = formData.password
    const email = formData.email
    
    const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        })

    if (!response.ok) {
        const errorData = await response.json();
            console.log(errorData.message)
            return
    }
    const data = await response.json()
    console.log(data);
    
    navigate('/login')
    } catch (error) {
      console.log('Error:' ,error)
    }
    // TODO: Add API call for signup
  };

  const handleGoogleSignup = () => {
    // TODO: Add Google OAuth logic
    console.log('Google signup clicked');
  };

  return (
    <div className="bg-(--bg-black) relative w-full min-h-screen flex flex-col">
      <AuthHeader/>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="bg-[#1f1f1f] rounded-[12px] w-full max-w-[576px] px-8 py-16 flex flex-col gap-4">
          {/* Header Text */}
          <div className="flex flex-col">
            <h1 className=" font-medium text-[20px] text-white">
              Welcome back
            </h1>
            <p className=" font-medium text-[20px] text-white">
              Signup to create a brandkit
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="flex flex-col gap-4.5">
            {/* Username Field */}
            <div className="flex flex-col gap-4">
              <label className=" font-normal text-[20px] text-white">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="bg-[#403d3d] h-16 rounded-lg px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--frameit-purple)"
                placeholder="Enter your username"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-4">
              <label className=" font-normal text-[20px] text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-[#403d3d] h-16 rounded-lg px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--frameit-purple)"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-4">
              <label className=" font-normal text-[20px] text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-[#403d3d] h-16 rounded-lg px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--frameit-purple)"
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-4">
              <label className=" font-normal text-[20px] text-white">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="bg-[#403d3d] h-16 rounded-lg px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--frameit-purple)"
                placeholder="Confirm your password"
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="bg-(--frameit-purple) h-16 rounded-lg  font-medium text-[20px] text-white hover:opacity-90 transition-opacity mt-2"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-[14px]  font-normal text-white">
            Already have an account?{' '}
            <a href="/login" className="text-(--frameit-purple) hover:underline">
              Login
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3">
            
            <p className=" font-medium text-[20px] text-white whitespace-nowrap">
              or
            </p>
            
          </div>

          {/* Google Signup Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="border-2 border-(--frameit-purple) h-16 rounded-lg flex items-center justify-center gap-4 hover:bg-(--frameit-purple) hover:bg-opacity-10 transition-colors"
          >
            <img
              src={googleIcon}
              alt="Google"
              className="w-[35px] h-[38px] object-cover"
            />
            <p className=" font-medium text-[20px] text-white whitespace-nowrap">
              Signup with Google
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
