"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import DoctorCard from '@/components/DoctorCard';
import Loader from '@/components/Loader'; 
import { Search } from 'lucide-react';

export default function AllDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/data/all-doctors.json');
      if (!response.ok) throw new Error("Failed to fetch data");
      
      const data = await response.json();
      setDoctors(data.doctors);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  
  const specialties = useMemo(() => {
    return ["All", ...new Set(doctors.map(d => d.specialty))];
  }, [doctors]);

  
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
          <div>
            <h1 className="text-4xl font-bold text-gray-900 font-serif">DocAppoint Specialists</h1>
            <p className="text-gray-500 mt-1">Find and book appointments with top doctors.</p>
          </div>
          {/* searching bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by doctor name..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#21B7E2] shadow-sm transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        
        {!loading && (
          <div className="flex flex-wrap gap-2 mb-10">
            {specialties.map(s => (
              <button
                key={s}
                onClick={() => setSelectedSpecialty(s)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  selectedSpecialty === s 
                  ? "bg-[#21B7E2] text-white shadow-lg shadow-cyan-100" 
                  : "bg-white text-gray-600 border border-gray-100 hover:border-[#21B7E2]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        
        {loading ? (
          <Loader /> 
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredDoctors.map(doc => (
                <DoctorCard key={doc.id} doc={doc} />
              ))}
            </div>
            
            {filteredDoctors.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl">No doctors found matching your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}