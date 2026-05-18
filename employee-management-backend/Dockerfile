# =========================================================================
# Stage 1: Build the application using Maven
# =========================================================================
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml file to download dependencies first (leveraging Docker cache)
COPY pom.xml .

# Download dependencies offline to optimize build speed on future builds
RUN mvn dependency:go-offline -B

# Copy the source code
COPY src ./src

# Build the application and package it as a JAR, skipping tests for faster deployment
RUN mvn clean package -DskipTests

# =========================================================================
# Stage 2: Create the lightweight runtime environment
# =========================================================================
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=build /app/target/employee-management-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 (Render will bind this automatically using the PORT env var)
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
