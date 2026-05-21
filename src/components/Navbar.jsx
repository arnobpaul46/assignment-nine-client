"use client"; 
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Doctors', href: '/all-doctors' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <nav className="bg-[#050816] text-white w-full border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-[80%] mx-auto">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <Activity className="text-[#21B7E2] w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold tracking-tight">DocAppoint</span>
          </Link>

          {/* Desktop Navbar Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`relative text-sm font-bold transition-all duration-300 py-1 ${
                    isActive ? 'text-[#21B7E2]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Desktop Active Bottom Border (Closer to text) */}
                  {isActive && (
                    <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#21B7E2] shadow-[0_0_8px_#21B7E2]"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-5">
            {/* Login Button with subtle outline */}
            <Link 
              href="/login" 
              className={`text-sm font-bold px-5 py-2 rounded-full border transition-all duration-300 ${
                pathname === '/login' 
                ? 'border-[#21B7E2] text-[#21B7E2] bg-[#21B7E2]/5' 
                : 'border-gray-700 text-gray-300 hover:border-[#21B7E2] hover:text-white'
              }`}
            >
              Login
            </Link>

            {/* Register Button Solid */}
            <Link 
              href="/register" 
              className="bg-[#21B7E2] hover:bg-white text-[#050816] px-6 py-2.5 rounded-full font-bold text-sm transition-all transform active:scale-95 shadow-lg shadow-cyan-500/10"
            >
              Register
            </Link>
          </div>

          {/* Mobile menu icon */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile menu bar */}
        {isOpen && (
          <div className="md:hidden pb-8 pt-2 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                    isActive 
                    ? 'bg-[#21B7E2]/10 text-[#21B7E2] border-l-4 border-[#21B7E2]' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="flex flex-col gap-3 pt-4 px-2">
              <Link onClick={() => setIsOpen(false)} href="/login" className="border border-gray-700 text-gray-300 font-bold py-3 rounded-xl text-center hover:border-[#21B7E2]">
                Login
              </Link>
              <Link onClick={() => setIsOpen(false)} href="/register" className="bg-[#21B7E2] text-[#050816] px-6 py-3 rounded-xl font-bold text-center">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;