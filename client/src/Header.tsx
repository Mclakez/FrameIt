import logo from './assets/logo.png'
import hamburger  from './assets/hamburger-menu-svgrepo-com.svg'
import { NavLink } from "react-router-dom"
import { useState } from 'react';
import fetchWithClient from './lib/fetchClient';
import {useNavigate} from 'react-router-dom'
type HeaderProps = {
  userName?: string | null;
};

export default function Header({ userName }: HeaderProps) {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        fetchWithClient('/api/auth/logout', {
            method: 'POST',
        })
        .then(response => {
            if (response.ok) {
                navigate('/login');
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
    }

    function getInitials(name = '') {
        const parts = name.trim().split(/\s+/).filter(Boolean);

        if (parts.length === 0) return '';
        if (parts.length === 1) return parts[0][0].toUpperCase();

        return (parts[0][0] + parts[1][0]).toUpperCase();
}

    const initials = getInitials(userName?.toString() || '');

    return (
        <>
        <header className="bg-(--light-black) py-8 px-8 flex justify-between items-center border border-b-(--border-color)">
            <div className="flex flex-row gap-4 items-center">
                <img  src={logo} className=' w-8 h-8'/>
                <div className='text-white flex flex-col'>
                    <span>FrameIt</span>
                    <span>Batch Image Brander</span>
                </div>
            </div>
            <div className="flex md:hidden">
                <img src={hamburger} alt="Menu" className="w-6 h-6" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
            </div>
            <div className='hidden md:flex gap-8 items-center text-white cursor-pointer'>
                <nav className='flex gap-8 items-center text-white'>
                    <NavLink to="/app" className={({ isActive }) =>
    isActive
      ? 'text-(--frameit-purple) border-b-2 border-(--frameit-purple) pb-1'
      : 'text-white'
  }>App</NavLink>
                    <NavLink to="/brandkit" className={({ isActive }) =>
    isActive
      ? 'text-(--frameit-purple) border-b-2 border-(--frameit-purple) pb-1'
      : 'text-white'
  }>Brandkit</NavLink>
  <a onClick={handleLogout} className="cursor-pointer text-red-500">Logout</a>
                </nav>
                <div className='rounded-full w-12 h-12 bg-black flex items-center justify-center'>
                        <span className='text-(--frameit-purple)'>{initials || 'U'}</span>
                    </div>
            </div>

            
        </header>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
            
            <>
                <div 
      className="fixed inset-0 bg-black/50 z-5 md:hidden transition-opacity duration-300"
      onClick={() => setMobileMenuOpen(false)}
    />
                <div className="md:hidden bg-(--light-black) border-b border-(--border-color) p-8 h-screen fixed top-0 right-0 w-[calc(80%)] z-10">
                <div className='flex items-center gap-2 mt-4 pt-4 pb-4'>
                    <div className='rounded-full w-10 h-10 bg-black flex items-center justify-center'>
                        <span className='text-(--frameit-purple) text-sm'>{initials || 'U'}</span>
                    </div>
                </div>
                <nav className='flex flex-col gap-4 text-white'>
                    <NavLink 
                        to="/app" 
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            isActive
                                ? 'text-(--frameit-purple) border-b-2 w-fit border-(--frameit-purple) pb-1'
                                : 'text-white'
                        }
                    >
                        App
                    </NavLink>
                    <NavLink 
                        to="/brandkit"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            isActive
                                ? 'text-(--frameit-purple) border-b-2 w-fit border-(--frameit-purple)'
                                : 'text-white'
                        }
                    >
                        Brandkit
                    </NavLink>
                    <button 
                        onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                        }} 
                        className="text-red-500 text-left"
                    >
                        Logout
                    </button>
                </nav>
                
            </div>
            </>
        )}
        </>
    )
} 