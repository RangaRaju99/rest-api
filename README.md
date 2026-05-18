# 👔 StaffPortal: Full-Stack Spring Boot + React CRUD System

Welcome to **StaffPortal**, a beginner-friendly, industry-standard **Full-Stack CRUD Application** built using **Spring Boot (Java)** for the backend REST API, **React + Vite (JavaScript)** for the frontend interface, and **MySQL** for persistent database storage.

This project is meticulously designed to demonstrate **clean code**, **layered architecture**, **input validation**, **exception handling**, and **seamless frontend-backend API integration** in a way that is easy to read and understand.

---

## 🏗️ Project Architecture
The project is divided into two cleanly separated subdirectories:

1. **`employee-management-backend/`**: A Spring Boot MVC layered Maven project running on port `8080`.
2. **`employee-management-frontend/`**: A React + Vite SPA using Tailwind CSS v4 and Axios running on port `5173`.

### 📂 Directory Map
```text
rest-api/
├── employee-management-backend/   # Spring Boot REST API
│   ├── pom.xml                     # Maven dependencies (JPA, Web, Lombok)
│   └── src/main/java/com/example/employeemanager/
│       ├── entity/                 # JPA database model (Employee.java)
│       ├── dto/                    # Inputs validator model (EmployeeDto.java)
│       ├── repository/             # Spring Data access (EmployeeRepository.java)
│       ├── service/                # Business logic contracts (EmployeeService.java)
│       └── controller/             # HTTP Route definitions (EmployeeController.java)
│
├── employee-management-frontend/  # React Frontend (Vite)
│   ├── package.json                # Dependencies (Axios, React Router)
│   └── src/
│       ├── components/             # Reusable shell units (Navbar, Footer)
│       ├── pages/                  # Route views (List, Form, Details)
│       └── services/               # HTTP client client (EmployeeService.js)
│
└── schema.sql                      # SQL setup & dummy seed data
```

---

## ⚡ Quick Start Instructions

### 1. Database Setup
Ensure your local MySQL server is running, then execute the setup script:
```sql
-- Logs in to MySQL CLI or Workbench and run:
SOURCE c:/Users/hp/OneDrive/Desktop/rest-api/schema.sql;
```
*This creates the database `employee_db` and seeds it with four beautiful mock employees!*

### 2. Run the Spring Boot Backend
1. Navigate to the backend directory:
   ```bash
   cd employee-management-backend
   ```
2. Open `src/main/resources/application.properties` and verify your local MySQL username and password.
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   *Your server will boot up and start listening for API requests on `http://localhost:8080`.*

### 3. Run the React Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd employee-management-frontend
   ```
2. Install Node modules:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *Open the printed local URL (typically `http://localhost:5173`) in your web browser to enjoy StaffPortal!*

---

## 📚 In-Depth Guides & Artifacts
For deep educational explanations of the CRUD lifecycle, API endpoints, layered flow diagrams, and frontend routing structure, we have generated two comprehensive guides inside your local Gemini workspace:

- **[Implementation Plan](file:///C:/Users/hp/.gemini/antigravity/brain/a08790f8-5273-406f-bb01-466954a92d2f/implementation_plan.md)**: Details the physical structure, database column types, and file layouts.
- **[Technical Walkthrough Guide](file:///C:/Users/hp/.gemini/antigravity/brain/a08790f8-5273-406f-bb01-466954a92d2f/walkthrough.md)**: Explains the sequence flows of REST API requests, how Axios triggers backend validation mappings, and database persistency flows.

Enjoy learning and coding! If you have any questions or need custom adjustments, simply ask in the chat.
