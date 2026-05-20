'use client';

import React from 'react';
import Spinner from '@/components/Spinner';

export default function Loading() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center py-24 bg-slate-55 dark:bg-[#070b19] min-h-[70vh]">
      <Spinner size="large" />
      <h2 className="mt-6 text-lg font-bold text-slate-800 dark:text-white">Loading SportNest...</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Fetching sports arenas and slot grids.</p>
    </div>
  );
}
