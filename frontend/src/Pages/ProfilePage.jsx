import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { logout } from '../services/api';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/auth/me');
                setUser(data);

                const bookingsRes = await api.get('/bookings/mybookings');
                setBookings(bookingsRes.data);
            } catch (error) {
                console.error(error);
                logout();
                navigate('/login');
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#faf9f6] font-sans text-slate-900">
            <Navbar />
            <div className="container mx-auto px-4 pt-32 pb-12">
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                        >
                            Logout
                        </button>
                    </div>
                    <p className="text-slate-600">Email: {user.email}</p>
                    <p className="text-slate-600">Role: {user.role}</p>
                </div>

                <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
                {bookings.length === 0 ? (
                    <p className="text-slate-500">No bookings found.</p>
                ) : (
                    <div className="grid gap-6">
                        {bookings.map(booking => (
                            <div key={booking._id} className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                                <h3 className="text-xl font-bold mb-2">{booking.tour?.title || 'Unknown Tour'}</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                                    <p>Date: {new Date(booking.travelDate).toLocaleDateString()}</p>
                                    <p>Guests: {booking.guests}</p>
                                    <p>Total: ${booking.totalPrice}</p>
                                    <p>Status: <span className={`font-bold ${booking.status === 'confirmed' ? 'text-green-600' : 'text-amber-600'}`}>{booking.status}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
