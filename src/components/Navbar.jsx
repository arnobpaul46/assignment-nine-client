"use client"; 
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Activity, Menu, X, LogOut, User } from 'lucide-react';
import { authClient } from '@/lib/auth-client'; // আপনার ক্লায়েন্ট পাথ নিশ্চিত করুন

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // BetterAuth থেকে সেশন এবং ইউজার ডাটা নেওয়া
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push("/login"); // লগআউট হলে লগইন পেজে পাঠিয়ে দিবে
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
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Activity className="text-[#21B7E2] w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">DocAppoint</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`relative flex items-center h-full text-sm font-bold transition-all duration-300 ${
                    isActive ? 'text-[#21B7E2]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#21B7E2] shadow-[0_0_8px_#21B7E2]"></span>
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
              /* লগইন অবস্থায় যা দেখাবে */
              <div className="flex items-center gap-5">
                <Link href="/dashboard" className="flex items-center gap-2 group">
                  <div className="w-10 h-10 rounded-full border-2 border-[#21B7E2] overflow-hidden group-hover:scale-105 transition-all">
                    {session.user.image ? (
                      <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#0a0f20] flex items-center justify-center">
                        <User size={20} className="text-gray-500" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{session.user.name.split(' ')[0]}</span>
                </Link>

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-400 hover:text-red-500 font-bold text-sm transition-all"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              /* লগআউট অবস্থায় যা দেখাবে */
              <div className="flex items-center gap-5">
                <Link href="/login" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/register" className="bg-[#21B7E2] text-[#050816] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white transition-all shadow-lg shadow-cyan-500/10">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu icon */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-8 space-y-4 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} 
                className={`block px-4 py-3 rounded-xl text-base font-bold ${pathname === link.href ? 'bg-[#21B7E2]/10 text-[#21B7E2] border-l-4 border-[#21B7E2]' : 'text-gray-400'}`}>
                {link.name}
              </Link>
            ))}
            <hr className="border-gray-800" />
            <div className="px-4">
              {session ? (
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-3 rounded-xl font-bold">
                  <LogOut size={18} /> Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-center font-bold text-gray-400">Login</Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="bg-[#21B7E2] text-[#050816] py-3 rounded-xl font-bold text-center">Register</Link>
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