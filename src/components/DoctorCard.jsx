import { Star, MapPin, Briefcase } from 'lucide-react';

const DoctorCard = ({ doc }) => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
    <div className="relative h-64 overflow-hidden">
      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold text-gray-800">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {doc.rating}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900">{doc.name}</h3>
      <p className="text-[#21B7E2] font-semibold text-sm mb-3">{doc.specialty}</p>
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-gray-400 text-sm"><MapPin size={14} /> {doc.location}</div>
        <div className="flex items-center gap-2 text-gray-400 text-sm"><Briefcase size={14} /> {doc.experience} Exp.</div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <p className="text-xl font-bold text-gray-900">৳{doc.fee}</p>
        <button className="bg-[#21B7E2] text-white px-4 py-2 rounded-xl font-bold text-sm">View Details</button>
      </div>
    </div>
  </div>
);

export default DoctorCard;