package com.example.employeemanager.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) class.
 * 
 * Used for transferring data between frontend client and backend controller.
 * Isolates the JPA entity from direct exposure to the REST layer.
 * Contains Spring Validation annotations to enforce input constraints.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {

    private Long id;

    @NotBlank(message = "Employee name cannot be blank")
    @Size(min = 2, max = 50, message = "Employee name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Employee email cannot be blank")
    @Email(message = "Please enter a valid email address (e.g., alex@company.com)")
    private String email;

    @NotBlank(message = "Employee department cannot be blank")
    private String department;

    @NotNull(message = "Employee salary is required")
    @Positive(message = "Employee salary must be a positive number greater than zero")
    private Double salary;
}
