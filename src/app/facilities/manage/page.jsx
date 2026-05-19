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

  return (
    <ProtectedRoute>
      <div className="flex-grow bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200/50 dark:border-slate-800/80 pb-6">
            <div className="space-y-2">
              <span className="text-primary-500 font-extrabold text-sm uppercase tracking-wider">Host Dashboard</span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">Manage My Facilities</h1>
              <p className="text-slate-550 dark:text-slate-400 text-sm font-medium">
                Add fields, adjust rates per hour, edit operational details, or cancel your active listings.
              </p>
            </div>
            <Link
              href="/facilities/add"
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-5 py-2.5 rounded-2xl text-sm shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 active:scale-95 transition-all flex items-center"
            >
              <PlusCircle className="h-4.5 w-4.5 mr-2" />
              Add Facility
            </Link>
          </div>

          {/* Core content */}
          {loading ? (
            <div className="py-24 flex justify-center">
              <Spinner size="large" />
            </div>
          ) : myFacilities.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 max-w-xl mx-auto shadow-sm space-y-4">
              <div className="p-4 bg-slate-100 dark:bg-slate-955 text-slate-400 dark:text-slate-500 rounded-full w-fit mx-auto">
                <Sliders className="h-10 w-10 animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">No facilities listed</h3>
              <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                You haven't listed any sports facilities on SportNest yet. Register your fields or turfs and start hosting match bookings!
              </p>
              <Link
                href="/facilities/add"
                className="inline-flex bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-2xl text-sm shadow-md transition-all active:scale-95"
              >
                List Your First Turf
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myFacilities.map((facility) => (
                <div 
                  key={facility._id} 
                  className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
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
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3.5 py-1 bg-primary-500 text-white text-xs font-bold uppercase tracking-wider rounded-full border border-primary-400/20 backdrop-blur-md">
                        {facility.facility_type}
                      </span>
                    </div>
                  </div>

                  {/* Info details */}
                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-850 dark:text-white truncate">
                        {facility.name}
                      </h3>
                      <div className="flex items-center text-slate-450 dark:text-slate-400 text-xs">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span className="truncate">{facility.location}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/35 dark:border-slate-850">
                      <div>
                        <span className="text-[10px] text-slate-450 uppercase block font-bold">Price rate</span>
                        <span className="font-extrabold text-slate-800 dark:text-white">${facility.price_per_hour}/hr</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-450 uppercase block font-bold">Players Limit</span>
                        <span className="font-extrabold text-slate-800 dark:text-white">{facility.capacity} Max</span>
                      </div>
                    </div>

                    {/* Actions button row */}
                    <div className="flex gap-3 pt-2 mt-auto border-t border-slate-100 dark:border-slate-800/60">
                      <button
                        onClick={() => handleEditClick(facility)}
                        className="flex-grow flex items-center justify-center bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2.5 rounded-xl text-xs font-bold transition-all border border-slate-200/20 active:scale-95"
                      >
                        <Edit2 className="h-3.5 w-3.5 mr-1 text-slate-500" />
                        Edit Details
                      </button>

                      <button
                        onClick={() => handleDeleteClick(facility._id)}
                        className="flex-grow flex items-center justify-center bg-red-50 hover:bg-red-100 dark:bg-red-950/10 dark:hover:bg-red-950/20 text-red-500 py-2.5 rounded-xl text-xs font-bold transition-all border border-red-500/10 active:scale-95"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1 text-red-400" />
                        Delete Field
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}

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
          {isEditOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in">
              <div className="fixed inset-0" onClick={() => setIsEditOpen(false)} />
              
              <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col">
                
                {/* Header title */}
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 flex justify-between items-center bg-slate-50 dark:bg-slate-950/25">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Edit Facility Specifications</h3>
                    <p className="text-xs text-slate-450 dark:text-slate-400">Update listing pricing, capacities, and scheduling slots.</p>
                  </div>
                  <button onClick={() => setIsEditOpen(false)} className="p-1 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-450 transition-all">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Form scroll section */}
                <form onSubmit={handleSubmit(onEditSubmit)} className="flex-grow overflow-y-auto p-6 space-y-5">
                  
                  {/* Name and Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Facility Name</label>
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all text-sm font-medium"
                      />
                      {errors.name && <span className="text-xs text-red-500 font-bold block mt-0.5">{errors.name.message}</span>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Sport Category</label>
                      <select
                        {...register('facility_type', { required: 'Type is required' })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all text-sm font-medium cursor-pointer"
                      >
                        {sportTypes.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Location and Photo Cover URL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Location Address</label>
                      <input
                        type="text"
                        {...register('location', { required: 'Location is required' })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all text-sm font-medium"
                      />
                      {errors.location && <span className="text-xs text-red-500 font-bold block mt-0.5">{errors.location.message}</span>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Photo Cover URL</label>
                      <input
                        type="url"
                        {...register('image', { required: 'Image is required' })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all text-sm font-medium"
                      />
                      {errors.image && <span className="text-xs text-red-500 font-bold block mt-0.5">{errors.image.message}</span>}
                    </div>
                  </div>

                  {/* Price rate and Player limit */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Price per Hour ($)</label>
                      <input
                        type="number"
                        min="1"
                        {...register('price_per_hour', { required: 'Rate is required', min: 1 })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all text-sm font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Player Capacity limit</label>
                      <input
                        type="number"
                        min="1"
                        {...register('capacity', { required: 'Capacity is required', min: 1 })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all text-sm font-semibold"
                      />
                    </div>
                  </div>

                  {/* Available scheduling slots selection checkboxes */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Available Slots</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {presetSlots.map((slot) => {
                        const isChecked = editSlots.includes(slot);
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => handleEditSlotToggle(slot)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                              isChecked
                                ? 'bg-primary-500/10 border-primary-500 text-primary-650 dark:text-primary-400 font-extrabold'
                                : 'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-450 border-slate-200 dark:border-slate-800/80'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description textarea */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Description Details</label>
                    <textarea
                      rows="3"
                      {...register('description', { required: 'Description is required' })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all text-sm font-medium resize-none"
                    />
                    {errors.description && <span className="text-xs text-red-500 font-bold block mt-0.5">{errors.description.message}</span>}
                  </div>

                </form>

                {/* Footer Save changes row */}
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 flex justify-end space-x-3 bg-slate-50 dark:bg-slate-950/25">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-850 text-slate-700 dark:text-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit(onEditSubmit)}
                    disabled={updating}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-primary-500 hover:bg-primary-600 shadow-md active:scale-95 transition-all flex items-center"
                  >
                    {updating ? <Spinner size="small" /> : 'Save Specifications'}
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}
