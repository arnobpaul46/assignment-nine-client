"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, User, Clock, BadgeCheck, Edit3, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(data);
  }, []);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      const updated = appointments.filter(app => app.id !== id);
      setAppointments(updated);
      localStorage.setItem('appointments', JSON.stringify(updated));
      alert("Appointment Canceled Successfully!");
    }
  };

  const handleUpdate = () => {
    alert("Reschedule feature is locked for security. Please contact support to update data.");
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white">

      
      <div className="max-w-[95%] lg:max-w-[80%] mx-auto py-10 ">
        <h1 className="text-3xl md:text-5xl font-black mb-12 tracking-tight">Patient <span className="text-[#21B7E2]">Hub</span></h1>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8">
          
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide  pr-2 border-r-2 border-gray-500">
            <button 
              onClick={() => setActiveTab('appointments')}
              className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-8 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${activeTab === 'appointments' ? 'bg-[#21B7E2] text-[#050816]' : 'bg-white/5 text-gray-500'}`}
            >
              <Calendar size={18} /> Appointments
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-8 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${activeTab === 'profile' ? 'bg-[#21B7E2] text-[#050816]' : 'bg-white/5 text-gray-500'}`}
            >
              <User size={18} /> My Profile
            </button>
          </div>

          
          <div className="lg:col-span-3">
            {activeTab === 'appointments' ? (
              <div className="grid gap-6">
                {appointments.length > 0 ? (
                  appointments.map((app) => (
                    <div key={app.id} className="bg-[#0a0f20] border border-gray-800 rounded-[2.5rem] p-6 md:p-8 flex flex-col gap-6 group hover:border-[#21B7E2]/40 transition-all">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="p-4 bg-[#21B7E2]/10 rounded-2xl text-[#21B7E2]">
                            <Calendar size={28} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{app.doctorName}</h3>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">{app.specialty}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-green-500/10 px-4 py-1.5 rounded-xl text-green-500 text-[10px] font-black uppercase tracking-widest">
                          <BadgeCheck size={14} /> {app.status}
                        </div>
                      </div>

                      
                      <div className="bg-[#050816] p-5 rounded-2xl border border-gray-800/50">
                        <div className="flex items-center gap-2 text-[#21B7E2] text-xs font-bold mb-2">
                           <Clock size={14} /> {app.slot} | {app.date}
                        </div>
                        <p className="text-[10px] font-black text-[#21B7E2] uppercase tracking-[0.2em] mb-1">Patient: {app.patientName}</p>
                        <p className="text-gray-500 text-sm italic">"Patient Problem: {app.problem}"</p>
                      </div>

                      
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button 
                          onClick={handleUpdate}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#21B7E2]/10 text-[#21B7E2] py-4 rounded-xl font-bold text-sm hover:bg-[#21B7E2] hover:text-[#050816] transition-all"
                        >
                          <Edit3 size={16} /> Update Data
                        </button>
                        <button 
                          onClick={() => handleCancel(app.id)}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-4 rounded-xl font-bold text-sm hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={16} /> Cancel Appointment
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#0a0f20] border border-dashed border-gray-800 py-24 rounded-[3rem] text-center text-gray-600 font-bold">
                    No active appointments found.
                  </div>
                )}
              </div>
            ) : (
              
              <div className="bg-[#0a0f20] border border-gray-800 rounded-[3rem] p-10 max-w-2xl">
                 <div className="flex items-center gap-6 mb-10">
                    <div className="w-20 h-20 bg-gradient-to-tr from-[#21B7E2] to-blue-600 rounded-[2rem] flex items-center justify-center text-[#050816] text-3xl font-black shadow-lg shadow-cyan-500/20">A</div>
                    <div>
                       <h2 className="text-2xl font-bold">Arnob Dev</h2>
                       <p className="text-[#21B7E2] font-bold">Verified Patient Account</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div>
                       <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Email Address</p>
                       <p className="text-lg font-bold">arnob@docappoint.com</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Contact</p>
                       <p className="text-lg font-bold">+880 123 456 789</p>
                    </div>
                    <button onClick={handleUpdate} className="w-full sm:w-fit bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all">Update Profile</button>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;