"use client";
import React from 'react';
import Link from 'next/link';
import { Activity } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const socialLinks = [
        { Icon: FaFacebookF, href: "https://facebook.com" },
        { Icon: FaXTwitter, href: "https://twitter.com" },
        { Icon: FaInstagram, href: "https://instagram.com" },
        { Icon: FaLinkedinIn, href: "https://linkedin.com" }
    ];

    const footerLinks = {
        explore: [
            { name: 'Home', href: '/' },
            { name: 'All Doctors', href: '/all-doctors' },
            { name: 'Dashboard', href: '/dashboard' }
        ],
        departments: [
            { name: 'Cardiology', href: '#' },
            { name: 'Neurology', href: '#' },
            { name: 'Dermatology', href: '#' }
        ]
    };

    return (
        <footer className="bg-[#050816] border-t border-gray-900 pt-20 pb-10">
            <div className="max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                
                <div className="space-y-6">
                    <Link href="/" className="flex items-center gap-2">
                        <Activity className="text-[#21B7E2] w-8 h-8" />
                        <span className="text-2xl font-black text-white tracking-tighter">DocAppoint</span>
                    </Link>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                        Connecting you with the best medical professionals in the country. Your health is our top priority.
                    </p>
                    <div className="flex gap-4">
                        {socialLinks.map((item, i) => (
                            <a 
                                key={i} 
                                href={item.href} 
                                target="_blank"
                                className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-[#21B7E2] hover:text-[#050816] transition-all shadow-lg"
                            >
                                <item.Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">Explore</h4>
                    <ul className="space-y-4">
                        {footerLinks.explore.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-gray-500 text-sm hover:text-[#21B7E2] transition-colors">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">Departments</h4>
                    <ul className="space-y-4">
                        {footerLinks.departments.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-gray-500 text-sm hover:text-[#21B7E2] transition-colors">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">Contact Info</h4>
                    <div className="space-y-4 text-sm">
                        <p className="text-gray-500">Dhanmondi, Dhaka, Bangladesh</p>
                        <p className="text-gray-500 underline decoration-[#21B7E2]/30">support@docappoint.com</p>
                        <p className="text-[#21B7E2] font-black text-xl tracking-tight mt-4">+880 123 456 789</p>
                    </div>
                </div>
            </div>

            <div className="max-w-[80%] mx-auto pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                    © {new Date().getFullYear()} DocAppoint. Designed & Built by Arnob Paul.
                </p>
                <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;