import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeDetails from './pages/EmployeeDetails';

/**
 * Main application component.
 * Sets up the React Router for page-level navigation and embeds Navbar and Footer as shell structures.
 */
function App() {
  return (
    <Router>
      {/* flex-col min-h-screen creates a full vertical page container with footer pinned to the bottom */}
      <div className="flex min-h-screen flex-col bg-slate-50">
        
        {/* Persistent header navigation */}
        <Navbar />
        
        {/* Dynamic page container */}
        <main className="flex-grow">
          <Routes>
            {/* Table dashboard page (Home) */}
            <Route path="/" element={<EmployeeList />} />
            
            {/* Create form page */}
            <Route path="/add-employee" element={<EmployeeForm />} />
            
            {/* Update/Edit form page */}
            <Route path="/edit-employee/:id" element={<EmployeeForm />} />
            
            {/* Detailed profile viewer */}
            <Route path="/employee/:id" element={<EmployeeDetails />} />
          </Routes>
        </main>
        
        {/* Persistent footer */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
