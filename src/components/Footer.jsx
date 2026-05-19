'use client';

import React from 'react';
import Link from 'next/link';
import { Dribbble, Mail, Phone, MapPin, Facebook, Instagram, Github, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1 - Brand & Desc */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-primary-500 font-extrabold text-xl">
              <div className="p-1 bg-primary-500 text-white rounded-lg shadow-sm">
                <Dribbble className="h-5 w-5" />
              </div>
              <span className="bg-gradient-to-r from-primary-600 to-emerald-500 dark:from-primary-400 dark:to-emerald-400 bg-clip-text text-transparent">
                SportNest
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              SportNest is the ultimate sports facility booking platform. Discover fields, reserve slots, and schedule playtimes with your crew in seconds.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/masudranamdra1/" className="text-slate-400 hover:text-primary-500 transition-all" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/masudranamdra/" className="text-slate-400 hover:text-primary-500 transition-all" aria-label="Linkedin">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/masudranamdra" className="text-slate-400 hover:text-primary-500 transition-all" aria-label="Github">
                <Github className="h-5 w-5" />
              </a>
              {/* Premium X Logo (replacing bird) */}
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-all" aria-label="X (formerly Twitter)">
                <svg className="h-4 w-4 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-all">
                  All Facilities
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-all">
                  Login & Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Popular Sports */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Sports Fields</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/facilities?sport_type=football" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-all">
                  Football Arenas
                </Link>
              </li>
              <li>
                <Link href="/facilities?sport_type=cricket" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-all">
                  Cricket Lanes
                </Link>
              </li>
              <li>
                <Link href="/facilities?sport_type=badminton" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-all">
                  Badminton Courts
                </Link>
              </li>
              <li>
                <Link href="/facilities?sport_type=basketball" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-all">
                  Basketball Courts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Contact Us</h3>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center space-x-3">
                <MapPin className="h-4.5 w-4.5 text-primary-500 flex-shrink-0" />
                <span>Chirirbandar, Dinajpur-5200, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4.5 w-4.5 text-primary-500 flex-shrink-0" />
                <span>+880 18770-80660</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4.5 w-4.5 text-primary-500 flex-shrink-0" />
                <span>masud.dev01@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-900 text-center text-xs text-slate-450 dark:text-slate-500">
          <p>© {currentYear} SportNest Booking Systems. Built for high performance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
