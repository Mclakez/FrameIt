import logo from './assets/logo.png'
import { NavLink } from "react-router-dom"

export default function Header() {
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
            <div className='flex gap-8 items-center text-white'>
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
                </nav>
                <div className='rounded-full w-12 h-12 bg-black flex items-center justify-center'>
                        <span className='text-(--frameit-purple)'>FM</span>
                    </div>
            </div>
        </header>
        </>
    )
} 