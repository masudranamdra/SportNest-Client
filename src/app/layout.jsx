import { Inter } from 'next/font/google';
import '../styles/globals.css'; // Let's make sure it loads our tailwind setup
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata = {
  title: 'SportNest - Sports Facility Booking Platform',
  description: 'Book premium sports fields, courts, cricket lanes, and swimming arenas dynamically. Manage slot bookings easily in real time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 font-sans flex flex-col antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Toaster 
              position="top-center"
              toastOptions={{
                className: 'dark:bg-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl font-medium',
                duration: 4000,
              }}
            />
            <Navbar />
            <main className="flex-grow pt-16 flex flex-col">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
