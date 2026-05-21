"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { User, Mail, Camera, Edit3, Check, X, Calendar, BadgeCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { data: session, isPending } = authClient.useSession();
  const [activeTab, setActiveTab] = useState('appointments');
  const [isEditing, setIsEditing] = useState(false);
  const [appointments, setAppointments] = useState([]);
  
  
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    
    if (session?.user) {
      setNewName(session.user.name);
      setNewImage(session.user.image || "");
    }
    
    setAppointments(JSON.parse(localStorage.getItem('appointments') || '[]'));
  }, [session]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    await authClient.updateUser({
      name: newName,
      image: newImage,
    }, {
      onSuccess: () => {
        toast.success("Profile updated successfully!", { theme: "dark" });
        setIsEditing(false);
        setUpdating(false);
        window.location.reload(); 
      },
      onError: (e) => {
        toast.error(e.error.message);
        setUpdating(false);
      }
    });
  };

  if (isPending) return <div className="h-screen bg-[#050816] flex items-center justify-center text-[#21B7E2]">Loading Dashboard...</div>;

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      
      
      <div className="max-w-[95%] lg:max-w-[80%] mx-auto py-10">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-10">
          
          
          <div className="lg:col-span-1 space-y-3">
            <button 
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'appointments' ? 'bg-[#21B7E2] text-[#050816]' : 'bg-white/5 text-gray-500 hover:text-white'}`}
            >
              <Calendar size={20} /> My Appointments
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'profile' ? 'bg-[#21B7E2] text-[#050816]' : 'bg-white/5 text-gray-500 hover:text-white'}`}
            >
              <User size={20} /> My Profile
            </button>
          </div>

          
          <div className="lg:col-span-3">
            {activeTab === 'appointments' ? (
              
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Active Appointments</h2>
                {appointments.length > 0 ? (
                  appointments.map(app => (
                    <div key={app.id} className="bg-[#0a0f20] border border-gray-800 p-6 rounded-[2rem] flex justify-between items-center group hover:border-[#21B7E2]/40 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="p-4 bg-[#21B7E2]/10 rounded-2xl text-[#21B7E2]"><Calendar /></div>
                        <div>
                          <p className="text-[#21B7E2] text-[10px] font-black uppercase tracking-widest">Patient: {app.patientName}</p>
                          <h3 className="text-xl font-bold">{app.doctorName}</h3>
                          <p className="text-gray-500 text-sm">{app.slot} | {app.date}</p>
                        </div>
                      </div>
                      <span className="bg-green-500/10 text-green-500 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Confirmed</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 text-gray-600 border border-dashed border-gray-800 rounded-[2.5rem]">No appointments found.</div>
                )}
              </div>
            ) : (
              
              <div className="bg-[#0a0f20] border border-gray-800 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#21B7E2]/5 blur-3xl rounded-full"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-8 mb-10">

                  <div className="relative group">
                    <div className="w-28 h-28 rounded-[2rem] overflow-hidden border-2 border-[#21B7E2] shadow-xl">
                      <img src={session.user.image || "https://api.dicebear.com/7.x/avataaars/svg"} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#21B7E2] p-2 rounded-xl text-[#050816] shadow-lg"><Camera size={16} /></div>
                  </div>

                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-black mb-1">{session.user.name}</h2>
                    <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
                      <Mail size={14} /> {session.user.email}
                    </p>
                    <div className="mt-3 flex items-center justify-center md:justify-start gap-2 bg-green-500/10 text-green-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest w-fit">
                      <BadgeCheck size={14} /> Verified Patient
                    </div>
                  </div>
                </div>

                
                {!isEditing ? (
                  <div className="space-y-6 pt-6 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#050816] p-5 rounded-2xl border border-gray-800">
                        <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Full Name</p>
                        <p className="text-lg font-bold">{session.user.name}</p>
                      </div>
                      <div className="bg-[#050816] p-5 rounded-2xl border border-gray-800">
                        <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Account Email</p>
                        <p className="text-lg font-bold">{session.user.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all"
                    >
                      <Edit3 size={16} /> Edit Profile Data
                    </button>
                  </div>
                ) : (
                  
                  <form onSubmit={handleUpdateProfile} className="space-y-5 pt-6 border-t border-gray-800 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Update Name</label>
                        <input 
                          type="text" value={newName} required
                          className="w-full bg-[#050816] border border-gray-800 rounded-xl py-3 px-5 outline-none focus:border-[#21B7E2] transition-all"
                          onChange={(e) => setNewName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Profile Image URL</label>
                        <input 
                          type="url" value={newImage}
                          placeholder="https://image-link.com"
                          className="w-full bg-[#050816] border border-gray-800 rounded-xl py-3 px-5 outline-none focus:border-[#21B7E2] transition-all"
                          onChange={(e) => setNewImage(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button disabled={updating} type="submit" className="bg-[#21B7E2] text-[#050816] px-8 py-3 rounded-xl font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95">
                        {updating ? "Saving..." : <><Check size={18} /> Save Changes</>}
                      </button>
                      <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-800 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">
                        <X size={18} /> Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;