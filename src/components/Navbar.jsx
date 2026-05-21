"use client"; 
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Activity, Menu, X, LogOut, User } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push("/login");
                setIsOpen(false);
            },
        },
    });
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Doctors', href: '/all-doctors' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <nav className="bg-[#050816] text-white w-full border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-[80%] mx-auto px-2">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. Logo Section (Left) */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Activity className="text-[#21B7E2] w-7 h-7 md:w-8 md:h-8" />
            <span className="text-lg md:text-xl font-bold tracking-tight">DocAppoint</span>
          </Link>

          {/* 2. Desktop Nav Links (Center) - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} 
                className={`relative text-sm font-bold transition-all duration-300 py-1 ${pathname === link.href ? 'text-[#21B7E2]' : 'text-gray-400 hover:text-white'}`}>
                {link.name}
                {pathname === link.href && <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#21B7E2] shadow-[0_0_8px_#21B7E2]"></span>}
              </Link>
            ))}
          </div>

          {/* 3. Right Side (Avatar + Hamburger) */}
          <div className="flex items-center gap-3 md:gap-6">
            
            {/* Auth logic shown on ALL screens */}
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse"></div>
            ) : session ? (
              /* লগইন অবস্থায় অবতার */
              <div className="flex items-center gap-3 md:gap-5">
                <Link href="/dashboard" className="flex items-center gap-2 group">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-[#21B7E2] overflow-hidden group-hover:scale-105 transition-all">
                    {session.user.image ? (
                      <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#0a0f20] flex items-center justify-center">
                        <User size={18} className="text-gray-500" />
                      </div>
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-bold text-gray-300 group-hover:text-white">
                    {session.user.name.split(' ')[0]}
                  </span>
                </Link>
                
                {/* ডেস্কটপের জন্য লগআউট বাটন (মোবাইলে মেনুর ভেতরে থাকবে) */}
                <button onClick={handleLogout} className="hidden md:block text-gray-500 hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              /* লগআউট অবস্থায় বাটন */
              <div className="flex items-center gap-2 md:gap-4">
                <Link href="/login" className="text-xs font-bold text-gray-400 hover:text-white">Login</Link>
                <Link href="/register" className="bg-[#21B7E2] text-[#050816] px-4 md:px-6 py-2 rounded-full font-bold text-[10px] md:text-xs hover:bg-white transition-all">Register</Link>
              </div>
            )}

            {/* Mobile Menu Icon (Rightmost) */}
            <div className="md:hidden flex items-center ml-1">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 p-1">
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* 4. Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden pb-8 pt-2 space-y-2 animate-in slide-in-from-top duration-300">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} 
                  className={`block px-4 py-3 rounded-xl text-sm font-bold ${pathname === link.href ? 'bg-[#21B7E2]/10 text-[#21B7E2] border-l-4 border-[#21B7E2]' : 'text-gray-400'}`}>
                  {link.name}
                </Link>
              ))}
            </div>

            {session && (
               <div className="px-4 pt-4 border-t border-gray-800">
                 <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-3.5 rounded-xl font-bold text-sm">
                   <LogOut size={18} /> Logout Account
                 </button>
               </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;