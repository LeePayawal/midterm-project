import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b border-gray-700/50 bg-gradient-to-r from-slate-900 via-gray-900 to-emerald-900 p-4 text-lg font-medium backdrop-blur-sm shadow-lg">
      {/* Logo */}
      <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-black tracking-wide relative z-10 drop-shadow-lg text-xl">
        PhoneWorld 📱
      </div>

      {/* Navigation Links (only when signed out) */}
      <SignedOut>
        <div className="hidden md:flex space-x-6 text-gray-300">
          <Link href="#home" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <Link href="#features" className="hover:text-emerald-400 transition-colors">
            Features
          </Link>
          <Link href="#about" className="hover:text-emerald-400 transition-colors">
            About
          </Link>
          <Link href="#contact" className="hover:text-emerald-400 transition-colors">
            Contact
          </Link>
        </div>
      </SignedOut>

      {/* Auth Buttons */}
      <div className="relative z-10">
        <SignedOut>
          <div className="cursor-pointer group">
            <div className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:scale-105">
              <SignInButton />
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="p-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
