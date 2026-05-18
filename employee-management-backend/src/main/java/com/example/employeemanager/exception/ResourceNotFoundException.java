package com.example.employeemanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Custom Exception thrown when an requested Employee record is not found in the database.
 * 
 * @ResponseStatus(value = HttpStatus.NOT_FOUND) forces Spring Boot to automatically
 * return an HTTP Status 404 (Not Found) to the client when this exception is thrown.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    /**
     * Constructor for ResourceNotFoundException.
     * 
     * @param message Detail explanation of what went wrong.
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
