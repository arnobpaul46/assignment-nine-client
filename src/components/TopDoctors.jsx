"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import DoctorCard from './DoctorCard'; 
import { ArrowRight, Sparkles } from 'lucide-react';

const TopDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('/data/all-doctors.json');
                const data = await response.json();

                
                const topDoctorsList = [];
                const specialties = [...new Set(data.doctors.map(d => d.specialty))];

                specialties.forEach(spec => {
                    const topInSpec = data.doctors
                        .filter(d => d.specialty === spec)
                        .reduce((prev, current) => (prev.rating > current.rating) ? prev : current);
                    topDoctorsList.push(topInSpec);
                });

                
                setDoctors(topDoctorsList.sort((a, b) => b.rating - a.rating).slice(0, 6));
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    if (loading) return null; 

    return (
        <section className="bg-[#050816] py-24 border-t border-gray-900">
            <div className="max-w-[80%] mx-auto">

                
                <div className="flex flex-col  justify-between  mb-10">
                    <div className="space-y-4 ">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#21B7E2]/10 border border-[#21B7E2]/20 text-[#21B7E2] text-xs font-bold uppercase tracking-widest">
                            <Sparkles size={14} />
                            Top Rated Specialists
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-5">

                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight ">
                            Meet Our <span className="text-[#21B7E2]">Top Experts</span> <br />
                            from Every Department
                        </h2>

                        <Link
                            href="/all-doctors"
                            className="group flex items-center gap-2 text-gray-400 hover:text-[#21B7E2] font-bold transition-all  w-fit"
                        >
                            Explore All Doctors
                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-2 transition-transform"
                            />
                        </Link>

                    </div>

                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {doctors.map(doc => (
                        <DoctorCard key={doc.id} doc={doc} />
                    ))}
                </div>


            </div>
        </section>
    );
};

export default TopDoctors;