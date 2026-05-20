'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import Spinner from '@/components/Spinner';
import { toast } from 'react-hot-toast';
import { 
  MapPin, 
  DollarSign, 
  Users, 
  Clock, 
  BookOpen, 
  Calendar, 
  AlertCircle, 
  ArrowLeft,
  CalendarCheck
} from 'lucide-react';

export default function FacilityDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [hours, setHours] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Get today's date formatted as YYYY-MM-DD to lock calendar inputs
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await api.get(`/facilities/${id}`);
        if (data.success && data.facility) {
          setFacility(data.facility);
          // Set initial default slot if available
          if (data.facility.available_slots?.length > 0) {
            setSelectedSlot(data.facility.available_slots[0]);
          }
        }
      } catch (error) {
        toast.error('Failed to load facility details');
        router.push('/facilities');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, router]);

  // Live Auto-calculated total price
  const totalPrice = facility ? hours * facility.price_per_hour : 0;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // 1. Auth check: Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast.error('Please login to book a sports facility slot.');
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    // 2. Validate inputs
    if (!bookingDate) {
      toast.error('Please select a booking date.');
      return;
    }
    if (!selectedSlot) {
      toast.error('Please choose a time slot.');
      return;
    }
    if (hours < 1) {
      toast.error('Booking must be at least 1 hour.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/bookings', {
        facility_id: id,
        booking_date: bookingDate,
        time_slot: selectedSlot,
        hours: Number(hours),
      });

      if (res.success) {
        toast.success(res.message || 'Slot reserved successfully!');
        router.push('/bookings');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to book slot');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex justify-center items-center py-24 bg-slate-50 dark:bg-slate-950">
        <Spinner size="large" />
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="flex-grow flex flex-col justify-center items-center py-20 bg-slate-50 dark:bg-slate-950">
        <p className="text-lg font-bold text-slate-800 dark:text-white">Facility not found</p>
        <button onClick={() => router.push('/facilities')} className="mt-4 bg-primary-500 text-white px-5 py-2 rounded-xl">
          Back to Facilities
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Link */}
        <button
          onClick={() => router.push('/facilities')}
          className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to list
        </button>

        {/* Master Details layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT 2 COLUMNS - Facility details, description */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Facility Image Showcase */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-900 shadow-sm">
              <img
                src={facility.image}
                alt={facility.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=1000';
                }}
              />
              <div className="absolute top-6 left-6 z-10">
                <span className="px-4 py-1.5 bg-primary-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                  {facility.facility_type}
                </span>
              </div>
            </div>

            {/* Core Info Details Card */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-6">
              
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-700 dark:text-white leading-tight">
                  {facility.name}
                </h1>
                
                {/* Location row */}
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                  <MapPin className="h-4.5 w-4.5 mr-2 text-slate-400 flex-shrink-0" />
                  <span>{facility.location}</span>
                </div>
              </div>

              {/* Specs Icons Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/50 dark:border-slate-850">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider block">Price rate</span>
                  <span className="text-lg font-semibold text-gray-600 dark:text-white flex items-center">
                    <span className="text-sm font-bold text-primary-500 mr-0.5">$</span>
                    {facility.price_per_hour}
                    <span className="text-xs font-normal text-slate-400 dark:text-slate-500 ml-1">/hr</span>
                  </span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider block">Capacity</span>
                  <span className="text-lg font-semibold text-gray-600 dark:text-white flex items-center">
                    <Users className="h-4.5 w-4.5 mr-1.5 text-slate-400 flex-shrink-0" />
                    {facility.capacity} Players
                  </span>
                </div>

                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider block">Total Bookings</span>
                  <span className="text-lg font-semibold text-gray-600 dark:text-white flex items-center">
                    <CalendarCheck className="h-4.5 w-4.5 mr-1.5 text-slate-400 flex-shrink-0" />
                    {facility.booking_count || 0} times
                  </span>
                </div>
              </div>

              {/* Description section */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-700 dark:text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-slate-400" />
                  Facility Description
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {facility.description}
                </p>
              </div>

              {/* Available Slots Badges list */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Standard Schedule slots
                </h3>
                <div className="flex flex-wrap gap-2">
                  {facility.available_slots?.map((slot) => (
                    <span 
                      key={slot} 
                      className="px-3.5 py-1.5 rounded-md text-xs font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-300"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN - Secure Booking Form Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-6 sticky top-24">
              
              <div className="border-b border-slate-100 dark:border-slate-800/60 pb-4">
                <h2 className="text-xl font-extrabold text-gray-700 dark:text-white">Secure Match Slot</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Book turf and checkout in seconds.</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-5">
                
                {/* Read-only Facility Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Facility Name</label>
                  <input
                    type="text"
                    value={facility.name}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-slate-150 dark:bg-slate-950 text-gray-600 uppercase dark:text-slate-400 border border-slate-200 dark:border-slate-800 focus:outline-none font-bold text-sm select-none"
                  />
                </div>

                {/* Booking Date field */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Booking Date</label>
                  <div className="relative">
                    <Calendar className="absolute Dark:text-white left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="date"
                      min={todayStr} // prevents historical bookings
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Slots Dropdown selector */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Time Slot</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all font-medium text-sm appearance-none cursor-pointer"
                    >
                      {facility.available_slots?.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Hours field */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Duration (Hours)</label>
                  <input
                    type="number"
                    min="1"
                    value={hours}
                    onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-gray-500 font-medium text-sm uppercase dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all font-semibold text-sm"
                  />
                </div>

                {/* Live Cost calculation row */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200/50 dark:border-slate-850 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider block">Total Checkout</span>
                    <span className="text-xs text-slate-400">({hours} hours × ${facility.price_per_hour}/hr)</span>
                  </div>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center">
                    <span className="text-2xl font-bold text-primary-500 mr-0.5">$</span>
                    {totalPrice}
                  </span>
                </div>

                {/* Submit trigger button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/60 text-white font-extrabold py-4 rounded-xl shadow-md shadow-primary-700/10 hover:shadow-primary-500/20 active:scale-95 transition-all text-sm flex items-center justify-center
                  dark:bg-blue-500/20 dark:hover:bg-blue-500/40 dark:shadow-blue-500/10 dark:hover:shadow-blue-500/20
                  "
                >
                  {submitting ? (
                    <Spinner size="small" />
                  ) : (
                    <>
                      Confirm Booking
                    </>
                  )}
                </button>
              </form>

              {/* Safety notice banner */}
              <div className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/60 rounded-2xl">
                <AlertCircle className="h-4.5 w-4.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-600 dark:text-blue-400 leading-relaxed font-medium">
                  Free cancellation from "My Bookings" before the game starts. Refunds are instantly processed.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
