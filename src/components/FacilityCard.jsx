'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Users, Zap } from 'lucide-react';

const FacilityCard = ({ facility }) => {
  const { _id, name, facility_type, image, location, price_per_hour, capacity } = facility;

  const sportColors = {
    football: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    basketball: 'bg-orange-500/10 text-orange-655 dark:text-orange-400 border-orange-500/20',
    cricket: 'bg-emerald-500/10 text-emerald-650 dark:text-emerald-450 border-emerald-500/20',
    badminton: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    tennis: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    swimming: 'bg-sky-500/10 text-sky-655 dark:text-sky-400 border-sky-500/20',
  };

  const badgeClass = sportColors[facility_type.toLowerCase()] || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 border-slate-200 dark:border-slate-700/50';

  return (
    <motion.div 
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-blue-500/5 hover:border-blue-500/25 dark:hover:border-blue-500/25 transition-all duration-300"
    >
      
      {/* Aspect Ratio Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=600';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        {/* Sport Type badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xl border ${badgeClass} backdrop-blur-md`}>
            {facility_type}
          </span>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300 truncate">
            {name}
          </h3>

          {/* Location Row */}
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <MapPin className="h-4 w-4 mr-2 text-slate-400 dark:text-slate-500 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Details Specs Container - Only Hover showing this data */}
        <div className="transition-all duration-300 ease-in-out overflow-hidden max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100">
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-950 rounded-2xl">
            <div className="space-y-0.5">
              <span className="text-[9px] text-slate-500 dark:text-slate-500 uppercase font-bold tracking-wider block">Capacity</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-350 flex items-center">
                <Users className="h-3.5 w-3.5 mr-1.5 text-slate-400 dark:text-slate-500" />
                {capacity} Players
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] text-slate-500 dark:text-slate-500 uppercase font-bold tracking-wider block">Security</span>
              <span className="text-xs font-semibold text-emerald-650 dark:text-emerald-400 flex items-center">
                <Zap className="h-3.5 w-3.5 mr-1.5 text-emerald-500 dark:text-emerald-500/80 animate-pulse" />
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-slate-800/50 my-1" />

        {/* Price & Action Row */}
        <div className="flex justify-between items-center mt-auto pt-1">
          <div>
            <span className="text-[9px] text-slate-500 dark:text-slate-500 block uppercase font-bold tracking-wider">Hourly Rate</span>
            <span className="text-lg font-extrabold text-slate-850 dark:text-slate-100 flex items-center leading-none mt-0.5">
              <span className="text-xs font-bold text-blue-600 dark:text-sky-400 mr-0.5">$</span>
              {price_per_hour}
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-500 ml-1">/hr</span>
            </span>
          </div>

          <Link
            href={`/facilities/${_id}`}
            className="bg-blue-600 hover:bg-blue-755 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            Book Now
          </Link>
        </div>

      </div>

    </motion.div>
  );
};

export default FacilityCard;
