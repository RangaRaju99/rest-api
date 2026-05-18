# 👔 StaffPortal — Full-Stack Enterprise CRUD Platform

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen?logo=springboot&logoColor=white&style=flat-square)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.x-blue?logo=react&logoColor=white&style=flat-square)](https://react.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4.0-38bdf8?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-orange?logo=mysql&logoColor=white&style=flat-square)](https://www.mysql.com)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?logo=vite&logoColor=white&style=flat-square)](https://vite.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**StaffPortal** is a state-of-the-art, beautifully polished, full-stack Employee Management System designed for modern enterprises. It demonstrates a production-ready **3-Tier Layered Architecture** connecting a **Spring Boot REST API** backend to a responsive **React.js + Vite** single-page application (SPA), backed by **MySQL persistence**.

This codebase is crafted specifically to serve as a clean, hyper-documented, and robust model of full-stack integration—making it highly educational for developers while maintaining industry-grade performance, styling, and validation patterns.

---

## ✨ Features Checklist

*   **⚡ Modern Stack**: React 18 powered by Vite (sub-second HMR) + Spring Boot 3 running Java 17.
*   **🎨 Glassmorphism & Fluid UI**: Premium dashboard styling using Tailwind CSS v4, smooth slide-in entry animations, dynamic hover effects, and responsive mobile-first grids.
*   **🛡️ Robust Bean Validation**: Dual-layer input security. The backend intercepts invalid requests using `@NotBlank`, `@Email`, and `@Positive` annotations.
*   **🚦 Live Validation Mapper**: When the database rejects a form (e.g. duplicate email, out-of-range salary), the React frontend catches the `400 Bad Request` and renders specific error strings directly under the matching input in real-time.
*   **🔮 Global Exception Handler**: A centralized RestController advice captures all database conflicts, mapping them to structured, client-friendly JSON payloads with proper HTTP statuses.
*   **🔍 Live Client Filtering**: Built-in, high-performance client search bar filters employee directories instantly by Name, Email, or Department.
*   **🌱 Self-Healing Database**: Spring Boot uses Hibernate Auto-DDL (`update`) to scan Entity files and dynamically build or adjust tables on startup—no manual creation required.

---

## 🏛️ System Topology & Data Flow

When a user interacts with the UI, data travels through a decoupled, unidirectional lifecycle:

```text
  [ React Client (Port 5173) ]
             │
             ▼ (HTTP Axios Requests containing JSON payloads)
  [ Spring Boot API (Port 8080) ]
     ├─► Controller : Maps routes, enforces @Valid, handles CORS configs.
     ├─► Service    : Executes business logic & translates entities ◄═► DTOs.
     └─► Repository : Leverages Spring Data JPA to generate SQL.
             │
             ▼ (Optimized JDBC Queries)
  [ MySQL Database (Port 3306) ]
```

---

## 📂 Production Directory Explanations

Here is a high-level map of our modular codebase structure:

```text
rest-api/
│
├── schema.sql                         # Database DDL initialization & mock seed data
├── README.md                          # Interactive landing page (This file!)
│
├── employee-management-backend/       # Spring Boot Backend (Maven Project)
│   ├── pom.xml                        # Complete dependency manager (Data JPA, Web, Validation, Lombok)
│   └── src/main/
│       ├── java/com/example/employeemanager/
│       │   ├── EmployeeManagerApplication.java # Spring Boot entry application bean
│       │   ├── entity/                # JPA Database Entity models (Employee.java)
│       │   ├── dto/                   # Structured transmission payloads (EmployeeDto.java)
│       │   ├── repository/            # DB Queries & Custom Finder Methods (EmployeeRepository.java)
│       │   ├── service/               # Logical contracts & mappings (EmployeeService.java)
│       │   ├── controller/            # Public REST endpoints & CORS policies (EmployeeController.java)
│       │   └── exception/             # Centralized global HTTP error wrappers (GlobalExceptionHandler.java)
│       └── resources/
│           └── application.properties # Server port, JDBC URL, and database credentials
│
└── employee-management-frontend/      # React Frontend (Vite Client SPA)
    ├── package.json                   # Fronted Node dependencies (Axios, React Router)
    ├── postcss.config.js              # PostCSS build hooks for Tailwind v4
    ├── index.html                     # Standard HTML page skeleton with SEO tags
    └── src/
        ├── main.jsx                   # Virtual DOM mounting root
        ├── App.jsx                    # Route mapping & layout wrapper
        ├── index.css                  # Tailwind imports & customized animation styling
        ├── components/                # Modular global UI widgets (Navbar, Footer)
        ├── pages/                     # Main view interfaces (EmployeeList, EmployeeForm, EmployeeDetails)
        └── services/                  # Clean backend network service (EmployeeService.js)
```

---

## 🔌 Decoupled REST Endpoints

All backend APIs are prefixed with `/api/employees` and return structured JSON:

| HTTP Method | Route Endpoint | Input JSON Body | Status Code | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **`GET`** | `/api/employees` | *None* | `200 OK` | Retrieves all employee records |
| **`GET`** | `/api/employees/{id}` | *None* | `200 OK` / `404 NF` | Retrieves an individual profile by ID |
| **`POST`** | `/api/employees` | `EmployeeDto` | `211 Created` / `400 BR` | Adds a new team record |
| **`PUT`** | `/api/employees/{id}` | `EmployeeDto` | `200 OK` / `400 BR` / `404 NF` | Modifies fields of an existing employee |
| **`DELETE`**| `/api/employees/{id}` | *None* | `200 OK` / `404 NF` | Deletes a record from the database |

---

## 🚀 Speed-Run Execution Setup

Follow these steps sequentially to launch the entire full-stack system:

### 🛢️ Step 1: Initialize MySQL Database
1. Launch your preferred database manager (e.g. MySQL Command Line, Workbench, or DBeaver).
2. Execute the commands in [schema.sql](file:///c:/Users/hp/OneDrive/Desktop/rest-api/schema.sql) to set up and seed your database:
   ```sql
   SOURCE c:/Users/hp/OneDrive/Desktop/rest-api/schema.sql;
   ```
   *This initializes a database named `employee_db` containing a seeded table with initial employee profiles.*

### ☕ Step 2: Start the Spring Boot Backend
1. Verify the MySQL root username and password configured in your [application.properties](file:///c:/Users/hp/OneDrive/Desktop/rest-api/employee-management-backend/src/main/resources/application.properties):
   ```properties
   spring.datasource.username=root
   spring.datasource.password=Root  # <-- Verify this matches your local MySQL password!
   ```
2. Open a terminal, move into the backend folder, and start the server:
   ```bash
   cd employee-management-backend
   mvn spring-boot:run
   ```
3. Once fully booted, your console will print:
   `[INFO] Tomcat started on port 8080 (http) with context path '/'`

### ⚛️ Step 3: Start the React Frontend
1. Open a **new, separate terminal** and move into the frontend directory:
   ```bash
   cd employee-management-frontend
   ```
2. Install the necessary Node packages (first run only):
   ```bash
   npm install
   ```
3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the web page at: **`http://localhost:5173`**

---

## 🩺 Quick Troubleshooting Guide

### ❌ Problem 1: `java.sql.SQLException: Access denied for user 'root'@'localhost'`
*   **Reason**: The backend's password in `application.properties` does not match your local MySQL root password.
*   **Solution**: Open [application.properties](file:///c:/Users/hp/OneDrive/Desktop/rest-api/employee-management-backend/src/main/resources/application.properties), change `spring.datasource.password=Root` to your actual database password, save the file, and restart the backend.

### ❌ Problem 2: `Error: Address already in use` (Port 8080 or 5173 is locked)
*   **Reason**: Another process is already utilizing the port.
*   **Solution**: 
    *   Change the port in `application.properties` by setting `server.port=9090` (and update the base URL in the frontend's `EmployeeService.js`).
    *   Or kill the active port owner in your Windows command prompt:
        ```cmd
        netstat -ano | findstr 8080
        taskkill /F /PID <PID_NUMBER>
        ```

### ❌ Problem 3: Fetch API fails / CORS blocks request
*   **Reason**: The frontend is hitting an inactive URL or blocked by Cross-Origin Policies.
*   **Solution**: Make sure Spring Boot is actively running. Check that `@CrossOrigin(origins = "*")` is placed directly at the top of your `EmployeeController.java` file.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE details for info. Feel free to copy, modify, and build upon it to accelerate your learning journey!
