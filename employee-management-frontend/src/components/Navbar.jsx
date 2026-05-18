import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * Navbar component that resides at the top of the application layout.
 * Provides easy navigational pathways to 'All Employees' and 'Add Employee' pages.
 */
const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand/Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition-transform duration-300 group-hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            StaffPortal
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-indigo-600 ${
                isActive ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600 py-1' : 'text-slate-600'
              }`
            }
          >
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/add-employee" 
            className={({ isActive }) => 
              `inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg ${
                isActive 
                  ? 'bg-indigo-700 shadow-indigo-200' 
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-100 hover:-translate-y-0.5'
              }`
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Employee
          </NavLink>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;
