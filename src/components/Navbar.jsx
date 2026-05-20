'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User as UserIcon, 
  LogOut, 
  PlusCircle, 
  Calendar, 
  Sliders, 
  Dribbble 
} from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.success) {
      setDropdownOpen(false);
      setMobileMenuOpen(false);
      router.push('/');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Facilities', path: '/facilities' },
  ];

  const privateLinks = [
    { name: 'My Bookings', path: '/bookings', icon: Calendar },
    { name: 'Add Facility', path: '/facilities/add', icon: PlusCircle },
    { name: 'Manage My Facilities', path: '/facilities/manage', icon: Sliders },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-200 glass border-b border-slate-200/50 dark:border-slate-800/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* 1. Left Section - Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-primary-500 font-extrabold text-xl tracking-tight">
              <div className="p-1.5 bg-primary-500 text-white rounded-xl shadow-md shadow-primary-500/20">
                <Dribbble className="h-6 w-6 animate-pulse" />
              </div>
              <span className="bg-gradient-to-r from-primary-600 to-emerald-500 dark:from-primary-400 dark:to-emerald-400 bg-clip-text text-transparent">
                <span className="text-black">Sport</span>Nest
              </span>
            </Link>
          </div>

          {/* 2. Center Section - Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-350 dark:hover:text-white dark:hover:bg-slate-800/40'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Private Navigation Links (Inline Desktop) */}
            {isAuthenticated && privateLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-350 dark:hover:text-white dark:hover:bg-slate-800/40'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 3. Right Section - Theme, Auth Dropdown (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggler */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                {/* Logged in Avatar trigger */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-1.5 focus:outline-none p-1 rounded-full border border-slate-200 dark:border-slate-800 hover:border-primary-500/55 transition-all"
                >
                  <img
                    src={user?.photoURL}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full object-cover shadow-sm bg-slate-100"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';
                    }}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/65 shadow-2xl py-2 z-20 animate-fade-in">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/70">
                        <p className="text-sm font-semibold truncate text-slate-800 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                      </div>
                      
                      <div className="py-1">
                        {privateLinks.map((link) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.path}
                              href={link.path}
                              onClick={() => setDropdownOpen(false)}
                              className={`flex items-center px-4 py-2 text-sm transition-all ${
                                isActive(link.path)
                                  ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium'
                                  : 'text-slate-650 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
                              }`}
                            >
                              <Icon className="h-4 w-4 mr-2.5" />
                              {link.name}
                            </Link>
                          );
                        })}
                      </div>

                      <div className="border-t border-slate-100 dark:border-slate-850 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-650 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all font-medium"
                        >
                          <LogOut className="h-4 w-4 mr-2.5" />
                          Log out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 active:scale-95 transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* 4. Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md animate-fade-in shadow-lg">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <div className="border-t border-slate-200/50 dark:border-slate-800 my-2 pt-2" />
                <div className="px-4 py-2 mb-2 flex items-center space-x-3">
                  <img
                    src={user?.photoURL}
                    alt={user?.name}
                    className="h-10 w-10 rounded-full object-cover bg-slate-100"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-850 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                  </div>
                </div>
                
                {privateLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-2.5 rounded-xl text-base font-semibold transition-all ${
                        isActive(link.path)
                          ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                          : 'text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3 text-slate-400" />
                      {link.name}
                    </Link>
                  );
                })}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2.5 rounded-xl text-base font-semibold text-red-650 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all"
                >
                  <LogOut className="h-5 w-5 mr-3 text-red-500/80" />
                  Log out
                </button>
              </>
            ) : (
              <div className="pt-4 px-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-primary-500 text-white text-center py-2.5 rounded-xl font-bold shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 transition-all"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
