"use client"; 
import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#050816] text-white w-full border-b border-gray-800">
      
      <div className="max-w-[80%] mx-auto px-2">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Activity className="text-[#21B7E2] w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">DocAppoint</span>
          </Link>

          {/*  Navbar Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[#21B7E2] font-medium hover:text-white transition-colors">Home</Link>
            <Link href="/appointments" className="text-gray-300 font-medium hover:text-white transition-colors">All Appointments</Link>
            <Link href="/dashboard" className="text-gray-300 font-medium hover:text-white transition-colors">Dashboard</Link>
          </div>

          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/login" className="text-gray-300 font-bold hover:text-white transition-colors">Login</Link>
            <Link href="/register" className="bg-[#21B7E2] hover:bg-[#1da1c9] text-black px-6 py-2 rounded-full font-bold transition-all">
              Register
            </Link>
          </div>

          {/* Mobile section menu icon */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile section menu bar*/}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-4">
            <Link href="/" className="block text-[#21B7E2] font-medium py-2">Home</Link>
            <Link href="/appointments" className="block text-gray-300 font-medium py-2 hover:text-white">All Appointments</Link>
            <Link href="/dashboard" className="block text-gray-300 font-medium py-2 hover:text-white">Dashboard</Link>
            <hr className="border-gray-800" />
            <div className="flex flex-col gap-4">
              <Link href="/login" className="text-gray-300 font-bold py-2">Login</Link>
              <Link href="/register" className="bg-[#21B7E2] text-black px-6 py-2 rounded-full font-bold text-center">
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