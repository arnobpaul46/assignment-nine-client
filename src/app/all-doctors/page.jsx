"use client";
import React, { useState, useEffect, useMemo } from 'react';
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
      
      
      const token = localStorage.getItem('access-token');

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/all-doctors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
          'authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setDoctors(data);
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
    
    if (!doctors || doctors.length === 0) return ["All"];
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
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="max-w-[80%] mx-auto py-16">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif">
              Our <span className="text-[#21B7E2]">Specialists</span>
            </h1>
            <p className="text-gray-400 mt-2">Browse through our verified medical experts.</p>
          </div>
          
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by doctor name..." 
              className="w-full bg-[#0a0f20] text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-800 outline-none focus:ring-2 focus:ring-[#21B7E2] focus:border-transparent transition-all placeholder:text-gray-600 shadow-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {!loading && (
          <div className="flex flex-wrap gap-3 mb-12">
            {specialties.map(s => (
              <button
                key={s}
                onClick={() => setSelectedSpecialty(s)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                  selectedSpecialty === s 
                  ? "bg-[#21B7E2] text-[#050816] border-[#21B7E2] shadow-lg shadow-cyan-500/20" 
                  : "bg-transparent text-gray-400 border-gray-800 hover:border-[#21B7E2] hover:text-[#21B7E2]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="py-20"><Loader /></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredDoctors.map(doc => (
                
                <DoctorCard key={doc.id || doc._id} doc={doc} />
              ))}
            </div>
            
            {filteredDoctors.length === 0 && (
              <div className="text-center py-32 border border-dashed border-gray-800 rounded-[3rem]">
                <p className="text-gray-500 text-xl font-medium">No specialists found matching your criteria.</p>
                <button 
                   onClick={() => {setSearchTerm(""); setSelectedSpecialty("All")}}
                   className="mt-4 text-[#21B7E2] hover:underline"
                >
                    Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}