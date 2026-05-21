import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Briefcase, ArrowRight } from 'lucide-react';

const DoctorCard = ({ doc }) => {
  return (
    <div className="bg-[#0a0f20] border border-gray-800 rounded-[2rem] overflow-hidden group hover:border-[#21B7E2]/50 transition-all duration-500 shadow-2xl">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={doc.image} 
          alt={doc.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 right-4 bg-[#050816]/80 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-sm font-bold text-[#21B7E2]">
          <Star className="w-4 h-4 fill-[#21B7E2]" />
          {doc.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <h3 className="text-xl font-bold text-white group-hover:text-[#21B7E2] transition-colors">{doc.name}</h3>
        <p className="text-[#21B7E2] font-semibold text-sm mb-4 uppercase tracking-wider">{doc.specialty}</p>
        
        <div className="space-y-3 mb-6 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-600" /> {doc.location}
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-gray-600" /> {doc.experience} Experience
          </div>
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-gray-800">
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Consultation</p>
            <p className="text-xl font-bold text-white">৳{doc.fee}</p>
          </div>
          
          {/* View Details Link */}
          <Link 
            href={`/doctors/${doc.id}`} 
            className="flex items-center gap-2 bg-[#21B7E2] hover:bg-white text-[#050816] px-5 py-2.5 rounded-xl font-bold text-sm transition-all transform active:scale-95"
          >
            View Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;