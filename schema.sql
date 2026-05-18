-- ==========================================================
-- Database & Schema Configuration for MySQL
-- ==========================================================

-- 1. Create the Database Schema
CREATE DATABASE IF NOT EXISTS employee_db;

-- 2. Switch to the newly created database context
USE employee_db;

-- 3. Create the 'employees' table
-- (Note: Spring Boot's Hibernate will automatically create this for you if it does not exist,
--  but this DDL shows exactly what is created under the hood!)
CREATE TABLE IF NOT EXISTS employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(50) NOT NULL,
    salary DOUBLE NOT NULL
);

-- 4. Seed database with initial sample employee records (optional)
-- Run these inserts to quickly populate your dashboard upon startup!
INSERT INTO employees (name, email, department, salary) VALUES
('Jane Doe', 'jane.doe@company.com', 'Engineering', 95000.00),
('John Smith', 'john.smith@company.com', 'Human Resources', 62000.00),
('Robert Johnson', 'robert.j@company.com', 'Finance', 84000.00),
('Emily Davis', 'emily.davis@company.com', 'Marketing', 71000.00)
ON DUPLICATE KEY UPDATE id=id;
