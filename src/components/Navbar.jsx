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
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Activity className="text-[#21B7E2] w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">DocAppoint</span>
          </Link>

          {/* Desktop Nav Links */}
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
                  {/* Active Bottom Border - Text এর একদম কাছে (4px নিচে) */}
                  {isActive && (
                    <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#21B7E2] shadow-[0_0_10px_#21B7E2]"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-6">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center gap-5">
                <Link href="/dashboard" className="flex items-center gap-2 group">
                  <div className="w-9 h-9 rounded-full border border-[#21B7E2] overflow-hidden group-hover:scale-105 transition-all">
                    {session.user.image ? (
                      <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#0a0f20] flex items-center justify-center">
                        <User size={18} className="text-gray-500" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{session.user.name.split(' ')[0]}</span>
                </Link>

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-bold text-xs transition-all"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <Link href="/login" className="text-xs font-bold text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/register" className="bg-[#21B7E2] text-[#050816] px-5 py-2 rounded-full font-bold text-xs hover:bg-white transition-all">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu icon */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-2 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} 
                className={`block px-4 py-3 rounded-xl text-sm font-bold ${pathname === link.href ? 'bg-[#21B7E2]/10 text-[#21B7E2] border-l-4 border-[#21B7E2]' : 'text-gray-400'}`}>
                {link.name}
              </Link>
            ))}
            <hr className="border-gray-800 mx-4 my-2" />
            <div className="px-4">
              {session ? (
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-3 rounded-xl font-bold text-sm">
                  <LogOut size={18} /> Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-center font-bold text-gray-400 text-sm">Login</Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="bg-[#21B7E2] text-[#050816] py-3 rounded-xl font-bold text-center text-sm">Register</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;