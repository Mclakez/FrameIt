import logo from './assets/logo.png'

export default function AuthHeader() {
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
    
        </header>
        </>
    )
} 