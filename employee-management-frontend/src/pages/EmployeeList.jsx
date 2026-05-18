import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const EmployeeList = () => {
  // State for storing the full employee list
  const [employees, setEmployees] = useState([]);
  // Loading state to toggle spinners
  const [loading, setLoading] = useState(true);
  // Search query state
  const [searchQuery, setSearchQuery] = useState('');
  // Alert banner states
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Load employee list from the backend on page mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    setLoading(true);
    EmployeeService.getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        showAlert('Failed to connect to the backend server. Please verify Spring Boot is running.', 'error');
        setLoading(false);
      });
  };

  // Triggers alert banner
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    // Auto hide alert after 4 seconds
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 4500);
  };

  // Handles employee deletion
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete employee "${name}"?`)) {
      EmployeeService.deleteEmployee(id)
        .then((response) => {
          showAlert(`Employee "${name}" deleted successfully!`, 'success');
          // Re-fetch remaining list
          fetchEmployees();
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
          showAlert('Failed to delete the employee record.', 'error');
        });
    }
  };

  // Client-side filtering based on search query
  const filteredEmployees = employees.filter((employee) => {
    const query = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query)
    );
  });

  // Helper to format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  // Department Badge color generator
  const getDeptColor = (dept) => {
    const d = dept.toLowerCase();
    if (d.includes('tech') || d.includes('eng') || d.includes('it')) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (d.includes('hr') || d.includes('human')) {
      return 'bg-pink-50 text-pink-700 border-pink-200';
    } else if (d.includes('sale') || d.includes('mark')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (d.includes('fin') || d.includes('acc')) {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    }
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      
      {/* Alert Banners */}
      {alert.show && (
        <div className={`mb-6 flex items-center gap-3 rounded-xl border p-4 shadow-sm transition-all duration-300 ${
          alert.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {alert.type === 'success' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          <span className="text-sm font-semibold">{alert.message}</span>
        </div>
      )}

      {/* Header and Add Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Employees Directory</h1>
          <p className="mt-1.5 text-sm text-slate-500">Manage your company's workforce and view staff records.</p>
        </div>
        <div>
          <Link
            to="/add-employee"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-500 hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Employee
          </Link>
        </div>
      </div>

      {/* Interactive controls: Search Bar & Count */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name, email or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none ring-offset-2 transition-all hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div className="text-sm font-medium text-slate-500">
          Showing <span className="text-slate-800 font-bold">{filteredEmployees.length}</span> of{' '}
          <span className="text-slate-800 font-bold">{employees.length}</span> records
        </div>
      </div>

      {/* Main Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-slate-600">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Employee Details</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Salary</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              
              {/* Spinner Skeleton loader */}
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-6 py-6"><div className="h-4 w-8 rounded bg-slate-200"></div></td>
                    <td className="px-6 py-6">
                      <div className="h-4 w-32 rounded bg-slate-200 mb-2"></div>
                      <div className="h-3 w-48 rounded bg-slate-100"></div>
                    </td>
                    <td className="px-6 py-6"><div className="h-6 w-20 rounded bg-slate-100"></div></td>
                    <td className="px-6 py-6"><div className="h-4 w-16 rounded bg-slate-200"></div></td>
                    <td className="px-6 py-6 flex justify-end gap-2"><div className="h-8 w-24 rounded bg-slate-100"></div></td>
                  </tr>
                ))
              ) : filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5 font-mono text-xs font-bold text-slate-400">
                      #{emp.id}
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {emp.name}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{emp.email}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${getDeptColor(emp.department)}`}>
                        {emp.department}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-mono text-sm font-semibold text-slate-700">
                      {formatCurrency(emp.salary)}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Button */}
                        <Link
                          to={`/employee/${emp.id}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-indigo-600"
                          title="View Details"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        {/* Edit Button */}
                        <Link
                          to={`/edit-employee/${emp.id}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-amber-600"
                          title="Edit Record"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-2.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </Link>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(emp.id, emp.name)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                          title="Delete Record"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty state screen */
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-slate-900">No employees found</h3>
                      <p className="mt-1 text-sm text-slate-500 max-w-xs mx-auto">
                        {searchQuery ? "No matches found. Try searching another name or department." : "Get started by adding a new employee to your database."}
                      </p>
                      {!searchQuery && (
                        <Link
                          to="/add-employee"
                          className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                          Add Your First Employee
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default EmployeeList;
