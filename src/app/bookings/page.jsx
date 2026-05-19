'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import Spinner from '@/components/Spinner';
import Modal from '@/components/Modal';
import { toast } from 'react-hot-toast';
import { 
  Calendar,
  createIcons,
  ShoppingCart, 
  Clock, 
  MapPin, 
  DollarSign, 
  Trash2, 
  CalendarDays,
  Sparkles
} from 'lucide-react';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Cancel confirmation States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await api.get('/bookings');
      if (data.success && data.bookings) {
        // Filter out bookings with deleted/invalid facilities to prevent blank/broken rendering
        const validBookings = data.bookings.filter(b => b.facility_id);
        setBookings(validBookings);
      }
    } catch (error) {
      toast.error('Failed to load your bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle Cancel Booking Trigger Modal
  const handleCancelClick = (id) => {
    setSelectedBookingId(id);
    setIsModalOpen(true);
  };

  // Perform Booking Cancel Call
  const handleConfirmCancel = async () => {
    try {
      setCancelling(true);
      const res = await api.delete(`/bookings/${selectedBookingId}`);
      if (res.success) {
        toast.success(res.message || 'Booking cancelled successfully!');
        // Update local state list to drop the deleted booking
        setBookings(prev => prev.filter(b => b._id !== selectedBookingId));
      }
    } catch (error) {
      toast.error(error.message || 'Failed to cancel booking');
    } finally {
      setIsModalOpen(false);
      setSelectedBookingId(null);
      setCancelling(false);
    }
  };

  const statusColors = {
    pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    confirmed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    cancelled: 'bg-red-500/10 text-red-650 dark:text-red-400 border-red-500/20',
  };

  return (
    <ProtectedRoute>
      <div className="flex-grow bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200/50 dark:border-slate-800/80 pb-6">
            <div className="space-y-2">
              <span className="text-primary-500 font-extrabold text-sm uppercase tracking-wider">Dashboard</span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">My Match Bookings</h1>
              <p className="text-slate-550 dark:text-slate-400 text-sm font-medium">
                Keep track of your active time slots, booking status, and team match dates.
              </p>
            </div>
            <Link
              href="/facilities"
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-5 py-2.5 rounded-2xl text-sm shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 active:scale-95 transition-all flex items-center"
            >
              <ShoppingCart className="h-4.5 w-4.5 mr-2" />
              Book New turf
            </Link>
          </div>

          {/* Core dynamic content */}
          {loading ? (
            <div className="py-24 flex justify-center">
              <Spinner size="large" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 max-w-xl mx-auto shadow-sm space-y-4">
              <div className="p-4 bg-slate-100 dark:bg-slate-955 text-slate-400 dark:text-slate-500 rounded-full w-fit mx-auto">
                <CalendarDays className="h-10 w-10 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">No active bookings</h3>
              <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                You haven't scheduled any sports fields yet. Discover Dhaka's premium turfs and lock your slots now!
              </p>
              <Link
                href="/facilities"
                className="inline-flex bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-2xl text-sm shadow-md transition-all active:scale-95"
              >
                Browse Sports Arenas
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookings.map((booking) => {
                const facility = booking.facility_id;
                // Graceful fallback for deleted facilities
                if (!facility) return null;

                return (
                  <div 
                    key={booking._id} 
                    className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    
                    {/* Header Image section */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                      <img
                        src={facility.image}
                        alt={facility.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=600';
                        }}
                      />
                      {/* Status Badges */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${statusColors[booking.status.toLowerCase()]} backdrop-blur-md`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    {/* Booking metadata */}
                    <div className="p-6 flex flex-col flex-grow space-y-4">
                      
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-850 dark:text-white truncate">
                          {facility.name}
                        </h3>
                        <div className="flex items-center text-slate-450 dark:text-slate-400 text-xs">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-slate-450" />
                          <span className="truncate">{facility.location}</span>
                        </div>
                      </div>

                      {/* Schedule cards */}
                      <div className="p-3.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-850 rounded-2xl space-y-2">
                        <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm font-semibold">
                          <Calendar className="h-4.5 w-4.5 mr-2 text-primary-500" />
                          <span>Date: {booking.booking_date}</span>
                        </div>
                        <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm font-semibold">
                          <Clock className="h-4.5 w-4.5 mr-2 text-primary-500" />
                          <span>Slot: {booking.time_slot}</span>
                        </div>
                        <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm font-semibold">
                          <Clock className="h-4.5 w-4.5 mr-2 text-primary-500" />
                          <span>Duration: {booking.hours} hours</span>
                        </div>
                      </div>

                      {/* Price Cancel row */}
                      <div className="flex justify-between items-center pt-2 mt-auto border-t border-slate-100 dark:border-slate-800/60 pt-4">
                        <div>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider block">Paid Price</span>
                          <span className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center">
                            <span className="text-sm font-bold text-primary-500 mr-0.5">$</span>
                            {booking.total_price}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCancelClick(booking._id)}
                          className="flex items-center text-red-500 hover:text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-red-500/10 hover:border-red-500/20 active:scale-95"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Cancel Match
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* Cancellation warning dialog modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmCancel}
            title="Cancel Match Schedule?"
            message="Are you sure you want to cancel this booking slot reservation? This will immediately free the sports turf time slot for other player groups."
            confirmText={cancelling ? 'Cancelling...' : 'Cancel Booking'}
            cancelText="Keep Match Slot"
            isDanger={true}
          />

        </div>
      </div>
    </ProtectedRoute>
  );
}
