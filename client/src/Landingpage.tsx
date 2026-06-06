// LandingPage.tsx
 import logoSrc from './assets/logo.png'
 import { NavLink } from "react-router-dom"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#151515] text-white">
      <header className="border-b border-[#5e5d5d] bg-[#1f1f1f]">
        <div className="mx-auto flex h-[139px] max-w-[1440px] items-center justify-between px-16">
          <div className="flex items-center gap-6">
            <img
              src={logoSrc}
              alt="FrameIt logo"
              className="h-11 w-11 object-contain"
            />
            <div className=" leading-tight">
              <p className="text-xl text-[#fffdfd]">FrameIt</p>
              <p className="text-xl text-[#fffdfd]">Batch Image Brander</p>
            </div>
          </div>

          <nav className="flex items-center gap-8">
            <NavLink
              to="/login"
              className=" text-base text-white hover:opacity-80"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="rounded-lg bg-[#6d28d9] px-12 py-5  text-base font-semibold text-white hover:bg-[#5b21b6]"
            >
              Sign up
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1440px] flex-col items-center px-6 pt-32 text-center">
        <h1 className="max-w-[663px]  text-5xl font-bold leading-[60px] md:text-[64px]">
          Brand your event photo in{" "}
          <span className="text-[#6d28d9]">seconds</span>
        </h1>

        <p className="mt-12 max-w-[477px]  text-xl text-white">
          Upload a batch of photos, set your overlay once, and download
          professionally branded images
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <a
            href="/signup"
            className="rounded-lg border border-[#6d28d9] bg-[#6d28d9] px-12 py-5  text-base font-semibold text-white hover:bg-[#5b21b6]"
          >
            Get started free
          </a>
          <a
            href="/login"
            className="rounded-lg border border-[#6d28d9] bg-[#6d28d9] px-12 py-5  text-base font-semibold text-white hover:bg-[#5b21b6]"
          >
            Login
          </a>
        </div>
      </main>
    </div>
  );
}