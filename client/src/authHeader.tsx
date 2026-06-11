import logo from './assets/logo.png'

export default function AuthHeader() {
    return (
        <>
        <header className="border-b border-(--border-color) bg-(--light-black) px-4 py-4 md:px-8 md:py-8">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                    <img src={logo} className="h-8 w-8 md:h-10 md:w-10" alt="FrameIt logo" />
                    <div className="flex flex-col text-white leading-tight">
                        <span className="text-base font-semibold md:text-xl">FrameIt</span>
                        <span className="text-xs text-white/90 md:text-base">Batch Image Brander</span>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
} 