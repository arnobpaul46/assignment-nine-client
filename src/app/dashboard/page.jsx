"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { User, Mail, Camera, Edit3, Check, X, Calendar, BadgeCheck, Trash2, Edit } from 'lucide-react';

const Dashboard = () => {
    const { data: session, isPending } = authClient.useSession();
    const [activeTab, setActiveTab] = useState('appointments');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [deleteId, setDeleteId] = useState(null);
    const [updateData, setUpdateData] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [newImage, setNewImage] = useState("");
    const [updating, setUpdating] = useState(false);

    const fetchAppointments = useCallback(async () => {
        if (!session?.user?.email) return;
        
        try {
            const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI ;
            const res = await fetch(`${backendUri}/my-appointments?email=${session.user.email}`);
            const data = await res.json();
            setAppointments(data);
        } catch (err) {
            console.error("Error fetching appointments:", err);
        } finally {
            setLoading(false);
        }
    }, [session?.user?.email]);


    useEffect(() => {
        if (session?.user) {
            setNewName(session.user.name);
            setNewImage(session.user.image || "");
            fetchAppointments();
        }
    }, [session?.user?.email, fetchAppointments]); 

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI ;
            const res = await fetch(`${backendUri}/bookings/${deleteId}`, { method: 'DELETE' });
            if (res.ok) {
                toast.error("Appointment Cancelled Successfully!");
                setDeleteId(null);
                fetchAppointments();
            }
        } catch (error) {
            toast.error("Failed to cancel");
        }
    };

    const handleUpdateAppointment = async (e) => {
        e.preventDefault();
        if (!updateData || !updateData._id) return;

        try {
            const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI ;
            const res = await fetch(`${backendUri}/bookings/${updateData._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    appointmentDate: updateData.appointmentDate,
                    appointmentTime: updateData.appointmentTime
                })
            });
            if (res.ok) {
                toast.info("Appointment Updated Successfully!");
                setUpdateData(null);
                fetchAppointments();
            }
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdating(true);
        await authClient.updateUser({
            name: newName,
            image: newImage,
        }, {
            onSuccess: () => {
                toast.success("Profile updated successfully!");
                setIsEditing(false);
                setUpdating(false);
                
                window.location.reload();
            },
            onError: (err) => {
                toast.error(err.error.message);
                setUpdating(false);
            }
        });
    };

    if (isPending) return <div className="h-screen bg-[#050816] flex items-center justify-center text-[#21B7E2]">Loading Dashboard...</div>;

    return (
        <main className="min-h-screen bg-[#050816] text-white py-10">
            <div className="max-w-[90%] lg:max-w-[80%] mx-auto">
                <div className="flex flex-col lg:grid lg:grid-cols-4 gap-10">
                    <div className="lg:col-span-1 space-y-3">
                        <button onClick={() => setActiveTab('appointments')} className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'appointments' ? 'bg-[#21B7E2] text-[#050816]' : 'bg-white/5 text-gray-500 hover:text-white'}`}><Calendar size={20} color="#ffff" /> My Appointments</button>
                        <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'profile' ? 'bg-[#21B7E2] text-[#050816]' : 'bg-white/5 text-gray-500 hover:text-white'}`}><User size={20} /> My Profile</button>
                    </div>

                    <div className="lg:col-span-3">
                        {activeTab === 'appointments' ? (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6 italic text-[#21B7E2]">Active Appointments</h2>
                                {loading ? <p className="text-gray-500">Fetching appointments...</p> :
                                    appointments.length > 0 ? (
                                        appointments.map(app => (
                                            <div key={app._id} className="bg-[#0a0f20] border border-gray-800 p-6 rounded-[2rem] flex justify-between items-center group hover:border-[#21B7E2]/40 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-4 bg-[#21B7E2]/10 rounded-2xl text-[#21B7E2]"><Calendar color="#ffff"/></div>
                                                    <div>
                                                        <p className="text-[#21B7E2] text-sm font-black uppercase tracking-widest">Patient: {app.patientName}</p>
                                                        <h3 className="text-xl font-bold">{app.doctorName}</h3>
                                                        <p className="text-gray-500 text-sm">{app.appointmentTime} | {app.appointmentDate}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button onClick={() => setUpdateData(app)} className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all"><Edit size={18} /></button>
                                                    <button onClick={() => setDeleteId(app._id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-20 text-gray-600 border border-dashed border-gray-800 rounded-[2.5rem]">No appointments found.</div>
                                    )}
                            </div>
                        ) : (
                            <div className="bg-[#0a0f20] border border-gray-800 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                                <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                                    <div className="w-28 h-28 rounded-[2rem] overflow-hidden border-2 border-[#21B7E2]">
                                        <img src={session?.user?.image || "https://api.dicebear.com/7.x/avataaars/svg"} className="w-full h-full object-cover" alt="Profile" />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h2 className="text-3xl font-black">{session?.user?.name}</h2>
                                        <p className="text-gray-500 flex items-center gap-2"><Mail size={14} /> {session?.user?.email}</p>
                                        <div className="mt-3 bg-green-500/10 text-green-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest w-fit inline-flex items-center gap-2">
                                            <BadgeCheck size={14} /> Verified Account
                                        </div>
                                    </div>
                                </div>

                                {!isEditing ? (
                                    <div className="space-y-6 pt-6 border-t border-gray-800">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-[#050816] p-5 rounded-2xl border border-gray-800"><p className="text-[10px] text-gray-600 font-bold uppercase">Name</p><p className="text-lg font-bold">{session?.user?.name}</p></div>
                                            <div className="bg-[#050816] p-5 rounded-2xl border border-gray-800"><p className="text-[10px] text-gray-600 font-bold uppercase">Email</p><p className="text-lg font-bold">{session?.user?.email}</p></div>
                                        </div>
                                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-8 py-3 rounded-xl font-bold transition-all"><Edit3 size={16} /> Edit Profile Data</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleUpdateProfile} className="space-y-5 pt-6 border-t border-gray-800 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <input type="text" value={newName} required className="bg-[#050816] border border-gray-800 rounded-xl p-4 outline-none focus:border-[#21B7E2] text-white" onChange={(e) => setNewName(e.target.value)} />
                                            <input type="url" value={newImage} placeholder="Image URL" className="bg-[#050816] border border-gray-800 rounded-xl p-4 outline-none focus:border-[#21B7E2] text-white" onChange={(e) => setNewImage(e.target.value)} />
                                        </div>
                                        <div className="flex gap-3">
                                            <button disabled={updating} type="submit" className="bg-[#21B7E2] text-[#050816] px-8 py-3 rounded-xl font-black">{updating ? "Saving..." : "Save Changes"}</button>
                                            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-800 px-8 py-3 rounded-xl font-bold">Cancel</button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cancel Modal */}
            {deleteId && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#0a0f20] border border-red-500/20 p-8 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl">
                        <Trash2 size={48} className="mx-auto text-red-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Cancel Appointment?</h3>
                        <p className="text-gray-400 text-sm mb-6">Are you sure you want to cancel this booking?</p>
                        <div className="flex gap-3">
                            <button onClick={confirmDelete} className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold">Yes, Cancel</button>
                            <button onClick={() => setDeleteId(null)} className="flex-1 bg-gray-800 py-3 rounded-xl font-bold">No</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {updateData && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#0a0f20] border border-[#21B7E2]/20 p-8 rounded-[2.5rem] max-w-sm w-full shadow-2xl">
                        <h3 className="text-xl font-bold mb-6 text-[#21B7E2]">Update Appointment</h3>
                        <form onSubmit={handleUpdateAppointment} className="space-y-4">
                            <div>
                                <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">New Date</label>
                                <input type="date" value={updateData?.appointmentDate || ""} onChange={(e) => setUpdateData({ ...updateData, appointmentDate: e.target.value })} className="w-full bg-[#050816] border border-gray-800 p-4 rounded-2xl mt-1 text-white outline-none focus:border-[#21B7E2]" />
                            </div>
                            <div>
                                <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">New Time</label>
                                <input type="text" value={updateData?.appointmentTime || ""} onChange={(e) => setUpdateData({ ...updateData, appointmentTime: e.target.value })} className="w-full bg-[#050816] border border-gray-800 p-4 rounded-2xl mt-1 text-white outline-none focus:border-[#21B7E2]" />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button type="submit" className="flex-1 bg-[#21B7E2] text-[#050816] py-3 rounded-xl font-bold">Save</button>
                                <button type="button" onClick={() => setUpdateData(null)} className="flex-1 bg-gray-800 py-3 rounded-xl font-bold">Back</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Dashboard;