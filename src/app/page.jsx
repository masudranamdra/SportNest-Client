'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';
import FacilityCard from '@/components/FacilityCard';
import Spinner from '@/components/Spinner';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  BadgePercent, 
  ArrowRight,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';

const sportCategories = [
  { name: 'Football', icon: '⚽', desc: 'Turf Arenas', type: 'football', bg: 'from-emerald-500/10 to-teal-500/10' },
  { name: 'Cricket', icon: '🏏', desc: 'Net Lanes', type: 'cricket', bg: 'from-blue-500/10 to-cyan-500/10' },
  { name: 'Badminton', icon: '🏸', desc: 'Indoor Courts', type: 'badminton', bg: 'from-yellow-500/10 to-amber-500/10' },
  { name: 'Tennis', icon: '🎾', desc: 'Clay & Clay courts', type: 'tennis', bg: 'from-lime-500/10 to-green-500/10' },
  { name: 'Basketball', icon: '🏀', desc: 'Hardwood Courts', type: 'basketball', bg: 'from-orange-500/10 to-red-500/10' },
  { name: 'Swimming', icon: '🏊', desc: 'Olympic Pools', type: 'swimming', bg: 'from-cyan-500/10 to-blue-500/10' },
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch facilities for the featured grid (take first 6)
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await api.get('/facilities');
        if (data.success && data.facilities) {
          // Pull first 6 facilities
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

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[url('https://i.ibb.co.com/fVBF30bW/Chat-GPT-Image-May-19-2026-07-59-36-AM.png')] bg-cover bg-center h-[750px] text-white py-24 sm:py-32 transition-colors duration-200">
        {/* Abstract design elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-950/40 via-slate-900 to-slate-950 opacity-90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/10 blur-[120px] rounded-full" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 px-4 py-1.5 rounded-full text-primary-400 font-bold text-xs uppercase tracking-wider">
            <TrendingUp className="h-4 w-4" />
            <span>Fastest Booking System In Dinajpur, Bangladesh</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-none bg-gradient-to-r from-white via-slate-100 to-primary-400 bg-clip-text text-transparent">
            Book Premium Sports Facilities Instantly
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            SportNest connects you to football turfs, cricket nets, swimming pools, and tennis courts in Dinajpur, Bangladesh. Real-time availability, secure booking, zero hassle.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              href="/facilities"
              className="w-full sm:w-auto bg-primary-600 hover:bg-green-700/70  text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg hover:shadow-primary-500/35 transition-all duration-200 active:scale-95 flex items-center justify-center group"
            >
              Explore Arenas
              <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto border border-slate-500 hover:bg-sky-500 text-slate-250 font-bold px-8 py-4 rounded-2xl transition-all"
            >
              Create Account
            </Link>
          </div>

          {/* Quick Stats banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:pt-8 sm:px-8 max-w-4xl mx-auto">
            <div>
              <span className="text-3xl font-extrabold text-white block">15+</span>
              <span className="text-xs text-slate-300 uppercase tracking-wider font-bold">Sports Arenas</span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-white block">50+</span>
              <span className="text-xs text-slate-300 uppercase tracking-wider font-bold">Active Bookings</span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-white block">99.8%</span>
              <span className="text-xs text-slate-300 uppercase tracking-wider font-bold">Uptime Security</span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-white block">4.9 ★</span>
              <span className="text-xs text-slate-300 uppercase tracking-wider font-bold">Player Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR SPORTS CATEGORIES */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-primary-500 font-extrabold text-sm uppercase tracking-wider">Categories</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Popular Sports</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm font-medium">
              Filter and explore facilities based on your favorite athletic matches.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {sportCategories.map((sport) => (
              <Link
                key={sport.name}
                href={`/facilities?sport_type=${sport.type}`}
                className={`group flex flex-col items-center text-center p-6 bg-gradient-to-b ${sport.bg} border border-slate-200/50 dark:border-slate-800/40 rounded-3xl hover:border-primary-500/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
              >
                <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {sport.icon}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {sport.name}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {sport.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED FACILITIES */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div className="space-y-3">
              <span className="text-primary-500 font-extrabold text-sm uppercase tracking-wider">Top Rated</span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Featured Sports Arenas</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-md text-sm font-medium">
                Reserve your spot at the most popular turfs and sports locations in Dinajpur, Bangladesh.
              </p>
            </div>
            <Link
              href="/facilities"
              className="group text-primary-500 hover:text-primary-600 font-bold text-sm flex items-center transition-all"
            >
              View All Facilities {featured.length}+
              <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="py-16 flex justify-center">
              <Spinner size="large" />
            </div>
          ) : featured.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-8 bg-slate-50 dark:bg-slate-950/20">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">No facilities listed yet</h3>
              <p className="text-sm text-slate-550 dark:text-slate-400 mt-1">Be the first to list a turf facility!</p>
              <Link
                href="/facilities/add"
                className="mt-4 inline-flex bg-primary-500 hover:bg-primary-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm"
              >
                Add Facility
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((facility) => (
                <FacilityCard key={facility._id} facility={facility} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-primary-500 font-extrabold text-sm uppercase tracking-wider">Benefits</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Why Book with SportNest?</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm font-medium">
              We streamline booking mechanics so you can focus entirely on playing the game.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-4 hover:border-primary-500/30 transition-all">
              <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl w-fit">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Secure Booking</h3>
              <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed">
                Guaranteed time slots and authenticated host validations mean zero double-booking conflicts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-4 hover:border-primary-500/30 transition-all">
              <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl w-fit">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Trusted Facilities</h3>
              <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed">
                Hand-picked high-quality grass turfs, indoor arenas, and properly chlorinated pools.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-4 hover:border-primary-500/30 transition-all">
              <div className="p-3 bg-yellow-500/10 text-yellow-600 dark:text-yellow-450 rounded-2xl w-fit">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Easy Scheduling</h3>
              <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed">
                Select your preferred dates and hours with a live grid and finalize slot checkouts in clicks.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm space-y-4 hover:border-primary-500/30 transition-all">
              <div className="p-3 bg-red-500/10 text-red-650 dark:text-red-400 rounded-2xl w-fit">
                <BadgePercent className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Affordable Pricing</h3>
              <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed">
                No hidden processing surcharges. Direct facility pricing with exclusive team slots discounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="bg-gradient-to-r from-black to-black dark:from-sky-950 dark:to-emerald-950 py-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Dominate the Pitch?
          </h2>
          <p className="text-base sm:text-lg text-emerald-100 dark:text-emerald-300/80 max-w-xl mx-auto leading-relaxed">
            Create an account in seconds, browse sports fields dynamically, and reserve your match slots immediately.
          </p>
          <div className="pt-4">
            <Link
              href="/facilities"
              className="inline-flex bg-white dark:bg-white hover:bg-slate-50 dark:hover:bg-white text-primary-655 dark:text-primary-700 font-bold px-8 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Book A Field Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
