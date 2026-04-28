import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Calendar, Users, MapPin, CheckCircle, AlertCircle, User, ArrowRight, ArrowLeft } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import api, { createBooking, processPayment } from '../services/api';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tour, guests, date, roomType, extras, selectedGuides, totalPrice } = location.state || {};

  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Traveler Details State
  const [travelerDetails, setTravelerDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // Dynamic state for other travelers based on guest count
  const [otherTravelers, setOtherTravelers] = useState(
    Array.from({ length: Math.max(0, (guests || 1) - 1) }, () => ({ name: '', age: '' }))
  );

  // Step 2: Payment State
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    nameOnCard: ''
  });

  useEffect(() => {
    if (!tour) {
      navigate('/products');
    }
    // Pre-fill email/name if user is logged in
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setTravelerDetails(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || ''
      }));
    }
  }, [tour, navigate]);

  const handleTravelerChange = (e) => {
    const { name, value } = e.target;
    setTravelerDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleOtherTravelerChange = (index, field, value) => {
    const updated = [...otherTravelers];
    updated[index][field] = value;
    setOtherTravelers(updated);
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (!travelerDetails.fullName || !travelerDetails.email || !travelerDetails.phone) {
      setError('Please fill in all primary traveler details.');
      return false;
    }
    // Validate other travelers
    for (let i = 0; i < otherTravelers.length; i++) {
      if (!otherTravelers[i].name || !otherTravelers[i].age) {
        setError(`Please fill in details for Traveler ${i + 2}.`);
        return false;
      }
    }
    setError('');
    return true;
  };

  const validateStep2 = () => {
    if (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvc || !paymentDetails.nameOnCard) {
      setError('Please fill in all payment details.');
      return false;
    }
    setError('');
    return true;
  };

  const nextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setError('');
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    setError('');

    try {
      // 1. Prepare Booking Data
      // Ensure we have a valid date. If not passed from DetailPage, we might need to ask for it or fail.
      if (!date) {
        throw new Error("Travel date is missing. Please restart booking.");
      }

      let tourMongoId = tour._id;
      if (!tourMongoId) {
        try {
          const tourRes = await api.get(`/tours/${tour.id}`);
          tourMongoId = tourRes.data._id;
        } catch (err) {
          console.error("Could not fetch tour ID", err);
          // Fallback or error if we can't get the mongo ID
        }
      }

      const bookingPayload = {
        tourId: tourMongoId || tour.id, // Fallback to whatever ID we have
        travelDate: date,
        guests,
        totalPrice,
        // We could store the detailed traveler info in a 'metadata' field if the backend supported it,
        // but for now we just stick to the schema requirements.
      };

      const bookingRes = await createBooking(bookingPayload);
      const newBookingId = bookingRes._id;

      // 2. Process Payment
      await processPayment({
        amount: totalPrice,
        bookingId: newBookingId,
        paymentMethod: 'credit_card'
      });

      setStep(3); // Success Step
      setTimeout(() => {
        navigate('/profile');
      }, 4000);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!tour) return null;

  // --- Success View ---
  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-8">
            Your trip to <span className="font-bold text-slate-800">{tour.location}</span> is successfully booked.
            <br />We've sent a confirmation email to {travelerDetails.email}.
          </p>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
            <div className="h-full bg-green-500 animate-[progress_4s_ease-in-out_forwards]" style={{ width: '0%' }}></div>
          </div>
          <p className="text-xs text-slate-400">Redirecting to your bookings...</p>
          <style>{`
@keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
}
`}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans text-slate-900">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-8">
        {/* Stepper Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
            <div className={`flex flex-col items-center gap-2 bg-[#faf9f6] px-4 ${step >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 1 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
              <span className="text-sm font-bold">Travelers</span>
            </div>
            <div className={`flex flex-col items-center gap-2 bg-[#faf9f6] px-4 ${step >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 2 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
              <span className="text-sm font-bold">Payment</span>
            </div>
            <div className={`flex flex-col items-center gap-2 bg-[#faf9f6] px-4 ${step >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 3 ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
              <span className="text-sm font-bold">Done</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">

          {/* Left: Forms */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-3 animate-pulse">
                  <AlertCircle size={20} /> {error}
                </div>
              )}

              {/* STEP 1: Traveler Details */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-2xl font-bold font-serif mb-6">Who is traveling?</h2>

                  {/* Primary Traveler */}
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <User size={20} className="text-slate-500" /> Primary Traveler
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={travelerDetails.fullName}
                          onChange={handleTravelerChange}
                          className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-slate-800 outline-none"
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={travelerDetails.email}
                          onChange={handleTravelerChange}
                          className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-slate-800 outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={travelerDetails.phone}
                          onChange={handleTravelerChange}
                          className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-slate-800 outline-none"
                          placeholder="+1 234 567 890"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Special Requests (Optional)</label>
                        <textarea
                          name="specialRequests"
                          value={travelerDetails.specialRequests}
                          onChange={handleTravelerChange}
                          className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-slate-800 outline-none h-24 resize-none"
                          placeholder="Dietary restrictions, accessibility needs, etc."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Other Travelers */}
                  {otherTravelers.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Users size={20} className="text-slate-500" /> Other Travelers
                      </h3>
                      {otherTravelers.map((traveler, index) => (
                        <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-100 grid grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name (Traveler {index + 2})</label>
                            <input
                              type="text"
                              value={traveler.name}
                              onChange={(e) => handleOtherTravelerChange(index, 'name', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-slate-800 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Age</label>
                            <input
                              type="number"
                              value={traveler.age}
                              onChange={(e) => handleOtherTravelerChange(index, 'age', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-slate-800 outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={nextStep}
                      className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition flex items-center gap-2"
                    >
                      Continue to Payment <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Payment */}
              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <button onClick={prevStep} className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-sm font-bold mb-2">
                    <ArrowLeft size={16} /> Back to Details
                  </button>

                  <h2 className="text-2xl font-bold font-serif mb-6">Payment Method</h2>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-4 mb-6">
                      <button className="flex-1 bg-white border-2 border-slate-800 text-slate-900 py-3 rounded-lg font-bold shadow-sm flex items-center justify-center gap-2">
                        <CreditCard size={18} /> Credit Card
                      </button>
                      <button className="flex-1 bg-slate-100 border border-transparent text-slate-400 py-3 rounded-lg font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                        PayPal
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name on Card</label>
                        <input
                          type="text"
                          name="nameOnCard"
                          value={paymentDetails.nameOnCard}
                          onChange={handlePaymentChange}
                          className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-slate-800 outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentDetails.cardNumber}
                          onChange={handlePaymentChange}
                          className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-slate-800 outline-none"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            value={paymentDetails.expiry}
                            onChange={handlePaymentChange}
                            className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-slate-800 outline-none"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">CVC / CVV</label>
                          <input
                            type="text"
                            name="cvc"
                            value={paymentDetails.cvc}
                            onChange={handlePaymentChange}
                            className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-slate-800 outline-none"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleFinalSubmit}
                      disabled={loading}
                      className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? 'Processing Payment...' : `Pay $${totalPrice.toLocaleString()} & Book Now`}
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
                      <ShieldCheck size={12} /> SSL Secure Payment • 256-bit Encryption
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right: Order Summary (Sticky) */}
          <div className="lg:w-[380px]">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden sticky top-24">
              <div className="bg-slate-900 p-6 text-white">
                <h3 className="text-lg font-bold font-serif">Booking Summary</h3>
              </div>

              <div className="p-6">
                <div className="flex gap-4 mb-6">
                  <img src={tour.image} alt={tour.title} className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight mb-1 text-sm">{tour.title}</h4>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                      <MapPin size={12} /> {tour.location}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      ★ {tour.rating}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm border-t border-slate-100 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-600 flex items-center gap-2"><Calendar size={14} /> Date</span>
                    <span className={`font-medium ${!date ? 'text-red-500' : ''}`}>{date || 'Missing Date!'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 flex items-center gap-2"><Users size={14} /> Guests</span>
                    <span className="font-medium">{guests} People</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Room Type</span>
                    <span className="font-medium">{roomType}</span>
                  </div>
                  {extras && extras.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Extras</span>
                      <span className="font-medium">{extras.length} Selected</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-500 font-bold">Total Price</span>
                    <span className="text-3xl font-bold text-slate-900">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
