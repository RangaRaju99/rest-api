package com.example.employeemanager.exception;

import java.time.LocalDateTime;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Standardized Model used as the JSON response body when exceptions occur.
 * Ensures consistent and developer-friendly error formatting.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDetails {
    private LocalDateTime timestamp;
    private String message;
    private String details;
    // Map storing input field validation failures (e.g., {"email": "Please enter a valid email address"})
    private Map<String, String> validationErrors;
}
