import { useState } from 'react';
import AuthHeader from './authHeader';
import googleIcon from './assets/pngwing.com.png';
import { useNavigate } from 'react-router-dom'
import fetchWithClient from './lib/fetchClient';
import { BASE_URL } from './lib/fetchClient';

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
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="bg-[#1f1f1f] rounded-xl w-full max-w-xl px-8 py-16 flex flex-col gap-4">
          {/* Header Text */}
          <div className="flex flex-col">
            <h1 className=" font-medium text-[20px] text-white">
              Welcome back
            </h1>
            <p className=" font-medium text-[20px] text-white">
              Login to access your brandkit
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4.5">
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
                className="bg-[#403d3d] h-16 rounded-lg px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--frameit-purple) autofill:bg-red-500 autofill:text-white"
                placeholder="Enter your username"
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


            {/* Sign Up Button */}
            <button
              type="submit"
              className="cursor-pointer bg-(--frameit-purple) h-16 rounded-lg  font-medium text-[20px] text-white hover:opacity-90 transition-opacity mt-2"
            >
              Login
            </button>
            {error ? (
  <p className="text-red-400 text-sm">{error}</p>
) : null}
          </form>

          {/* Login Link */}
          <p className="text-center text-[14px]  font-normal text-white">
            No account yet?{' '}
            <a href="/signup" className="text-(--frameit-purple) hover:underline cursor-pointer">
              Signup
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
            className="cursor-pointer border-2 border-(--frameit-purple) h-16 rounded-lg flex items-center justify-center gap-4 hover:bg-(--frameit-purple) hover:bg-opacity-10 transition-colors"
          >
            <img
              src={googleIcon}
              alt="Google"
              className="w-8.75 h-9.5 object-cover"
            />
            <p className=" font-medium text-[20px] text-white whitespace-nowrap">
              Login with Google
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
