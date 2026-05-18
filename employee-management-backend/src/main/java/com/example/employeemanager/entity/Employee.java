package com.example.employeemanager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity Class representing the "employees" table in the database.
 * 
 * @Entity tells JPA that this class should be mapped to a table in the database.
 * @Table specifies the actual table name. If not defined, JPA uses the class name.
 * @Data (Lombok) automatically generates Getters, Setters, toString, equals, and hashCode.
 * @NoArgsConstructor (Lombok) creates a constructor with no arguments, which Hibernate requires.
 * @AllArgsConstructor (Lombok) creates a constructor containing all properties.
 */
@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    // Unique Constraint ensures no two employees can have the same email address
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "department", nullable = false)
    private String department;

    @Column(name = "salary", nullable = false)
    private Double salary;
}
