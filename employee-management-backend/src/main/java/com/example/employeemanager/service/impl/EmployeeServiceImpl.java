package com.example.employeemanager.service.impl;

import com.example.employeemanager.dto.EmployeeDto;
import com.example.employeemanager.entity.Employee;
import com.example.employeemanager.exception.ResourceNotFoundException;
import com.example.employeemanager.repository.EmployeeRepository;
import com.example.employeemanager.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation class containing business logic.
 * 
 * @Service registers this class as a Spring-managed Service Bean.
 * @AllArgsConstructor (Lombok) handles constructor-based dependency injection
 * of EmployeeRepository automatically (cleaner than @Autowired).
 */
@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        // Business Rule: Email addresses must be unique in the database
        if (employeeRepository.existsByEmail(employeeDto.getEmail())) {
            throw new IllegalArgumentException("Email address is already in use: " + employeeDto.getEmail());
        }

        // Convert DTO to Entity
        Employee employee = mapToEmployee(employeeDto);

        // Save Entity in database
        Employee savedEmployee = employeeRepository.save(employee);

        // Convert saved Entity back to DTO and return
        return mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        // Find by ID, throw custom exception if not found
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given ID: " + employeeId));

        return mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();

        // Convert list of entities to list of DTOs using Java Streams
        return employees.stream()
                .map(this::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployeeDto) {
        // Find existing employee
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot update. Employee does not exist with ID: " + employeeId));

        // Business Rule: Check if the new email belongs to another user
        if (employeeRepository.existsByEmailAndIdNot(updatedEmployeeDto.getEmail(), employeeId)) {
            throw new IllegalArgumentException("Email address is already in use by another employee: " + updatedEmployeeDto.getEmail());
        }

        // Update fields
        employee.setName(updatedEmployeeDto.getName());
        employee.setEmail(updatedEmployeeDto.getEmail());
        employee.setDepartment(updatedEmployeeDto.getDepartment());
        employee.setSalary(updatedEmployeeDto.getSalary());

        // Save changes to database
        Employee updatedEmployee = employeeRepository.save(employee);

        return mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        // Check if employee exists first
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot delete. Employee does not exist with ID: " + employeeId));

        // Delete from database
        employeeRepository.deleteById(employeeId);
    }

    // ==========================================
    // Helper Methods: Entity <-> DTO Mapping
    // ==========================================

    /**
     * Helper to map Employee Entity to EmployeeDto.
     */
    private EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getName(),
                employee.getEmail(),
                employee.getDepartment(),
                employee.getSalary()
        );
    }

    /**
     * Helper to map EmployeeDto to Employee Entity.
     */
    private Employee mapToEmployee(EmployeeDto employeeDto) {
        return new Employee(
                employeeDto.getId(),
                employeeDto.getName(),
                employeeDto.getEmail(),
                employeeDto.getDepartment(),
                employeeDto.getSalary()
        );
    }
}
