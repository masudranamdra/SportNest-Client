'use client';

import React from 'react';

const Spinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-5 w-5 border-2',
    medium: 'h-10 w-10 border-3',
    large: 'h-16 w-16 border-4',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div 
        className={`${sizeClasses[size]} animate-spin rounded-full border-primary-500 border-t-transparent`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

export default Spinner;
