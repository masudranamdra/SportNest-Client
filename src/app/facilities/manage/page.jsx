'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Spinner from '@/components/Spinner';
import Modal from '@/components/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  Edit2, 
  Trash2, 
  MapPin, 
  Users, 
  Clock, 
  X,
  Sliders,
  AlignLeft,
  Image as ImageIcon
} from 'lucide-react';

const presetSlots = [
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
  '18:00 - 19:00',
  '19:00 - 20:00',
  '20:00 - 21:00',
  '21:00 - 22:00',
];

const sportTypes = [
  { label: 'Football', value: 'football' },
  { label: 'Cricket', value: 'cricket' },
  { label: 'Badminton', value: 'badminton' },
  { label: 'Tennis', value: 'tennis' },
  { label: 'Basketball', value: 'basketball' },
  { label: 'Swimming', value: 'swimming' },
];

export default function ManageMyFacilitiesPage() {
  const { user } = useAuth();
  const [myFacilities, setMyFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Deletion Confirm Modal States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Edit Overlay Modal States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editFacility, setEditFacility] = useState(null);
  const [editSlots, setEditSlots] = useState([]);
  const [updating, setUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm();

  const fetchMyFacilities = async () => {
    try {
      setLoading(true);
      const data = await api.get('/facilities');
      if (data.success && data.facilities && user) {
        // Filter facilities listed by this owner's email
        const owned = data.facilities.filter(f => f.owner_email === user.email);
        setMyFacilities(owned);
      }
    } catch (error) {
      toast.error('Failed to load your listed facilities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyFacilities();
    }
  }, [user]);

  // Handle Edit Action Click
  const handleEditClick = (facility) => {
    setEditFacility(facility);
    setEditSlots(facility.available_slots || []);
    
    // Set form fields values
    setValue('name', facility.name);
    setValue('facility_type', facility.facility_type);
    setValue('image', facility.image);
    setValue('location', facility.location);
    setValue('price_per_hour', facility.price_per_hour);
    setValue('capacity', facility.capacity);
    setValue('description', facility.description);
    
    setIsEditOpen(true);
  };

  const handleEditSlotToggle = (slot) => {
    if (editSlots.includes(slot)) {
      setEditSlots(prev => prev.filter(s => s !== slot));
    } else {
      setEditSlots(prev => [...prev, slot]);
    }
  };

  // Submit Edit Patch Request
  const onEditSubmit = async (data) => {
    if (editSlots.length === 0) {
      toast.error('Please choose at least one scheduling slot.');
      return;
    }

    try {
      setUpdating(true);
      const payload = {
        ...data,
        price_per_hour: Number(data.price_per_hour),
        capacity: Number(data.capacity),
        available_slots: editSlots,
      };

      const res = await api.patch(`/facilities/${editFacility._id}`, payload);
      if (res.success && res.facility) {
        toast.success(res.message || 'Facility details updated successfully!');
        // Update local list
        setMyFacilities(prev => prev.map(f => f._id === editFacility._id ? res.facility : f));
        setIsEditOpen(false);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update facility details');
    } finally {
      setUpdating(false);
    }
  };

  // Handle Delete Click
  const handleDeleteClick = (id) => {
    setSelectedFacilityId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      const res = await api.delete(`/facilities/${selectedFacilityId}`);
      if (res.success) {
        toast.success(res.message || 'Facility listed deleted successfully!');
        setMyFacilities(prev => prev.filter(f => f._id !== selectedFacilityId));
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete facility listing');
    } finally {
      setIsDeleteOpen(false);
      setSelectedFacilityId(null);
      setDeleting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <ProtectedRoute>
      <div className="flex-grow bg-slate-55 dark:bg-[#070b19] py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-250 relative min-h-[90vh]">
        
        {/* Ambient background glows (only dark mode) */}
        <div className="hidden dark:block absolute top-0 right-1/4 w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          
          {/* Header section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
            <div className="space-y-3">
              <span className="text-blue-600 dark:text-sky-400 font-extrabold text-xs uppercase tracking-widest block">Host Dashboard</span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Manage My Facilities</h1>
              <p className="text-slate-655 dark:text-slate-400 text-xs sm:text-sm font-semibold max-w-xl">
                Add fields, adjust rates per hour, edit operational details, or cancel your active listings.
              </p>
            </div>
            <Link
              href="/facilities/add"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-all flex items-center"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Facility
            </Link>
          </div>

          {/* Core content */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="py-24 flex justify-center"
              >
                <Spinner size="large" />
              </motion.div>
            ) : myFacilities.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20 bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-900 rounded-3xl p-8 max-w-xl mx-auto shadow-sm space-y-5"
              >
                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 text-slate-455 dark:text-slate-500 rounded-2xl w-fit mx-auto border border-slate-200 dark:border-slate-800">
                  <Sliders className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-350">No facilities listed</h3>
                  <p className="text-xs text-slate-655 dark:text-slate-500 leading-relaxed max-w-xs mx-auto font-semibold">
                    You haven't listed any sports facilities on SportNest yet. Register your fields or turfs and start hosting bookings!
                  </p>
                </div>
                <Link
                  href="/facilities/add"
                  className="inline-flex bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
                >
                  List Your First Turf
                </Link>
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {myFacilities.map((facility) => (
                  <motion.div 
                    key={facility._id} 
                    variants={itemVariants}
                    className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:border-blue-500/25 dark:hover:border-blue-500/25 hover:shadow-md dark:hover:shadow-blue-500/5 transition-all duration-300"
                  >
                    
                    {/* Aspect Ratio Cover Photo */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                      <img
                        src={facility.image}
                        alt={facility.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=600';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3.5 py-1.5 bg-gradient-to-r from-blue-650 to-[#10b981] text-white text-[10px] font-extrabold uppercase tracking-widest rounded-xl shadow-md border border-blue-500/10">
                          {facility.facility_type}
                        </span>
                      </div>
                    </div>

                    {/* Info details */}
                    <div className="p-6 flex flex-col flex-grow space-y-4">
                      
                      <div className="space-y-1.5">
                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">
                          {facility.name}
                        </h3>
                        <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-semibold">
                          <MapPin className="h-4 w-4 mr-2 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                          <span className="truncate">{facility.location}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-900 rounded-2xl">
                        <div className="space-y-0.5">
                          <span className="text-[9px] text-slate-500 dark:text-slate-550 uppercase block font-bold tracking-wider">Price rate</span>
                          <span className="text-sm font-bold text-slate-805 dark:text-slate-200 flex items-center">
                            <span className="text-xs text-blue-600 dark:text-sky-400 mr-0.5">$</span>
                            {facility.price_per_hour}
                            <span className="text-[10px] font-semibold text-slate-500 ml-0.5">/hr</span>
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[9px] text-slate-500 dark:text-slate-550 uppercase block font-bold tracking-wider">Players Limit</span>
                          <span className="text-sm font-bold text-slate-805 dark:text-slate-200 flex items-center">
                            <Users className="h-4 w-4 mr-1.5 text-slate-400 dark:text-slate-500" />
                            {facility.capacity} Max
                          </span>
                        </div>
                      </div>

                      {/* Actions button row */}
                      <div className="flex gap-3 pt-2 mt-auto border-t border-slate-100 dark:border-slate-800/60 pt-4">
                        <button
                          onClick={() => handleEditClick(facility)}
                          className="flex-grow flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-200 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-slate-200 dark:border-slate-700/30 active:scale-95 shadow-sm"
                        >
                          <Edit2 className="h-3.5 w-3.5 mr-2 text-slate-500 dark:text-slate-400" />
                          Edit Details
                        </button>

                        <button
                          onClick={() => handleDeleteClick(facility._id)}
                          className="flex-grow flex items-center justify-center bg-red-50/80 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-650 dark:text-red-400 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-red-500/20 active:scale-95"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-2 text-red-550 dark:text-red-400/80" />
                          Delete Field
                        </button>
                      </div>

                    </div>

                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delete double confirmation modal */}
          <Modal
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Delete Turf Listing?"
            message="Are you sure you want to delete this facility listed? This will permanently erase the listing and all details from SportNest index boards."
            confirmText={deleting ? 'Deleting...' : 'Delete Facility'}
            cancelText="Keep Listing"
            isDanger={true}
          />

          {/* Dynamic Edit overlay Modal */}
          <AnimatePresence>
            {isEditOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-955/80 backdrop-blur-md animate-fade-in">
                <div className="fixed inset-0" onClick={() => setIsEditOpen(false)} />
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
                >
                  
                  {/* Header title */}
                  <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/40">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">Edit Facility Specifications</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Update listing pricing, capacities, and scheduling slots.</p>
                    </div>
                    <button onClick={() => setIsEditOpen(false)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Form scroll section */}
                  <form onSubmit={handleSubmit(onEditSubmit)} className="flex-grow overflow-y-auto p-6 space-y-5">
                    
                    {/* Name and Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Facility Name</label>
                        <input
                          type="text"
                          {...register('name', { required: 'Name is required' })}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                        />
                        {errors.name && <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.name.message}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Sport Category</label>
                        <select
                          {...register('facility_type', { required: 'Type is required' })}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider cursor-pointer"
                        >
                          {sportTypes.map((type) => (
                            <option key={type.value} value={type.value} className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">{type.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Location and Photo Cover URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Location Address</label>
                        <input
                          type="text"
                          {...register('location', { required: 'Location is required' })}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                        />
                        {errors.location && <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.location.message}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Photo Cover URL</label>
                        <input
                          type="url"
                          {...register('image', { required: 'Image is required' })}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                        />
                        {errors.image && <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.image.message}</span>}
                      </div>
                    </div>

                    {/* Price rate and Player limit */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Price per Hour ($)</label>
                        <input
                          type="number"
                          min="1"
                          {...register('price_per_hour', { required: 'Rate is required', min: 1 })}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-bold text-xs uppercase tracking-wider"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Player Capacity limit</label>
                        <input
                          type="number"
                          min="1"
                          {...register('capacity', { required: 'Capacity is required', min: 1 })}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-955 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-bold text-xs uppercase tracking-wider"
                        />
                      </div>
                    </div>

                    {/* Available scheduling slots selection checkboxes */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-slate-550 dark:text-slate-400 uppercase tracking-widest block">Available Slots</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {presetSlots.map((slot) => {
                          const isChecked = editSlots.includes(slot);
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => handleEditSlotToggle(slot)}
                              className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all active:scale-95 duration-200 ${
                                isChecked
                                  ? 'bg-blue-500/10 border-blue-400/30 text-blue-600 dark:text-sky-400 shadow-sm'
                                  : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Description textarea */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Description Details</label>
                      <textarea
                        rows="3"
                        {...register('description', { required: 'Description is required' })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-805 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider resize-none"
                      />
                      {errors.description && <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.description.message}</span>}
                    </div>

                  </form>

                  {/* Footer Save changes row */}
                  <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-3.5 bg-slate-50/50 dark:bg-slate-950/40">
                    <button
                      type="button"
                      onClick={() => setIsEditOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 transition-all active:scale-95 shadow-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit(onEditSubmit)}
                      disabled={updating}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-sm active:scale-95 transition-all flex items-center"
                    >
                      {updating ? <Spinner size="small" /> : 'Save Specifications'}
                    </button>
                  </div>

                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </ProtectedRoute>
  );
}
