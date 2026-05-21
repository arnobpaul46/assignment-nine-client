"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import DoctorCard from '@/components/DoctorCard';
import { Search } from 'lucide-react';

export default function AllDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  useEffect(() => {
    fetch('/data/all-doctors.json')
      .then(res => res.json())
      .then(data => setDoctors(data.doctors));
  }, []);

  const specialties = ["All", ...new Set(doctors.map(d => d.specialty))];

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === "All" || doc.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [searchTerm, selectedSpecialty, doctors]);

  return (
    <main className="min-h-screen bg-gray-50">
      

      <div className="max-w-[80%] mx-auto py-12">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <h1 className="text-3xl font-bold text-gray-900">All Specialists</h1>
          {/* searchin bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by doctor name..." 
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#21B7E2]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Department name and showing the doctors */}
        <div className="flex flex-wrap gap-2 mb-10">
          {specialties.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSpecialty(s)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedSpecialty === s ? "bg-[#21B7E2] text-white" : "bg-white text-gray-600 border hover:border-[#21B7E2]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* doctors list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map(doc => (
            <DoctorCard key={doc.id} doc={doc} />
          ))}
        </div>
        
        {filteredDoctors.length === 0 && (
          <p className="text-center text-gray-500 py-20">No doctors found!</p>
        )}
      </div>
    </main>
  );
}