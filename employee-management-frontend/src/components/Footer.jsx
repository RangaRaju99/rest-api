import React from 'react';

/**
 * Footer component that resides at the bottom of the page.
 */
const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-slate-700">StaffPortal</span>. All rights reserved.
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Built with Spring Boot &bull; React &bull; Tailwind CSS &bull; MySQL
        </p>
      </div>
    </footer>
  );
};

export default Footer;
