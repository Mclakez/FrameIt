import { useState } from 'react';
import AuthHeader from './authHeader';
import googleIcon from './assets/pngwing.com.png';
import { useNavigate } from 'react-router-dom';
import fetchWithClient from './lib/fetchClient';
import { BASE_URL } from './lib/fetchClient';
import {NavLink} from 'react-router-dom'

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);


  const navigate = useNavigate()

  function showError(message:string) {
      setError(message)

      setTimeout(() => {
        setError(null)
      }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setIsLoading(false);
      showError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setIsLoading(false);
      showError('Passwords do not match');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setIsLoading(false);
      showError('Please enter a valid email address');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setIsLoading(false);
      showError('Passwords do not match');
      return;
    }

    try {
      const username = formData.username
    const password = formData.password
    const email = formData.email
    
    const response = await fetchWithClient('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        })

    if (!response.ok) {
        const errorData = await response.json();
            showError(errorData.message || 'Signup failed');
            return
    }
    
    navigate('/login')
    } catch (error) {
      showError('Unable to connect. Please try again later.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  
  };

  const handleGoogleSignup = () => {
    window.location.href = `${BASE_URL}/api/auth/google`
  };

  return (
    <div className="bg-(--bg-black) relative w-full min-h-screen flex flex-col">
      <AuthHeader/>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-3 py-6 md:px-4 md:py-12">
        <div className="flex w-full max-w-xl flex-col gap-3 rounded-xl bg-[#1f1f1f] px-4 py-8 md:gap-4 md:px-8 md:py-16">
          {/* Header Text */}
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-white md:text-[20px]">
              Welcome back
            </h1>
            <p className="text-sm text-white md:text-[20px]">
              Signup to create a brandkit
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="flex flex-col gap-3 md:gap-4.5">
            {/* Username Field */}
            <div className="flex flex-col gap-2 md:gap-4">
              <label className="text-sm text-white md:text-[20px]">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="h-12 rounded-lg bg-[#403d3d] px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--frameit-purple) md:h-16 md:text-base"
                placeholder="Enter your username"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2 md:gap-4">
              <label className="text-sm text-white md:text-[20px]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12 rounded-lg bg-[#403d3d] px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--frameit-purple) md:h-16 md:text-base"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2 md:gap-4">
              <label className="text-sm text-white md:text-[20px]">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-12 rounded-lg bg-[#403d3d] px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--frameit-purple) md:h-16 md:text-base"
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-2 md:gap-4">
              <label className="text-sm text-white md:text-[20px]">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="h-12 rounded-lg bg-[#403d3d] px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--frameit-purple) md:h-16 md:text-base"
                placeholder="Confirm your password"
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 h-12 cursor-pointer rounded-lg bg-(--frameit-purple) text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 md:h-16 md:text-[20px]"
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </form>

          {/* Login Link */}
          <p className="text-center text-sm font-normal text-white md:text-[14px]">
            Already have an account?{' '}
            <NavLink to="/login" className="cursor-pointer text-(--frameit-purple) hover:underline">
              Login
            </NavLink>
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3">
            
            <p className="whitespace-nowrap text-sm font-medium text-white md:text-[20px]">
              or
            </p>
            
          </div>

          {/* Google Signup Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="flex h-12 cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-(--frameit-purple) transition-colors hover:bg-(--frameit-purple) hover:bg-opacity-10 md:h-16 md:gap-4"
          >
            <img
              src={googleIcon}
              alt="Google"
              className="w-8.75 h-9.5 object-cover"
            />
            <p className="whitespace-nowrap text-sm font-medium text-white md:text-[20px]">
              Signup with Google
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
