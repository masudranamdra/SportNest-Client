'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Lock, Link as LinkIcon, ArrowRight, Dribbble } from 'lucide-react';
import Spinner from '@/components/Spinner';

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser, isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Watch password to validate rules cleanly on-the-fly
  const passwordValue = watch('password', '');

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const res = await registerUser(data.name, data.email, data.photoURL, data.password);
      if (res.success) {
        // Redirect to Login on success
        router.push('/login');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center py-16 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl p-8 space-y-6">
        
        {/* Branding header */}
        <div className="text-center space-y-2.5">
          <Link href="/" className="inline-flex items-center space-x-2 text-primary-500 font-extrabold text-2xl">
            <div className="p-1.5 bg-primary-500 text-white rounded-xl shadow-md">
              <Dribbble className="h-6 w-6" />
            </div>
            <span className="bg-gradient-to-r from-primary-600 to-emerald-500 dark:from-primary-400 dark:to-emerald-400 bg-clip-text text-transparent">
              SportNest
            </span>
          </Link>
          <h2 className="text-xl font-extrabold text-slate-850 dark:text-white">Create Player Profile</h2>
          <p className="text-xs text-slate-450 dark:text-slate-400">
            Sign up to unlock facilities, add fields, and coordinate matches.
          </p>
        </div>

        {/* Register form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Full Name input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="John Doe"
                {...register('name', { required: 'Full name is required' })}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all font-medium text-sm"
              />
            </div>
            {errors.name && (
              <span className="text-xs text-red-500 font-bold block mt-0.5">{errors.name.message}</span>
            )}
          </div>

          {/* Email address input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="email"
                placeholder="you@example.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all font-medium text-sm"
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-500 font-bold block mt-0.5">{errors.email.message}</span>
            )}
          </div>

          {/* Photo URL input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Profile Photo URL <span className="text-[10px] text-slate-400 lowercase">(Optional)</span>
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                {...register('photoURL')}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all font-medium text-sm"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                  validate: {
                    hasUppercase: (v) => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
                    hasLowercase: (v) => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
                  }
                })}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all font-medium text-sm"
              />
            </div>
            {errors.password && (
              <span className="text-xs text-red-500 font-bold block mt-0.5">{errors.password.message}</span>
            )}
          </div>

          {/* Real-time Password Rules indicators */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl space-y-1.5 border border-slate-200/50 dark:border-slate-800/60">
            <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Password Requirements</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center space-x-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${passwordValue.length >= 6 ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <span className={`text-[10px] font-semibold ${passwordValue.length >= 6 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>6+ Chars</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${/[A-Z]/.test(passwordValue) ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <span className={`text-[10px] font-semibold ${/[A-Z]/.test(passwordValue) ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>1 Uppercase</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${/[a-z]/.test(passwordValue) ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <span className={`text-[10px] font-semibold ${/[a-z]/.test(passwordValue) ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>1 Lowercase</span>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/60 text-white font-extrabold py-3.5 rounded-2xl shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 active:scale-95 transition-all text-sm flex items-center justify-center pt-2"
          >
            {submitting ? (
              <Spinner size="small" />
            ) : (
              <>
                Register Account
                <ArrowRight className="ml-2 h-4.5 w-4.5" />
              </>
            )}
          </button>
        </form>

        {/* Link back to Login */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Already have a player account?{' '}
          <Link href="/login" className="text-primary-500 hover:underline font-semibold">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}
