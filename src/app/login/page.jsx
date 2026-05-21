"use client";
import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Mail, Lock, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await authClient.signIn.email({ email, password }, {
      onRequest: () => setLoading(true),
      onSuccess: () => {
        toast.success("Welcome back!", { theme: "dark" });
        router.push("/dashboard");
        router.refresh();
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "Invalid Credentials", { theme: "dark" });
        setLoading(false);
      }
    });
  };

  const googleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard"
    });
  };

  return (
    <div className="min-h-screen bg-[#050816] px-5 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="w-full max-w-[420px] bg-[#0a0f20] border border-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Activity className="text-[#21B7E2] w-10 h-10" />
            <span className="text-2xl font-black text-white tracking-tighter">DocAppoint</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Enter details to continue</p>
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#21B7E2] transition-colors" size={18} />
            <input type="email" name="email" placeholder="Email" required className="w-full bg-[#050816] border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:ring-2 focus:ring-[#21B7E2]/50 transition-all" />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#21B7E2] transition-colors" size={18} />
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" required className="w-full bg-[#050816] border border-gray-800 rounded-2xl py-4 pl-12 pr-12 text-sm text-white outline-none focus:ring-2 focus:ring-[#21B7E2]/50 transition-all" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#21B7E2]">
              <Activity size={18} className={showPassword ? "" : "rotate-90"} />
            </button>
          </div>
          <button disabled={loading} className="w-full py-4 bg-[#21B7E2] text-[#050816] font-black rounded-2xl shadow-xl shadow-cyan-500/20 hover:bg-white transition-all text-lg disabled:opacity-50">
            {loading ? "Wait..." : "Login Now"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-800"></div>
          <span className="px-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">OR</span>
          <div className="flex-1 h-px bg-gray-800"></div>
        </div>

        <button onClick={googleLogin} className="w-full py-4 bg-[#050816] border border-gray-800 text-white rounded-2xl hover:bg-white hover:text-[#050816] transition-all font-bold flex items-center justify-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">New to DocAppoint? <Link href="/register" className="text-[#21B7E2] hover:underline font-bold ml-2">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;