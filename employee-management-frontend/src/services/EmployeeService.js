import axios from 'axios';

// Base URL of the Spring Boot Backend API
const API_BASE_URL = 'http://localhost:8080/api/employees';

class EmployeeService {
    
    /**
     * Fetch all employees from the backend.
     * Route: GET http://localhost:8080/api/employees
     */
    getAllEmployees() {
        return axios.get(API_BASE_URL);
    }

    /**
     * Create/Add a new employee.
     * Route: POST http://localhost:8080/api/employees
     * @param {Object} employeeDto - Employee details
     */
    createEmployee(employeeDto) {
        return axios.post(API_BASE_URL, employeeDto);
    }

    /**
     * Fetch details of a single employee by their ID.
     * Route: GET http://localhost:8080/api/employees/{id}
     * @param {number} employeeId
     */
    getEmployeeById(employeeId) {
        return axios.get(`${API_BASE_URL}/${employeeId}`);
    }

    /**
     * Update an existing employee.
     * Route: PUT http://localhost:8080/api/employees/{id}
     * @param {number} employeeId
     * @param {Object} employeeDto - Updated employee details
     */
    updateEmployee(employeeId, employeeDto) {
        return axios.put(`${API_BASE_URL}/${employeeId}`, employeeDto);
    }

    /**
     * Delete an employee record.
     * Route: DELETE http://localhost:8080/api/employees/{id}
     * @param {number} employeeId
     */
    deleteEmployee(employeeId) {
        return axios.delete(`${API_BASE_URL}/${employeeId}`);
    }
}

// Export an instance of the class for direct import and usage across pages
export default new EmployeeService();
