'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';
import FacilityCard from '@/components/FacilityCard';
import Spinner from '@/components/Spinner';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Clock,
  MapPin,
  BadgePercent,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Award,
  Users,
  Compass,
  Zap,
  Activity
} from 'lucide-react';

const sportCategories = [
  { name: 'Football', icon: '⚽', desc: 'Turf Arenas', type: 'football', bg: 'from-blue-500/10 to-blue-600/10', textClass: 'text-blue-600 dark:text-blue-400' },
  { name: 'Cricket', icon: '🏏', desc: 'Net Lanes', type: 'cricket', bg: 'from-emerald-500/10 to-green-600/10', textClass: 'text-emerald-650 dark:text-emerald-450' },
  { name: 'Badminton', icon: '🏸', desc: 'Indoor Courts', type: 'badminton', bg: 'from-orange-500/10 to-amber-500/10', textClass: 'text-orange-655 dark:text-orange-400' },
  { name: 'Tennis', icon: '🎾', desc: 'Clay Courts', type: 'tennis', bg: 'from-green-500/10 to-emerald-600/10', textClass: 'text-green-650 dark:text-green-400' },
  { name: 'Basketball', icon: '🏀', desc: 'Hardwood Courts', type: 'basketball', bg: 'from-orange-600/10 to-red-500/10', textClass: 'text-orange-600 dark:text-orange-400' },
  { name: 'Swimming', icon: '🏊', desc: 'Olympic Pools', type: 'swimming', bg: 'from-sky-500/10 to-blue-500/10', textClass: 'text-sky-600 dark:text-sky-400' },
];

const sportsData = [
  {
    id: 1,
    name: "Football",
    type: "football",
    icon: "⚽",
    image: "https://i.ibb.co.com/r1pSKLh/atelierbyvineeth-p-Q2j-Av7-Bi8k.jpg",
    playgrounds: "05+",
    open: "06:00 AM",
    close: "11:00 PM",
    update: "20/05/2026",
    description: "Professional turf facilities matching international playing standards. Outfitted with heavy-duty lighting structures for night games and modern player rest areas.",
    security: "24/7 CCTV Surveillance & Biometric Gate Locks",
    medical: "On-site emergency first-aid kit and physical therapist support",
    facilities: "Locker rooms, washrooms, high-pressure showers & safe parking"
  },
  {
    id: 2,
    name: "Cricket",
    type: "cricket",
    icon: "🏏",
    image: "https://i.ibb.co.com/x8BVTzqv/cfphotosin-photography-4hbgc-Qv9-As-unsplash.jpg",
    playgrounds: "03+",
    open: "07:00 AM",
    close: "10:00 PM",
    update: "19/05/2026",
    description: "Multi-lane cricket practice nets with high-rebound turf wickets. Perfect for both amateur spin bowlers and professional pace practices.",
    security: "Restricted entry control, visitor registers & local guards",
    medical: "Ice packs, joint splints, and emergency stretchers available",
    facilities: "Gear rentals, shaded batting cages & cold drinking water"
  },
  {
    id: 3,
    name: "Badminton",
    type: "badminton",
    icon: "🏸",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800",
    playgrounds: "08+",
    open: "08:00 AM",
    close: "11:00 PM",
    update: "18/05/2026",
    description: "Premium indoor courts with high-quality shock-absorbing wooden subfloors to reduce knee impact. Equipped with tournament-grade nets.",
    security: "Smart card access control and digital locker monitoring",
    medical: "Stretches guide charts, knee straps & ice sprays",
    facilities: "Racket stringing, changing lockers, and refreshments cafe"
  },
  {
    id: 4,
    name: "Tennis",
    type: "tennis",
    icon: "🎾",
    image: "https://i.ibb.co.com/ZRHBr8Bm/valentin-balan-k0a-VMMZwqt-U-unsplash.jpg",
    playgrounds: "04+",
    open: "06:00 AM",
    close: "09:00 PM",
    update: "17/05/2026",
    description: "Clay and hard-court layouts with professional drainage systems. Ideal for matches in all weather conditions.",
    security: "CCTV perimeter cameras and verified host verification gates",
    medical: "First aid kits, hydration packets, and muscle rollers",
    facilities: "Ball machine rentals, spectator seating, and rest gazebos"
  },
  {
    id: 5,
    name: "Basketball",
    type: "basketball",
    icon: "🏀",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
    playgrounds: "02+",
    open: "06:00 AM",
    close: "10:00 PM",
    update: "15/05/2026",
    description: "Full-sized hardwood indoor basketball courts featuring height-adjustable glass backboards and professional floor grip coaching lines.",
    security: "Digital RFID locker rooms and 24/7 security watch",
    medical: "Sprain braces, medical cold pads, and trained personnel",
    facilities: "Team seating benches, drinking fountains, and ball racks"
  },
  {
    id: 6,
    name: "Swimming",
    type: "swimming",
    icon: "🏊",
    image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800",
    playgrounds: "02+",
    open: "07:00 AM",
    close: "09:00 PM",
    update: "20/05/2026",
    description: "Olympic-sized chlorinated swimming pools featuring automated temperature control. Outfitted with safety starting blocks and lanes.",
    security: "Biometric entry validation and certified lifeguard monitoring",
    medical: "Oxygen tanks, rescue tubes, and advanced first aid station",
    facilities: "Hot water showers, steam rooms, and hair drying stations"
  }
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSportType, setSelectedSportType] = useState('football');

  const activeSport = sportsData.find(s => s.type === selectedSportType) || sportsData[0];

  // Fetch facilities for the featured grid (take first 6)
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await api.get('/facilities');
        if (data.success && data.facilities) {
          setFeatured(data.facilities.slice(0, 6));
        }
      } catch (error) {
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 15 } }
  };

  return (
    <div className="flex-grow bg-slate-50 dark:bg-[#070b19] transition-colors duration-250">

      {/* 1. HERO SEARCH SECTION */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 md:h-[750px] bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://i.ibb.co.com/wHhPLV0/cover.jpg')" }}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>


        {/* Glow ambient background meshes */}


        <div className="hidden dark:block absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="hidden dark:block absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />



        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-600 dark:text-sky-400 px-4 py-1.5 rounded-full border border-blue-500/20 text-xs font-bold uppercase tracking-wider shadow-inner"
              >
                <Zap className="h-3.5 w-3.5 animate-pulse" />
                <span>Smart Booking Mechanics</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-100 dark:text-white tracking-tight leading-[1.1]"
              >
                Book Premium Sports Fields <br />
                <span className="text-gradient-premium">Without Friction.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-sm sm:text-base text-slate-400 dark:text-slate-400 max-w-xl font-semibold leading-relaxed"
              >
                SportNest coordinates real-time slots for football turfs, cricket nets, swimming pools, and indoor courts. Seamless payments. Verified hosts. Zero double-bookings.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="pt-2 flex flex-wrap gap-4"
              >
                <Link
                  href="/facilities"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-md hover:shadow-lg hover:shadow-blue-500/10 hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center"
                >
                  Find Sports Fields
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/facilities/add"
                  className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 font-extrabold px-8 py-4 rounded-2xl transition-all text-xs uppercase tracking-widest flex items-center active:scale-95 shadow-sm"
                >
                  List Your Field
                </Link>
              </motion.div>

            </div>

            {/* Right Interactive Image Column */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="relative mx-auto max-w-md lg:max-w-none group mt-8 lg:mt-0"
              >
                {/* Outer gradient mesh border */}
                <div className="absolute -inset-1.5 rounded-[32px] opacity-30 group-hover:opacity-60 blur-md transition duration-500 pointer-events-none" />

                <div className="relative rounded-[28px] ">
                  <img
                    className="item-center mx-auto w-full h-full object-cover rounded-[24px] group-hover:scale-[1.02] transition-transform duration-700"
                    src="https://i.ibb.co.com/k2wbPv9n/pngaaa-com-3103895.png"
                    alt="Premium turf fields"
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-[24px]" />
                </div>

                {/* Floating glass indicators to wow the user */}
                <div className="absolute -bottom-5 -left-5 bg-white/80 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xl flex items-center space-x-3 group-hover:scale-105 transition-transform duration-300">
                  <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">Safety standard</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">100% Slot Verified</span>
                  </div>
                </div>

                <div className="absolute -top-5 -right-5 bg-white/80 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl shadow-xl flex items-center space-x-3 group-hover:scale-105 transition-transform duration-300">
                  <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">Instant Book</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">No Wait Confirm</span>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SPORTS CATEGORIES EXPLORER & DYNAMIC PANEL */}
      <section className="py-24 bg-slate-100/50 dark:bg-[#0b1329] border-y border-slate-200 dark:border-slate-850/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-blue-600 dark:text-sky-400 font-extrabold text-xs uppercase tracking-widest block">Explorer</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-black tracking-tight">Sports Categories Explorer</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-xs sm:text-sm font-semibold">
              Select a sport category to dynamically load real-time field information and specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT SIDE: Category Buttons */}
            <div className="col-span-12 lg:col-span-3 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory">
              {sportsData.map((sport) => {
                const isActive = selectedSportType === sport.type;
                return (
                  <button
                    key={sport.id}
                    onClick={() => setSelectedSportType(sport.type)}
                    className={`snap-center shrink-0 flex items-center justify-between px-5 py-4 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 w-[200px] lg:w-full text-left ${
                      isActive 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-500/10 hover:bg-blue-700' 
                        : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-350 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{sport.icon}</span>
                      <span>{sport.name}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isActive ? 'translate-x-1' : 'opacity-40'}`} />
                  </button>
                );
              })}
            </div>

            {/* CENTER: Visual Showcase */}
            <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl relative overflow-hidden min-h-[350px]">
              {/* Animated Inner Container for seamless switching */}
              <motion.div
                key={activeSport.type}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center text-center space-y-6 z-10"
              >
                {/* Large circular gradient glow */}
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 via-sky-400 to-emerald-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition duration-500 pointer-events-none" />
                  <div className="relative w-48 h-48 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-blue-600 to-sky-400 dark:from-sky-400 dark:to-blue-600 shadow-xl">
                    <img 
                      src={activeSport.image} 
                      alt={activeSport.name} 
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-3xl">{activeSport.icon}</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {activeSport.name} Arena
                  </h3>
                  <div className="inline-flex items-center space-x-1.5 bg-blue-500/10 text-blue-600 dark:text-sky-400 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                    <span>Real-time Panel</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE: Info Card */}
            <div className="col-span-12 lg:col-span-4 flex flex-col justify-between p-7 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl relative overflow-hidden">
              <motion.div
                key={activeSport.type}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 h-full flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-extrabold text-blue-600 dark:text-sky-400 uppercase tracking-widest mb-4">
                    Playground Info
                  </h4>
                  
                  <div className="space-y-4">
                    
                    <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-150/60 dark:border-slate-800/40">
                      <div className="p-2 bg-blue-500/10 text-blue-600 dark:text-sky-400 rounded-xl">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">Available Fields</span>
                        <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{activeSport.playgrounds} Ground Slots</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-150/60 dark:border-slate-800/40">
                      <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">Timing Hours</span>
                        <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{activeSport.open} - {activeSport.close}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-150/60 dark:border-slate-800/40">
                      <div className="p-2 bg-orange-500/10 text-orange-500 dark:text-orange-400 rounded-xl">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">Last Updated</span>
                        <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{activeSport.update}</span>
                      </div>
                    </div>

                  </div>
                </div>

                <Link
                  href={`/facilities?sport_type=${activeSport.type}`}
                  className="mt-6 w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 text-center shadow-md shadow-blue-500/10"
                >
                  <span>Explore {activeSport.name} Fields</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>

              </motion.div>
            </div>

            {/* BOTTOM: Large description/info panel */}
            <div className="col-span-12 p-8 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl relative overflow-hidden">
              <motion.div
                key={activeSport.type}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-blue-600 dark:text-sky-400 uppercase tracking-widest">
                    Facility Overview
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                    {activeSport.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-blue-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Security & Safety</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                      {activeSport.security}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      <Activity className="h-4 w-4" />
                      <span>Medical Support</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                      {activeSport.medical}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-orange-500 dark:text-orange-400 font-bold text-xs uppercase tracking-wider">
                      <Compass className="h-4 w-4" />
                      <span>Amenities & Facilities</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                      {activeSport.facilities}
                    </p>
                  </div>

                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FEATURED FACILITIES */}
      <section className="py-24 bg-white dark:bg-[#070b19] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
            <div className="space-y-3">
              <span className="text-blue-600 dark:text-sky-400 font-extrabold text-xs uppercase tracking-widest block">Top Rated</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Featured Sports Arenas</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-md text-xs sm:text-sm font-semibold">
                Reserve your spot at the most popular turfs and sports locations in Dinajpur, Bangladesh.
              </p>
            </div>
            <Link
              href="/facilities"
              className="group text-blue-600 dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 font-bold text-xs uppercase tracking-wider flex items-center transition-colors"
            >
              View All Facilities {featured.length > 0 ? `(${featured.length})` : ''}
              <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="py-24 flex justify-center">
              <Spinner size="large" />
            </div>
          ) : featured.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 bg-slate-50 dark:bg-slate-900/20 max-w-xl mx-auto">
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No facilities listed yet</h3>
              <p className="text-xs text-slate-500 mt-1 font-semibold">Be the first to list a turf facility!</p>
              <Link
                href="/facilities/add"
                className="mt-6 inline-flex bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-blue-500/10"
              >
                Add Facility
              </Link>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featured.map((facility) => (
                <motion.div key={facility._id} variants={itemVariants}>
                  <FacilityCard facility={facility} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION (BENTO GRID DESIGN) */}
      <section className="py-24 bg-slate-100/50 dark:bg-[#0b1329] border-y border-slate-200 dark:border-slate-850/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-20">
            <span className="text-blue-600 dark:text-sky-400 font-extrabold text-xs uppercase tracking-widest block">Benefits</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Engineered For Performers</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-xs sm:text-sm font-semibold">
              We streamline booking mechanics so you can focus entirely on playing the game.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Bento Box 1 (Secure Bookings - Large) */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850/60 hover:border-blue-500/25 dark:hover:border-blue-500/20 shadow-sm transition-all duration-300 flex flex-col justify-between group overflow-hidden relative min-h-[280px]">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
              <div className="space-y-4 max-w-md">
                <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl w-fit">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">Secure Bookings & Slot Lock</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  Guaranteed time slots and authenticated host validations mean zero double-booking conflicts. Our real-time calendar locks the field for you the millisecond payment is checked out.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest mt-6 group-hover:translate-x-1 transition-transform">
                <span>Play Secure</span>
                <Zap className="h-4 w-4 ml-2 animate-pulse" />
              </div>
            </div>

            {/* Bento Box 2 (Trusted Facilities) */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850/60 hover:border-emerald-500/25 dark:hover:border-emerald-500/20 shadow-sm transition-all duration-300 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-emerald-500/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
              <div className="space-y-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl w-fit">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">Verified Venues</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  Hand-picked high-quality grass turfs, indoor arenas, and properly chlorinated pools around Dhaka & Dinajpur.
                </p>
              </div>
              <div className="pt-6 flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <span>Certified Facilities</span>
              </div>
            </div>

            {/* Bento Box 3 (Easy Scheduling) */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850/60 hover:border-blue-500/25 dark:hover:border-sky-500/20 shadow-sm transition-all duration-300 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-blue-500/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
              <div className="space-y-4">
                <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-sky-400 rounded-2xl w-fit">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">Instant Scheduling</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  Select your preferred dates and hours with a live grid and finalize slot checkouts in single clicks.
                </p>
              </div>
              <div className="pt-6 flex items-center text-[10px] font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider">
                <span>Save Time</span>
              </div>
            </div>

            {/* Bento Box 4 (Affordable Pricing - Large) */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850/60 hover:border-orange-500/25 dark:hover:border-orange-500/20 shadow-sm transition-all duration-300 flex flex-col justify-between group overflow-hidden relative min-h-[250px]">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-orange-500/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-orange-500/10 transition-colors" />
              <div className="space-y-4 max-w-md">
                <div className="p-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-2xl w-fit">
                  <BadgePercent className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">Transparent Fees & Offers</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  No hidden processing surcharges. We charge direct facility rates with special discounts on off-peak hours and recurring team bookings.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mt-6 group-hover:translate-x-1 transition-transform">
                <span>Zero Hidden Costs</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="relative bg-white dark:bg-[#070b19] py-24 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white dark:from-blue-950/20 dark:via-[#070b19] dark:to-[#070b19]" />
        <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 z-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Ready to Dominate the Pitch?
          </h2>
          <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-400 max-w-lg mx-auto leading-relaxed font-semibold">
            Create an account in seconds, browse premium sports fields dynamically, and reserve your match slots immediately.
          </p>
          <div className="pt-4">
            <Link
              href="/facilities"
              className="inline-flex bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all text-xs uppercase tracking-widest"
            >
              Book A Field Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
