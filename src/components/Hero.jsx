import React from 'react';
import { CheckCircle } from 'lucide-react'; 
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-[#050816] text-white min-h-[90vh] flex items-center overflow-hidden">
      
      <div className="max-w-[80%] mx-auto w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          
          <div className="space-y-8">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-[#21B7E2] text-xs font-semibold uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Empowering Modern Healthcare
            </div>

            
            <h1 className="text-5xl md:text-6xl  font-bold leading-[1.1] tracking-tight">
              Your Gateway to <br />
              <span className="text-[#21B7E2]">Medical Excellence</span>
            </h1>

            
            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
              DocAppoint simplifies your healthcare journey. Connect with world-class 
              specialists, manage records digitally, and experience a new era of 
              patient-centric care.
            </p>

            
            <div className="flex flex-wrap gap-5">
              <Link href="/all-doctors">
              <button className="bg-[#21B7E2] hover:bg-[#1da1c9] text-[#050816] px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-cyan-500/20 active:scale-95 hover:cursor-pointer">
                Book Appointment
              </button></Link>
              
            </div>

            
            <div className="flex items-center gap-10 pt-6">
              <div>
                <div className="text-3xl font-bold flex items-center gap-1">
                  10k<span className="text-[#21B7E2]">+</span>
                </div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Patients Served</p>
              </div>
              <div className="w-[1px] h-12 bg-gray-800"></div>
              <div>
                <div className="text-3xl font-bold flex items-center gap-1">
                  500<span className="text-[#21B7E2]">+</span>
                </div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Expert Doctors</p>
              </div>
            </div>
          </div>

          
          <div className="relative">
            
            <div className="absolute -inset-10 bg-cyan-500/20 blur-[120px] rounded-full opacity-50"></div>
            
            
            <div className="relative z-10 border border-white/20 rounded-[2rem] p-3 bg-white/5 backdrop-blur-sm">
              <div className="rounded-[1.2rem] overflow-hidden shadow-2xl">
                <img 
                  src="/HeroDoctor.jpg" 
                  alt="Futuristic Healthcare Interface"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              
              <div className="absolute -bottom-6 -left-6 bg-[#0a0f20] border border-gray-800 p-4 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-lg text-green-500">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Verified Specialists</p>
                    <p className="text-xs text-gray-500">100% Secure Consultations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;