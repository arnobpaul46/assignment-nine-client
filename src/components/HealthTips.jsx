import React from 'react';
import { Droplets, Moon, Utensils, HeartPulse } from 'lucide-react';

const HealthTips = () => {
    const tips = [
        { id: 1, title: "Stay Hydrated", desc: "Drink at least 8 glasses of water daily to keep your skin and body healthy.", icon: <Droplets className="text-[#21B7E2]" /> },
        { id: 2, title: "Better Sleep", desc: "Ensure 7-8 hours of sound sleep for mental clarity and physical recovery.", icon: <Moon className="text-[#21B7E2]" /> },
        { id: 3, title: "Balanced Diet", desc: "Include green vegetables and fruits in your daily meals to boost immunity.", icon: <Utensils className="text-[#21B7E2]" /> },
        { id: 4, title: "Regular Exercise", desc: "A simple 30-minute walk can reduce the risk of heart disease by 40%.", icon: <HeartPulse className="text-[#21B7E2]" /> },
    ];

    return (
        <section className="bg-[#050816] py-20 border-t border-gray-900">
            <div className="max-w-[80%] mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Daily <span className="text-[#21B7E2]">Health Tips</span></h2>
                    <p className="text-gray-500 max-w-xl mx-auto italic">Simple changes in your daily routine can lead to a healthier life. Start today!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tips.map(tip => (
                        <div key={tip.id} className="bg-[#0a0f20] border border-gray-800 p-8 rounded-[2rem] hover:border-[#21B7E2]/50 transition-all group">
                            <div className="w-12 h-12 bg-[#21B7E2]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {tip.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{tip.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{tip.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HealthTips;