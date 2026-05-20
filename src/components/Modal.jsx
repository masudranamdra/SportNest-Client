'use client';

import React, { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Are you sure?', 
  message = 'This action cannot be undone.', 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  isDanger = false 
}) => {
  
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // lock scrolling
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in">
      {/* Click outside to close backdrop */}
      <div className="fixed inset-0" onClick={onClose} />
      
      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Warning Icon Banner */}
        <div className="flex items-center space-x-3.5 pb-4">
          <div className={`p-3 rounded-2xl ${isDanger ? 'bg-red-100 text-red-650 dark:bg-red-950/30 dark:text-red-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400'}`}>
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{title}</h3>
          </div>
        </div>

        {/* Details message */}
        <div className="py-2">
          <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions Button Row */}
        <div className="mt-6 flex justify-end space-x-3.5">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-755 dark:text-slate-200 transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-sm active:scale-95 transition-all ${
              isDanger 
                ? 'bg-red-500 hover:bg-red-650' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Modal;
