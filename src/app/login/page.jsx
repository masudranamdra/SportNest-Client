'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, ArrowRight, Dribbble } from 'lucide-react';
import Spinner from '@/components/Spinner';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { loginUser, googleLoginUser, isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectUrl);
    }
  }, [isAuthenticated, redirectUrl, router]);

  const handleGoogleSignIn = async () => {
    try {
      setGoogleSubmitting(true);
      await googleLoginUser(redirectUrl);
    } finally {
      setGoogleSubmitting(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle Credentials Login
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const res = await loginUser(data.email, data.password);
      if (res.success) {
        router.push(redirectUrl);
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
          <h2 className="text-xl font-extrabold text-slate-850 dark:text-white">Welcome Back Player!</h2>
          <p className="text-xs text-slate-450 dark:text-slate-400">
            Sign in to check field slots and schedule your next team match.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          
          {/* Email input field */}
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

          {/* Password input field */}
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
                })}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-all font-medium text-sm"
              />
            </div>
            {errors.password && (
              <span className="text-xs text-red-500 font-bold block mt-0.5">{errors.password.message}</span>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/60 text-white font-extrabold py-3.5 rounded-2xl shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 active:scale-95 transition-all text-sm flex items-center justify-center"
          >
            {submitting ? (
              <Spinner size="small" />
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-4.5 w-4.5" />
              </>
            )}
          </button>
        </form>

        {/* Divider line */}
        <div className="relative py-1 flex items-center">
          <div className="flex-grow border-t border-slate-100 dark:border-slate-800/80" />
          <span className="flex-shrink mx-4 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider">Or Sign In With</span>
          <div className="flex-grow border-t border-slate-100 dark:border-slate-800/80" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleSubmitting}
          className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-70 text-slate-700 dark:text-slate-100 font-bold py-3 rounded-2xl transition-all text-sm flex items-center justify-center"
        >
          {googleSubmitting ? <Spinner size="small" /> : 'Continue with Google'}
        </button>

        {/* Link to Register */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-2">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary-500 hover:underline font-semibold">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}
