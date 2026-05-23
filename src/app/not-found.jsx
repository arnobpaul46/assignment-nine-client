import Link from 'next/link';
import { Activity, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#21B7E2]/5 blur-[120px] rounded-full"></div>

      
      <h1 className="text-[150px] md:text-[250px] font-black text-white/[0.03] absolute select-none tracking-tighter">
        404
      </h1>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 bg-[#21B7E2]/10 rounded-3xl flex items-center justify-center mb-8 border border-[#21B7E2]/20 shadow-2xl">
          <Activity size={48} className="text-[#21B7E2] animate-pulse" />
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Page Not <span className="text-[#21B7E2]">Found</span>
        </h2>
        
        <p className="text-gray-500 max-w-md mb-10 leading-relaxed font-medium">
          The medical page you are looking for has been moved or doesn't exist. Let's get you back to the clinic!
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 bg-[#21B7E2] text-[#050816] px-8 py-4 rounded-2xl font-black hover:bg-white transition-all shadow-xl shadow-cyan-500/10 active:scale-95"
          >
            <Home size={20} /> Back to Home
          </Link>
          <Link 
            href="/all-doctors" 
            className="flex items-center justify-center gap-2 border border-gray-800 bg-white/5 backdrop-blur-sm px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all active:scale-95"
          >
            <Search size={20} /> Search Doctors
          </Link>
        </div>
      </div>

      
      <p className="absolute bottom-10 text-gray-700 text-[10px] font-bold uppercase tracking-[0.3em]">
        Error Code: Patient_Path_Not_Found
      </p>
    </div>
  );
}