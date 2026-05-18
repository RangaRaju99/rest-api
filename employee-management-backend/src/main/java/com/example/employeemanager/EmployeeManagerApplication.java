package com.example.employeemanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The entry point of the Spring Boot Application.
 * 
 * @SpringBootApplication is a convenience annotation that adds all of the following:
 * 1. @Configuration: Tags the class as a source of bean definitions.
 * 2. @EnableAutoConfiguration: Tells Spring Boot to start adding beans based on classpath settings, other beans, and property settings.
 * 3. @ComponentScan: Tells Spring to look for other components, configurations, and services in the com.example.employeemanager package, allowing it to find and register controllers, repositories, etc.
 */
@SpringBootApplication
public class EmployeeManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagerApplication.class, args);
	}

}
