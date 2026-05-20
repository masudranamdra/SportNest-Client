'use client';

import React from 'react';
import Link from 'next/link';
import { Dribbble, Mail, Phone, MapPin, Facebook, Instagram, Github, Youtube, Linkedin, X } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white dark:bg-[#070b19] border-t border-slate-200 dark:border-slate-850/80 transition-colors duration-200 overflow-hidden">
      {/* Background soft glow blobs (Only in dark mode for premium feel) */}
      <div className="hidden dark:block absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="hidden dark:block absolute bottom-12 right-0 w-[200px] h-[200px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Column 1 - Brand & Desc */}
          <div className="md:col-span-1 space-y-5">
            <Link href="/" className="flex items-center space-x-2 font-extrabold text-xl group">
              <div className="p-2 bg-gradient-to-tr from-blue-600 to-sky-500 text-white rounded-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <img className="h-7 w-7" src="https://i.ibb.co.com/fzF0nrZ7/logo1.png" alt="" />
              </div>
              <span className="text-slate-900 dark:text-white font-bold">
                Sport<span className="text-blue-600 dark:text-sky-405">Nest</span>
              </span>
            </Link>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              SportNest is the ultimate sports facility booking platform. Discover premium fields, reserve slots, and schedule playtimes with your crew in seconds.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              <a 
                href="https://www.facebook.com/masudranamdra1/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/40 text-slate-500 dark:text-slate-450 hover:text-blue-600 dark:hover:text-sky-400 hover:border-blue-500/25 dark:hover:border-sky-500/20 transition-all duration-300" 
                aria-label="Facebook"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/masudranamdra/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/40 text-slate-500 dark:text-slate-450 hover:text-blue-600 dark:hover:text-sky-400 hover:border-blue-500/25 dark:hover:border-sky-500/20 transition-all duration-300" 
                aria-label="Linkedin"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://github.com/masudranamdra" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/40 text-slate-500 dark:text-slate-450 hover:text-blue-600 dark:hover:text-sky-400 hover:border-blue-500/25 dark:hover:border-sky-500/20 transition-all duration-300" 
                aria-label="Github"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://www.youtube.com/@Masudranamdra" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/40 text-slate-500 dark:text-slate-450 hover:text-blue-600 dark:hover:text-sky-400 hover:border-blue-500/25 dark:hover:border-sky-500/20 transition-all duration-300" 
                aria-label="X (formerly Twitter)"
              >
                <Youtube className="h-4.5 w-4.5" />
                
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300">Quick Links</h3>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  All Facilities
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  Login & Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Popular Sports */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300">Sports Fields</h3>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/facilities?sport_type=football" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  Football Arenas
                </Link>
              </li>
              <li>
                <Link href="/facilities?sport_type=cricket" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  Cricket Lanes
                </Link>
              </li>
              <li>
                <Link href="/facilities?sport_type=badminton" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  Badminton Courts
                </Link>
              </li>
              <li>
                <Link href="/facilities?sport_type=basketball" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  Basketball Courts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300">Contact Us</h3>
            <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-400 font-semibold">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4.5 w-4.5 text-blue-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Chirirbandar, Dinajpur-5200, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4.5 w-4.5 text-blue-600 dark:text-sky-400 flex-shrink-0" />
                <span>+880 18770-80660</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4.5 w-4.5 text-blue-600 dark:text-sky-400 flex-shrink-0" />
                <span className="truncate">masud.dev01@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-900 text-xs text-slate-500 dark:text-slate-500 font-semibold">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {currentYear} SportNest Booking Systems. Built for high performance. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/terms" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <span className="text-slate-300 dark:text-slate-800">|</span>
              <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
