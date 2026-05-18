package com.example.employeemanager.controller;

import com.example.employeemanager.dto.EmployeeDto;
import com.example.employeemanager.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller class defining the Employee CRUD APIs.
 * 
 * @CrossOrigin("*") allows requests from any origin (crucial for connecting with React dev server).
 * In production, you would restrict this to the exact frontend domain (e.g., http://localhost:5173).
 * @RestController informs Spring that this class is a REST controller returning JSON payloads.
 * @RequestMapping set the base path for all endpoints in this class to "/api/employees".
 * @AllArgsConstructor (Lombok) autowires the EmployeeService constructor dependency.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/employees")
@AllArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    /**
     * POST API: Add/Create a new Employee record.
     * Endpoint: POST http://localhost:8080/api/employees
     * 
     * @Valid triggers Bean validation on EmployeeDto before executing the method.
     * @RequestBody deserializes incoming JSON into an EmployeeDto object.
     * @return 201 CREATED status with the saved employee data.
     */
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@Valid @RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    /**
     * GET BY ID API: Fetch a single Employee record by ID.
     * Endpoint: GET http://localhost:8080/api/employees/{id}
     * 
     * @PathVariable binds the {id} value from the URI to the method argument.
     * @return 200 OK status with the employee DTO.
     */
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId) {
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }

    /**
     * GET ALL API: Fetch all Employee records.
     * Endpoint: GET http://localhost:8080/api/employees
     * 
     * @return 200 OK status with a list of all employee DTOs.
     */
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    /**
     * PUT API: Update an existing Employee record.
     * Endpoint: PUT http://localhost:8080/api/employees/{id}
     * 
     * @Valid checks validation on updated Employee DTO.
     * @RequestBody maps the incoming new JSON details.
     * @PathVariable binds the target employee's ID.
     * @return 200 OK status with the updated employee DTO.
     */
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,
                                                      @Valid @RequestBody EmployeeDto updatedEmployeeDto) {
        EmployeeDto employeeDto = employeeService.updateEmployee(employeeId, updatedEmployeeDto);
        return ResponseEntity.ok(employeeDto);
    }

    /**
     * DELETE API: Remove an Employee record.
     * Endpoint: DELETE http://localhost:8080/api/employees/{id}
     * 
     * @return 200 OK status with success confirmation message.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId) {
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee deleted successfully!");
    }
}
