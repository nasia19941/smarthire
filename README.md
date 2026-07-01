# SmartHire

AI-powered recruitment platform built with Spring Boot and React.

## Tech Stack

**Backend**
- Java 21 + Spring Boot 3.5
- Spring Security + JWT Authentication
- Spring Data JPA + PostgreSQL
- Gemini AI API (CV scoring)
- Swagger/OpenAPI documentation

**Database**
- PostgreSQL (Docker)

## Prerequisites

- Java 21+
- Maven
- Docker

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/nasia19941/smarthire.git
cd smarthire
```

### 2. Configure application properties
```bash
cp src/main/resources/application.properties.example src/main/resources/application.properties
```
Edit `application.properties` and fill in your values:
- Database credentials
- JWT secret
- Gemini API key

### 3. Start PostgreSQL with Docker
```bash
docker run --name smarthire-db \
  -e POSTGRES_DB=smarthire \
  -e POSTGRES_USER=smarthire_user \
  -e POSTGRES_PASSWORD=smarthire123 \
  -p 5432:5432 \
  -d postgres:16
```

### 4. Build and Run
```bash
./mvnw spring-boot:run
```

The application will start on `http://localhost:8080`

## API Documentation

Swagger UI available at: http://localhost:8080/swagger-ui/index.html

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and get JWT token |

### Companies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/companies | Get all companies |
| POST | /api/companies | Create company |
| GET | /api/companies/{id} | Get company by id |
| PUT | /api/companies/{id} | Update company |
| DELETE | /api/companies/{id} | Delete company |

### Job Postings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/jobposting | Get all job postings |
| POST | /api/jobposting | Create job posting |
| GET | /api/jobposting/{id} | Get job posting by id |
| PUT | /api/jobposting/{id} | Update job posting |
| DELETE | /api/jobposting/{id} | Delete job posting |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/application | Get all applications |
| POST | /api/application | Submit application (triggers AI scoring) |
| GET | /api/application/{id} | Get application by id |
| PUT | /api/application/{id} | Update application |
| PUT | /api/application/{id}/status | Update application status |
| DELETE | /api/application/{id} | Delete application |

## AI Features

When a candidate submits an application, the system automatically:
1. Extracts job requirements from the job posting
2. Analyzes the CV against the requirements using Google Gemini AI
3. Returns a match score (0-100) and a brief summary

## Roles

| Role | Permissions |
|------|-------------|
| ADMIN | Full system access |
| HR_MANAGER | Manage job postings, view applications |
| CANDIDATE | Browse jobs, submit applications |

## Author

Athanasia Tsiama — Coding Factory 9 @ AUEB