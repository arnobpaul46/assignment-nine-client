import React from 'react';
import { Quote, Star } from 'lucide-react';

const Reviews = () => {
    const reviews = [
        { id: 1, name: "Arnob Paul", role: "Software Engineer", comment: "The booking process was incredibly smooth. I found a great neurologist in seconds!", rating: 5 },
        { id: 2, name: "Sara Islam", role: "Graphic Designer", comment: "The dashboard is so clean and easy to use. Highly recommend DocAppoint for everyone.", rating: 4.8 },
        { id: 3, name: "Rakib Ahmed", role: "Business Owner", comment: "Finally a platform where verified doctors are easily accessible in Dhaka. Excellent service!", rating: 5 },
    ];

    return (
        <section className="bg-[#050816] py-20">
            <div className="max-w-[80%] mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">What Our <span className="text-[#21B7E2]">Patients Say</span></h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map(rev => (
                        <div key={rev.id} className="bg-[#0a0f20] p-10 rounded-[2.5rem] border border-gray-800 relative">
                            <Quote className="absolute top-6 right-8 text-gray-800 w-12 h-12" />
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className={i < Math.floor(rev.rating) ? "fill-[#21B7E2] text-[#21B7E2]" : "text-gray-700"} />
                                ))}
                            </div>
                            <p className="text-gray-400 italic mb-8 leading-relaxed">"{rev.comment}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#21B7E2]/20 flex items-center justify-center font-bold text-[#21B7E2]">{rev.name[0]}</div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">{rev.name}</h4>
                                    <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">{rev.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;