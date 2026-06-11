// LandingPage.tsx
 import logoSrc from './assets/logo.png'
 import { NavLink } from "react-router-dom"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-(--bg-black) text-white">
      <header className="border-b border-(--border-color) bg-(--light-black)">
        <div className="mx-auto flex h-20 max-w-360 items-center justify-between px-4 md:h-30 md:px-16">
          <div className="flex items-center gap-3 md:gap-6">
            <img
              src={logoSrc}
              alt="FrameIt logo"
              className="h-9 w-9 object-contain md:h-11 md:w-11"
            />
            <div className="leading-tight">
              <p className="text-base font-semibold text-[#fffdfd] md:text-xl">FrameIt</p>
              <p className="text-xs text-[#fffdfd]/90 md:text-xl">Batch Image Brander</p>
            </div>
          </div>

          <nav className="flex items-center gap-3 md:gap-8">
            <NavLink
              to="/login"
              className="text-sm text-white hover:opacity-80 md:text-xl"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="rounded-lg bg-(--frameit-purple) px-4 py-3 text-sm font-semibold text-white hover:bg-[#5b21b6] md:px-12 md:py-5 md:text-xl"
            >
              Sign up
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-360 flex-col items-center px-8 pt-16 text-center md:px-6 md:pt-32">
        <h1 className="max-w-165 text-3xl font-bold leading-tight md:text-5xl md:leading-15 lg:text-6xl">
          Brand your event photo in{" "}
          <span className="text-[#6d28d9]">seconds</span>
        </h1>

        <p className="mt-8 max-w-119 text-base text-white md:mt-12 md:text-xl">
          Upload a batch of photos, set your overlay once, and download
          professionally branded images.
        </p>

        <div className="mt-10 flex w-full flex-col items-stretch gap-4 md:w-auto md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-6">
          <NavLink
            to="/signup"
            className="rounded-lg border border-[#6d28d9] bg-[#6d28d9] px-6 py-4 text-base font-semibold text-white hover:bg-[#5b21b6] md:px-12 md:py-5"
          >
            Get started free
          </NavLink>
          <NavLink
            to="/login"
            className="rounded-lg border border-[#6d28d9] bg-[#6d28d9] px-6 py-4 text-base font-semibold text-white hover:bg-[#5b21b6] md:w-fit md:px-12 md:py-5"
          >
            Login
          </NavLink>
        </div>
      </main>
    </div>
  );
}