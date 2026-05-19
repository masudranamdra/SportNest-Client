'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, DollarSign, Users, Award } from 'lucide-react';

const FacilityCard = ({ facility }) => {
  const { _id, name, facility_type, image, location, price_per_hour, capacity } = facility;

  // Render a clean category label badge
  const sportColors = {
    football: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    basketball: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    cricket: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    badminton: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
    tennis: 'bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/20',
    swimming: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  };

  const badgeClass = sportColors[facility_type.toLowerCase()] || 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';

  return (
    <div className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary-500/40 transition-all duration-300 transform hover:-translate-y-1">
      
      {/* Aspect Ratio Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=600';
          }}
        />
        {/* Sport Type badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${badgeClass} backdrop-blur-md`}>
            {facility_type}
          </span>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-700 dark:text-white group-hover:text-primary-500 transition-colors truncate">
          {name}
        </h3>

        {/* Location Row */}
        <div className="flex items-center text-slate-500 dark:text-slate-400 mt-2.5 text-sm">
          <MapPin className="h-4 w-4 mr-1.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {/* Dynamic capacities */}
        <div className="flex items-center text-slate-500 dark:text-slate-400 mt-2 text-sm">
          <Users className="h-4 w-4 mr-1.5 text-slate-400 flex-shrink-0" />
          <span>Capacity: {capacity} Players</span>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-slate-800/60 my-4" />

        {/* Price & Action Row */}
        <div className="flex justify-between items-center mt-auto">
          <div>
            <span className="text-xs text-slate-400 dark:text-slate-500 block uppercase font-bold tracking-wider">Hourly Rate</span>
            <span className="text-xl font-bold text-gray-700 dark:text-white flex items-center">
              <span className="text-md font-bold text-primary-500 mr-0.5">$</span>
              {price_per_hour}
              <span className="text-xs font-normal text-slate-400 dark:text-slate-500 ml-1">/hr</span>
            </span>
          </div>

          <Link
            href={`/facilities/${_id}`}
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-4 py-2.5 rounded-md text-sm shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 active:scale-95 transition-all duration-200"
          >
            Book Now
          </Link>
        </div>

      </div>

    </div>
  );
};

export default FacilityCard;
