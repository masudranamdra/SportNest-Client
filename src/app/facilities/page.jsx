'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import FacilityCard from '@/components/FacilityCard';
import Spinner from '@/components/Spinner';
import { Search, SlidersHorizontal, EyeOff, RotateCcw } from 'lucide-react';

const availableSports = [
  { label: 'All Sports', value: '' },
  { label: 'Football', value: 'football' },
  { label: 'Cricket', value: 'cricket' },
  { label: 'Badminton', value: 'badminton' },
  { label: 'Tennis', value: 'tennis' },
  { label: 'Basketball', value: 'basketball' },
  { label: 'Swimming', value: 'swimming' },
];

export default function AllFacilitiesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Retrieve initial sport_type parameter from URL (e.g. from homepage category link)
  const initialSport = searchParams.get('sport_type') || '';

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState(initialSport);
  const [triggerFetch, setTriggerFetch] = useState(0);

  // Sync state if URL query param changes
  useEffect(() => {
    const urlSport = searchParams.get('sport_type') || '';
    setSelectedSport(urlSport);
  }, [searchParams]);

  // Fetch facilities based on search and filters
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let endpoint = '/facilities';
        const params = [];

        if (searchTerm.trim()) {
          params.push(`search=${encodeURIComponent(searchTerm.trim())}`);
        }
        if (selectedSport) {
          params.push(`sport_type=${encodeURIComponent(selectedSport)}`);
        }

        if (params.length > 0) {
          endpoint += `?${params.join('&')}`;
        }

        const data = await api.get(endpoint);
        if (data.success && data.facilities) {
          setFacilities(data.facilities);
        }
      } catch (error) {
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedSport, triggerFetch]);

  // Handle Search Form Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setTriggerFetch(prev => prev + 1);
  };

  // Toggle/Select Sport Type
  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
    // Sync to URL query param
    if (sport) {
      router.push(`/facilities?sport_type=${sport}`, { scroll: false });
    } else {
      router.push('/facilities', { scroll: false });
    }
  };

  // Clear all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSport('');
    router.push('/facilities', { scroll: false });
    setTriggerFetch(prev => prev + 1);
  };

  return (
    <div className="flex-grow bg-slate-50 dark:bg-slate-950 transition-colors duration-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="text-center space-y-2">
          <span className="text-primary-500 font-extrabold text-sm uppercase tracking-wider">Explore Arenas</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">Sports Facilities</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Search, filter, and instantly reserve premium sports fields and courts around you.
          </p>
        </div>

        {/* Filters Controls Panel */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-6">
          
          {/* Search form and Reset button */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by facility name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all font-medium text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-2xl shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 active:scale-95 transition-all text-sm flex items-center justify-center"
            >
              Search
            </button>
            {(searchTerm || selectedSport) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 px-5 py-3 rounded-2xl transition-all text-sm font-semibold flex items-center justify-center"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear Filters
              </button>
            )}
          </form>

          {/* Horizontal Sport Type Filter Badges */}
          <div className="space-y-3">
            <div className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <SlidersHorizontal className="h-3.5 w-3.5 mr-2 text-slate-400" />
              <span>Filter by Sport Category</span>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {availableSports.map((sport) => {
                const isSelected = selectedSport === sport.value;
                return (
                  <button
                    key={sport.label}
                    onClick={() => handleSportSelect(sport.value)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-primary-500 border-primary-500 text-white shadow-md shadow-primary-500/15'
                        : 'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-650 dark:text-slate-300 border-slate-200 dark:border-slate-800/80'
                    }`}
                  >
                    {sport.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Facility Grid Display */}
        {loading ? (
          <div className="py-24 flex justify-center">
            <Spinner size="large" />
          </div>
        ) : facilities.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 max-w-xl mx-auto shadow-sm space-y-4">
            <div className="p-4 bg-slate-100 dark:bg-slate-955 text-slate-400 dark:text-slate-500 rounded-full w-fit mx-auto">
              <EyeOff className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No facilities found</h3>
            <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              No matching sports fields match your criteria "{searchTerm || selectedSport}". Try adjusting your spelling or filters!
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <FacilityCard key={facility._id} facility={facility} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
