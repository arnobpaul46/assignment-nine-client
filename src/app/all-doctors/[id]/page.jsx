"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Loader from '@/components/Loader';
import { Star, MapPin, Briefcase, Building, Clock, CalendarCheck, Wallet, BadgeCheck } from 'lucide-react';
import BookingModal from '@/components/BookingModal';

const DoctorDetails = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBooked, setIsBooked] = useState(false); 

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                
                const response = await fetch('/data/all-doctors.json');
                const data = await response.json();
                const foundDoctor = data.doctors.find(d => d.id === id);
                setDoctor(foundDoctor);

                
                const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
                const alreadyBooked = appointments.find(app => app.doctorId === id);
                if (alreadyBooked) {
                    setIsBooked(true);
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [id]);

    if (loading) return <Loader />;
    if (!doctor) return <div className="text-white text-center py-20">Doctor not found!</div>;

    return (
        <section className="min-h-screen bg-[#050816] text-white py-10 lg:py-10">
            <div className="max-w-[90%] lg:max-w-[80%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    
                    <div className="lg:col-span-4">
                        <div className="relative rounded-[2rem] overflow-hidden border border-gray-800 shadow-2xl shadow-cyan-500/5">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-auto object-cover aspect-[3/4]"
                            />
                        </div>
                    </div>

                    
                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <div className="">
                            <span className="bg-[#21B7E2]/10 text-[#21B7E2] px-4 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border border-[#21B7E2]/20">
                                {doctor.specialty}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-2 tracking-tight">
                                {doctor.name}
                            </h1>
                            <div className="flex items-center gap-2 text-amber-500 font-bold">
                                <Star size={18} className="fill-amber-500" />
                                <span>{doctor.rating}</span>
                                <span className="text-gray-500 font-medium">/ 5.0</span>
                            </div>
                        </div>

                        <p className="text-gray-400 text-lg leading-relaxed mb-4 max-w-2xl">
                            {doctor.description}
                        </p>

                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-[#0a0f20] border border-gray-800 p-5 rounded-2xl flex items-center gap-4">
                                <div className="bg-[#21B7E2]/10 p-3 rounded-xl text-[#21B7E2]">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Experience</p>
                                    <p className="text-lg font-bold">{doctor.experience}</p>
                                </div>
                            </div>
                            <div className="bg-[#0a0f20] border border-gray-800 p-5 rounded-2xl flex items-center gap-4">
                                <div className="bg-[#21B7E2]/10 p-3 rounded-xl text-[#21B7E2]">
                                    <Building size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Hospital</p>
                                    <p className="text-lg font-bold truncate max-w-[200px]">{doctor.hospital}</p>
                                </div>
                            </div>
                            <div className="bg-[#0a0f20] border border-gray-800 p-5 rounded-2xl flex items-center gap-4">
                                <div className="bg-[#21B7E2]/10 p-3 rounded-xl text-[#21B7E2]">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Location</p>
                                    <p className="text-lg font-bold">{doctor.location}</p>
                                </div>
                            </div>
                            <div className="bg-[#0a0f20] border border-gray-800 p-5 rounded-2xl flex items-center gap-4">
                                <div className="bg-[#21B7E2]/10 p-3 rounded-xl text-[#21B7E2]">
                                    <Wallet size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Consultation Fee</p>
                                    <p className="text-lg font-bold text-[#21B7E2]">৳{doctor.fee}</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="mb-6">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <CalendarCheck size={20} className="text-[#21B7E2]" />
                                Availability
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {doctor.availability.map((time, index) => (
                                    <span
                                        key={index}
                                        className="bg-[#21B7E2]/10 border border-[#21B7E2]/30 text-[#21B7E2] px-5 py-2 rounded-xl text-sm font-bold"
                                    >
                                        {time}
                                    </span>
                                ))}
                            </div>
                        </div>

                        
                        <button
                            disabled={isBooked}
                            onClick={() => isBooked ? null : setIsModalOpen(true)}
                            className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${
                                isBooked
                                ? "bg-gray-800 text-gray-500 cursor-not-allowed opacity-70 border border-gray-700"
                                : "bg-[#21B7E2] text-[#050816] hover:bg-white shadow-xl shadow-cyan-500/10"
                            }`}
                        >
                            {isBooked ? (
                                <><BadgeCheck size={20} /> Appointment Already Booked</>
                            ) : (
                                <><CalendarCheck size={20} /> Proceed to Appointment</>
                            )}
                        </button>

                        
                        {doctor && (
                            <BookingModal
                                doctor={doctor}
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                            />
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoctorDetails;