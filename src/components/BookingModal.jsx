"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const BookingModal = ({ doctor, isOpen, onClose }) => {
    const { data: session } = authClient.useSession();
    const [selectedSlot, setSelectedSlot] = useState(doctor?.availability[0]);
    const [formData, setFormData] = useState({ 
        patientName: '', 
        gender: 'Male', 
        phone: '', 
        appointmentDate: '', 
        problem: '' 
    });
    const router = useRouter();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!session) return toast.error("Please login first!");

        
        const appointmentData = {
            userEmail: session.user.email,
            doctorName: doctor.name,
            patientName: formData.patientName,
            gender: formData.gender,
            phone: formData.phone,
            appointmentDate: formData.appointmentDate,
            appointmentTime: selectedSlot,
            problem: formData.problem
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData)
            });

            if (response.ok) {
                toast.success("Appointment Booked Successfully!",{
                    theme: "dark",
                });
                onClose();
                router.push("/dashboard");
                
            } else {
                toast.error("Failed to book appointment");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Server connection failed!");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 backdrop-blur-md bg-black/70 overflow-y-auto">
            <div className="bg-[#0a0f20] border-t md:border border-white/10 w-full max-w-lg rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl relative">
                <div className="p-8 md:p-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-black text-white">Confirm <span className="text-[#21B7E2]">Booking</span></h2>
                        <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                            <X size={20} className="text-gray-400" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Patient Name" required className="w-full bg-[#050816] border border-gray-800 rounded-2xl py-3 px-6 outline-none focus:ring-2 focus:ring-[#21B7E2] text-white" onChange={(e) => setFormData({ ...formData, patientName: e.target.value })} />
                        
                        <div className="flex gap-4">
                            <select className="w-1/2 bg-[#050816] border border-gray-800 rounded-2xl py-3 px-6 outline-none focus:ring-2 focus:ring-[#21B7E2] text-white" onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <input type="date" required className="w-1/2 bg-[#050816] border border-gray-800 rounded-2xl py-3 px-6 outline-none focus:ring-2 focus:ring-[#21B7E2] text-white" onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })} />
                        </div>

                        <input type="number" placeholder="Phone Number" required className="w-full bg-[#050816] border border-gray-800 rounded-2xl py-3 px-6 outline-none focus:ring-2 focus:ring-[#21B7E2] text-white" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                        
                        <textarea placeholder="Write your problem..." required rows="2" className="w-full bg-[#050816] border border-gray-800 rounded-2xl py-3 px-6 outline-none focus:ring-2 focus:ring-[#21B7E2] text-white resize-none" onChange={(e) => setFormData({ ...formData, problem: e.target.value })}></textarea>

                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase mb-2 ml-1">Available Slots</p>
                            <div className="grid grid-cols-2 gap-2">
                                {doctor.availability.map((slot) => (
                                    <button key={slot} type="button" onClick={() => setSelectedSlot(slot)} className={`py-2.5 rounded-xl text-[11px] font-black transition-all border ${selectedSlot === slot ? "bg-[#21B7E2] text-[#050816] border-[#21B7E2]" : "bg-transparent text-gray-500 border-gray-800"}`}>{slot}</button>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-[#21B7E2] text-[#050816] py-4 rounded-2xl font-black text-lg active:scale-95 transition-transform">Complete Appointment</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;