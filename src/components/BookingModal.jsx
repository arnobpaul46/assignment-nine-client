"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BookingModal = ({ doctor, isOpen, onClose }) => {
    const [selectedSlot, setSelectedSlot] = useState(doctor?.availability[0]);
    const [formData, setFormData] = useState({ name: '', phone: '', problem: '' });
    const router = useRouter();

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const appointment = {
            id: Date.now(),
            doctorId: doctor.id, 
            doctorName: doctor.name,
            specialty: doctor.specialty,
            patientName: formData.name, 
            slot: selectedSlot,
            problem: formData.problem,
            date: new Date().toLocaleDateString(),
            status: 'Confirmed'
        };

        const existing = JSON.parse(localStorage.getItem('appointments') || '[]');
        localStorage.setItem('appointments', JSON.stringify([...existing, appointment]));

        alert(`Appointment confirmed for ${formData.name}!`);
        onClose();
        router.push("/dashboard");
        router.refresh();

    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 backdrop-blur-md bg-black/70 overflow-y-auto">
            <div className="bg-[#0a0f20] border-t md:border border-white/10 w-full max-w-lg rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl animate-in slide-in-from-bottom md:zoom-in duration-300 relative">

                <div className="p-8 md:p-10">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-white">Confirm <span className="text-[#21B7E2]">Booking</span></h2>
                        <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                            <X size={20} className="text-gray-400" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text" placeholder="Patient Name" required
                            className="w-full bg-[#050816] border border-gray-800 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#21B7E2] transition-all"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            type="number" placeholder="Phone Number" required
                            className="w-full bg-[#050816] border border-gray-800 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#21B7E2] transition-all"
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        
                        <textarea
                            placeholder="Explain your problem/reason for visit..." required rows="3"
                            className="w-full bg-[#050816] border border-gray-800 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#21B7E2] transition-all resize-none"
                            onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                        ></textarea>

                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Available Slots</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {doctor.availability.map((slot) => (
                                    <button
                                        key={slot} type="button"
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`py-3 rounded-xl text-[11px] font-black transition-all border ${selectedSlot === slot ? "bg-[#21B7E2] text-[#050816] border-[#21B7E2]" : "bg-transparent text-gray-500 border-gray-800"
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-[#21B7E2] text-[#050816] py-5 rounded-2xl font-black text-lg shadow-xl shadow-cyan-500/10">
                            Complete Appointment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;