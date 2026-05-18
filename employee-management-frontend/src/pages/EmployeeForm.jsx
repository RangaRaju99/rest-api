import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const EmployeeForm = () => {
  // Navigation hook to redirect users after submission
  const navigate = useNavigate();
  // Params hook to fetch the ID if we are editing
  const { id } = useParams();

  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');

  // Loading indicator for network actions
  const [submitting, setSubmitting] = useState(false);
  
  // Field-level error messages (mapped from client-side or Spring validation)
  const [fieldErrors, setFieldErrors] = useState({});
  // General page-level error banner
  const [generalError, setGeneralError] = useState('');

  // Check if we are in 'Update Mode' or 'Create Mode'
  const isEditMode = !!id;

  // On page mount, if we have an ID, fetch existing employee details
  useEffect(() => {
    if (isEditMode) {
      EmployeeService.getEmployeeById(id)
        .then((response) => {
          const emp = response.data;
          setName(emp.name);
          setEmail(emp.email);
          setDepartment(emp.department);
          setSalary(emp.salary.toString());
        })
        .catch((error) => {
          console.error('Error fetching employee details:', error);
          setGeneralError('Could not retrieve employee details. Please make sure the backend is active.');
        });
    }
  }, [id, isEditMode]);

  // Client side validation helper before calling backend
  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Employee name is required';
    else if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters';

    if (!email.trim()) errors.email = 'Employee email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Please enter a valid email address';

    if (!department.trim()) errors.department = 'Department name is required';

    if (!salary) errors.salary = 'Employee salary is required';
    else if (isNaN(salary) || parseFloat(salary) <= 0) errors.salary = 'Salary must be a positive number greater than 0';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError('');
    setFieldErrors({});

    // 1. Run client side validations
    if (!validateForm()) return;

    setSubmitting(true);

    // 2. Build payload structure matching Spring Boot's EmployeeDto
    const employeeDto = {
      name: name.trim(),
      email: email.trim(),
      department: department.trim(),
      salary: parseFloat(salary),
    };

    // 3. Trigger appropriate API calls based on Mode
    const apiCall = isEditMode
      ? EmployeeService.updateEmployee(id, employeeDto)
      : EmployeeService.createEmployee(employeeDto);

    apiCall
      .then((response) => {
        setSubmitting(false);
        // Redirect to dashboard on success
        navigate('/', { state: { alertMsg: `Employee "${name}" saved successfully!` } });
      })
      .catch((error) => {
        setSubmitting(false);
        console.error('Error submitting form:', error);

        // Handle structured validation errors returned by our GlobalExceptionHandler
        if (error.response && error.response.status === 400) {
          const apiErrors = error.response.data.validationErrors;
          const apiMessage = error.response.data.message;

          if (apiErrors) {
            // Spring Bean Validation failed - map to individual input fields
            setFieldErrors(apiErrors);
          } else if (apiMessage) {
            // Standard business exception (e.g. Email already in use)
            if (apiMessage.toLowerCase().includes('email')) {
              setFieldErrors({ email: apiMessage });
            } else {
              setGeneralError(apiMessage);
            }
          } else {
            setGeneralError('Bad Request: Invalid details provided.');
          }
        } else {
          setGeneralError('Failed to communicate with server. Please try again later.');
        }
      });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      
      {/* Return Navigation */}
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

      {/* General Error Banner */}
      {generalError && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-semibold">{generalError}</span>
        </div>
      )}

      {/* Main Form Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        
        {/* Form Title */}
        <div className="border-b border-slate-100 pb-5 mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900">
            {isEditMode ? 'Update Employee Details' : 'Register New Employee'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {isEditMode 
              ? 'Modify the employee details below. All validation rules apply.' 
              : 'Add a new member to your team. All fields are mandatory.'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <div className="mt-1.5">
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Alex Johnson"
                className={`w-full rounded-xl border py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none ring-offset-2 transition-all ${
                  fieldErrors.name 
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
              />
            </div>
            {fieldErrors.name && (
              <p className="mt-1.5 text-xs font-semibold text-red-600">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <div className="mt-1.5">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., alex.johnson@company.com"
                className={`w-full rounded-xl border py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none ring-offset-2 transition-all ${
                  fieldErrors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
              />
            </div>
            {fieldErrors.email && (
              <p className="mt-1.5 text-xs font-semibold text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          {/* Dual columns for Department & Salary */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
            {/* Department Field */}
            <div>
              <label htmlFor="department" className="block text-sm font-semibold text-slate-700">
                Department
              </label>
              <div className="mt-1.5">
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g., Engineering"
                  className={`w-full rounded-xl border py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none ring-offset-2 transition-all ${
                    fieldErrors.department 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                      : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />
              </div>
              {fieldErrors.department && (
                <p className="mt-1.5 text-xs font-semibold text-red-600">{fieldErrors.department}</p>
              )}
            </div>

            {/* Salary Field */}
            <div>
              <label htmlFor="salary" className="block text-sm font-semibold text-slate-700">
                Annual Salary ($)
              </label>
              <div className="mt-1.5">
                <input
                  type="number"
                  step="0.01"
                  id="salary"
                  name="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g., 75000"
                  className={`w-full rounded-xl border py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none ring-offset-2 transition-all ${
                    fieldErrors.salary 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                      : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />
              </div>
              {fieldErrors.salary && (
                <p className="mt-1.5 text-xs font-semibold text-red-600">{fieldErrors.salary}</p>
              )}
            </div>

          </div>

          {/* Form Actions */}
          <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
            <Link
              to="/"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-800 transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-500 hover:-translate-y-0.5 disabled:opacity-75 disabled:pointer-events-none"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : isEditMode ? (
                'Save Changes'
              ) : (
                'Submit Record'
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

export default EmployeeForm;
