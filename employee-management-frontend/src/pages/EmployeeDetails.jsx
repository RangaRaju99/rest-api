import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    EmployeeService.getEmployeeById(id)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching employee details:', err);
        setError('Could not retrieve employee profile. Make sure the database record exists.');
        setLoading(false);
      });
  }, [id]);

  // Helper to format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete employee "${employee.name}"?`)) {
      EmployeeService.deleteEmployee(id)
        .then(() => {
          navigate('/', { state: { alertMsg: `Employee "${employee.name}" deleted successfully!` } });
        })
        .catch((err) => {
          console.error('Error deleting employee:', err);
          setError('Failed to delete this employee record.');
        });
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      
      {/* Back Navigation */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-semibold">{error}</span>
        </div>
      )}

      {/* Main Profile Card Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        
        {loading ? (
          /* Profile Card Skeleton Loader */
          <div className="animate-pulse p-8">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-slate-200"></div>
              <div className="flex-1">
                <div className="h-5 w-1/3 rounded bg-slate-200 mb-2"></div>
                <div className="h-4 w-1/4 rounded bg-slate-100"></div>
              </div>
            </div>
            <div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
              <div className="h-4 w-1/2 rounded bg-slate-200"></div>
              <div className="h-4 w-2/3 rounded bg-slate-100"></div>
              <div className="h-4 w-1/3 rounded bg-slate-200"></div>
            </div>
          </div>
        ) : employee ? (
          /* Main Profile Details */
          <>
            {/* Header: Visual Profile Banner */}
            <div className="bg-gradient-to-r from-indigo-550 to-indigo-650 bg-indigo-600 px-8 py-8 text-white">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                
                {/* Visual Avatar Icon */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>

                <div className="flex-1">
                  <span className="inline-block rounded bg-indigo-500/30 border border-white/10 px-2 py-0.5 text-xs font-semibold tracking-wider uppercase text-indigo-100">
                    ID #{employee.id}
                  </span>
                  <h2 className="text-2xl font-extrabold tracking-tight mt-1">{employee.name}</h2>
                  <p className="text-sm text-indigo-100 mt-0.5">{employee.department} Department</p>
                </div>

              </div>
            </div>

            {/* Body: Individual Field Breakdown */}
            <div className="p-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Detailed Information</h3>
              
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <dt className="text-xs font-semibold text-slate-400 uppercase">Email Address</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-800 break-all">{employee.email}</dd>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <dt className="text-xs font-semibold text-slate-400 uppercase">Annual Salary</dt>
                  <dd className="mt-1 font-mono text-base font-bold text-slate-800">
                    {formatCurrency(employee.salary)}
                  </dd>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <dt className="text-xs font-semibold text-slate-400 uppercase">Corporate Department</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-800">{employee.department}</dd>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <dt className="text-xs font-semibold text-slate-400 uppercase">Employment Status</dt>
                  <dd className="mt-1 flex items-center gap-1.5 text-sm font-bold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Active Account
                  </dd>
                </div>

              </dl>
            </div>

            {/* Footer: CRUD Profile Action Buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-8 py-5">
              <div>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Profile
                </button>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/edit-employee/${employee.id}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-500 hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-2.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Profile
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center text-slate-500 text-sm">
            Employee record not found.
          </div>
        )}

      </div>

    </div>
  );
};

export default EmployeeDetails;
