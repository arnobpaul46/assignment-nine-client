"use client";
import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"; 
import { toast } from "react-toastify";
import { User, Mail, Lock, Image as ImageIcon, Activity } from "lucide-react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const imageUrl = e.target.image.value; 

    await authClient.signUp.email({
        email, 
        password, 
        name, 
        
        image: imageUrl ,
    }, {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          toast.success("Account created! Welcome to DocAppoint", { theme: "dark" });
          router.push('/login');
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Registration failed", { theme: "dark" });
          setLoading(false);
        }
    });
  };

  return (
    <div className="min-h-screen bg-[#050816] px-4 flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-[#21B7E2]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-[420px] bg-[#0a0f20] border border-gray-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Activity className="text-[#21B7E2] w-8 h-8" />
            <span className="text-2xl font-black text-white tracking-tighter">DocAppoint</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Join Us</h2>
          <p className="text-gray-500 text-sm mt-1">Start booking top-rated doctors today</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#21B7E2] transition-colors" size={18} />
            <input required type="text" name="name" placeholder="Full Name" className="w-full bg-[#050816] border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:ring-2 focus:ring-[#21B7E2]/50 transition-all placeholder:text-gray-600" />
          </div>


          <div className="relative group">
            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#21B7E2] transition-colors" size={18} />
            <input type="url" name="image" placeholder="Profile Image URL (Optional)" className="w-full bg-[#050816] border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:ring-2 focus:ring-[#21B7E2]/50 transition-all placeholder:text-gray-600" />
          </div>


          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#21B7E2] transition-colors" size={18} />
            <input required type="email" name="email" placeholder="Email Address" className="w-full bg-[#050816] border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:ring-2 focus:ring-[#21B7E2]/50 transition-all placeholder:text-gray-600" />
          </div>


          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#21B7E2] transition-colors" size={18} />
            <input required minLength={6} type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="w-full bg-[#050816] border border-gray-800 rounded-2xl py-4 pl-12 pr-12 text-sm text-white outline-none focus:ring-2 focus:ring-[#21B7E2]/50 transition-all placeholder:text-gray-600" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#21B7E2]">
              <Activity size={18} className={showPassword ? "" : "rotate-90"} />
            </button>
          </div>

          <button disabled={loading} type="submit" className="w-full py-4 bg-[#21B7E2] text-[#050816] font-black rounded-2xl shadow-lg shadow-cyan-500/20 hover:bg-blue-500 transition-all text-lg active:scale-95 disabled:opacity-50">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm">
          Already a member? 
          <Link href="/login" className="text-[#21B7E2] hover:underline font-bold ml-2">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;