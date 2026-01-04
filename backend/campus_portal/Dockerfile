# -------- Build stage --------
FROM maven:3.9.9-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy only pom first for dependency caching
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build jar (skip tests)
RUN mvn clean package -DskipTests

# -------- Run stage --------
FROM eclipse-temurin:17-jre

# Set working directory
WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/campus_portal-0.0.1-SNAPSHOT.jar app.jar

# Expose port your app runs on
EXPOSE 8090

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]
