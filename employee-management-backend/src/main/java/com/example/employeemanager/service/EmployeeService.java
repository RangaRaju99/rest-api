package com.example.employeemanager.service;

import com.example.employeemanager.dto.EmployeeDto;
import java.util.List;

/**
 * Service Interface outlining the business logic operations.
 * Declares the standard CRUD methods.
 */
public interface EmployeeService {
    
    /**
     * Create and store a new employee.
     * 
     * @param employeeDto DTO object representing the new employee.
     * @return EmployeeDto The saved employee, containing the generated database ID.
     */
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    /**
     * Retrieve a single employee by their unique ID.
     * 
     * @param employeeId The database ID of the employee.
     * @return EmployeeDto The mapped DTO of the employee.
     */
    EmployeeDto getEmployeeById(Long employeeId);

    /**
     * Retrieve all employee records from the database.
     * 
     * @return List<EmployeeDto> A list of all employees in DTO format.
     */
    List<EmployeeDto> getAllEmployees();

    /**
     * Update details of an existing employee.
     * 
     * @param employeeId The ID of the employee to update.
     * @param updatedEmployeeDto The DTO representing the updated fields.
     * @return EmployeeDto The updated employee database entry in DTO format.
     */
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployeeDto);

    /**
     * Delete an employee record from the database.
     * 
     * @param employeeId The database ID of the employee to be deleted.
     */
    void deleteEmployee(Long employeeId);
}
