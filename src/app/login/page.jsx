'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, ArrowRight, Activity } from 'lucide-react';
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
    <div className="flex-grow flex flex-col justify-center items-center py-20 px-4 bg-slate-50 dark:bg-[#070b19] transition-colors duration-250 relative min-h-[85vh]">
      
      {/* Background glow mesh (only in dark mode) */}
      <div className="hidden dark:block absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-850/60 rounded-3xl overflow-hidden shadow-sm dark:shadow-2xl p-8 space-y-6 relative z-10 backdrop-blur-md">
        
        {/* Branding header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center space-x-2.5 group">
            <div className="relative flex items-center justify-center h-10 w-10 bg-gradient-to-tr from-blue-600 to-sky-400 text-white rounded-xl shadow-md shadow-blue-500/10 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
              <img className="h-7 w-7" src="https://i.ibb.co.com/fzF0nrZ7/logo1.png" alt=""/>
            </div>
            <span className="text-slate-900 dark:text-white font-black tracking-tight text-xl">
              Sport<span className="bg-gradient-to-r from-blue-600 to-sky-400 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">Nest</span>
            </span>
          </Link>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Welcome Back Player!</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
            Sign in to check field slots and schedule your next team match.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          
          {/* Email input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
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
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
              />
            </div>
            {errors.email && (
              <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.email.message}</span>
            )}
          </div>

          {/* Password input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                {...register('password', { 
                  required: 'Password is required',
                })}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-bold text-xs uppercase tracking-wider"
              />
            </div>
            {errors.password && (
              <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.password.message}</span>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-2xl shadow-sm active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center justify-center"
          >
            {submitting ? (
              <Spinner size="small" />
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider line */}
        <div className="relative py-1 flex items-center">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
          <span className="flex-shrink mx-4 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">Or Sign In With</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleSubmitting}
          className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-70 text-slate-700 dark:text-slate-300 font-bold py-3.5 rounded-2xl transition-all text-xs uppercase tracking-wider flex items-center justify-center active:scale-95 shadow-sm"
        >
          {googleSubmitting ? <Spinner size="small" /> : 'Continue with Google'}
        </button>

        {/* Link to Register */}
        <p className="text-center text-xs text-slate-600 dark:text-slate-400 font-semibold pt-2">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 dark:text-sky-400 hover:underline">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}
