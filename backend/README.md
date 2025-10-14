# Aid Locator Backend

Spring Boot backend service for the Aid Locator application. This is a **Maven child module** that inherits configuration from the parent `aid-locator` project.

## Technology Stack

- Java 17
- Spring Boot 3.3.5
- Maven Multi-Module (Child Module)
- Spring Web
- Spring Boot Actuator

## Project Structure

This backend is part of a Maven parent-child project:
- **Parent**: `aid-locator` (root directory)
- **Child**: `aid-locator-backend` (this module)
- **Inherits**: Dependency versions, repository configuration, and build plugins from parent

## Getting Started

### Prerequisites
- Java 17
- Maven 3.6+

### Running the Application

**Recommended**: Use NPM scripts from root directory:
```bash
# From root directory (uses parent Maven project)
npm run start:backend
```

**Alternative**: Use Maven directly:
```bash
# From root directory (recommended)
mvn spring-boot:run -pl backend -s settings.xml

# From backend directory
mvn spring-boot:run -s ../settings.xml
```

The backend service will start on port 8080.

**Note**: Always use `-s settings.xml` (or `../settings.xml` from backend dir) due to custom Maven repository configuration for corporate network compatibility.

### API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/info` - Application information
- `GET /actuator/health` - Spring Boot Actuator health endpoint

### Building the Application

**Recommended**: Use NPM scripts from root directory:
```bash
# Build entire project (parent + backend module)
npm run build:backend
```

**Alternative**: Use Maven directly:
```bash
# From root directory (builds parent + all modules)
mvn clean package -s settings.xml

# From root directory (build only backend module) 
mvn clean package -pl backend -s settings.xml

# From backend directory
mvn clean package -s ../settings.xml
```

### Running Tests

**Recommended**: Use NPM scripts from root directory:
```bash
npm run test:backend
```

**Alternative**: Use Maven directly:
```bash
# From root directory
mvn test -pl backend -s settings.xml

# From backend directory  
mvn test -s ../settings.xml
```

## Maven Module Information

- **Group ID**: `com.aidlocator`
- **Artifact ID**: `aid-locator-backend` 
- **Parent**: `aid-locator:1.0.0`
- **Inherits**: Spring Boot version, Java version, repositories, and plugin configuration
- **Custom Settings**: Uses `../settings.xml` for Maven repository configuration

# Swagger
http://localhost:8080/swagger-ui/index.html#/

