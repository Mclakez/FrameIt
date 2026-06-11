import { useState } from 'react';
import AuthHeader from './authHeader';
import googleIcon from './assets/pngwing.com.png';
import { useNavigate } from 'react-router-dom'
import fetchWithClient from './lib/fetchClient';
import { BASE_URL } from './lib/fetchClient';
import {NavLink} from 'react-router-dom'

export default function Login({ setUserName }: { setUserName: (value: string) => void }) {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null)
    const username = formData.username
    const password = formData.password
    
    try {
      const response = await fetchWithClient('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

    if (!response.ok) {
        const errorData = await response.json();
            showError(errorData.message || 'Login failed')
            return
    }

    const data = await response.json()
    setUserName(data.user.username)
    navigate('/app')
    } catch (error) {
      showError('Network error. Please try again.');
      console.error(error);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${BASE_URL}/api/auth/google`
   
  };

//   useEffect(() => {
//   const params = new URLSearchParams(window.location.search)
//   const token = params.get('token')
//   const error = params.get('error')
  
//   if (error) {
//     console.error('Google auth failed')
//     navigate('/login')
//   }
  
//   if (token) {
//     localStorage.setItem('token', token)
//     navigate('/app')
//   }
// }, [navigate])

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
              Login to access your brandkit
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-3 md:gap-4.5">
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
                className="h-12 rounded-lg bg-[#403d3d] px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--frameit-purple) autofill:bg-red-500 autofill:text-white md:h-16 md:text-base"
                placeholder="Enter your username"
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


            {/* Sign Up Button */}
            <button
              type="submit"
              className="mt-2 h-12 cursor-pointer rounded-lg bg-(--frameit-purple) text-sm font-medium text-white transition-opacity hover:opacity-90 md:h-16 md:text-[20px]"
            >
              Login
            </button>
            {error ? (
  <p className="text-red-400 text-sm">{error}</p>
) : null}
          </form>

          {/* Login Link */}
          <p className="text-center text-sm font-normal text-white md:text-[14px]">
            No account yet?{' '}
            <NavLink to="/signup" className="text-(--frameit-purple) hover:underline cursor-pointer">
              Signup
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
              Login with Google
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
