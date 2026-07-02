# SmartHire 🚀

AI-powered recruitment platform built with Spring Boot and React.
Final project for Coding Factory 10 @ AUEB.

## Tech Stack

**Backend**
- Java 21 + Spring Boot 3.5
- Spring Security + JWT Authentication
- Spring Data JPA + PostgreSQL
- Google Gemini AI API (CV scoring)
- Swagger/OpenAPI documentation
- Mockito Unit Tests

**Frontend**
- React 18
- React Router
- Axios

**Infrastructure**
- PostgreSQL 16 (Docker)
- Docker + Docker Compose

## Domain Model
Company (1) ──── (N) JobPosting
User    (1) ──── (N) Application
JobPosting (1) ── (N) Application

**Roles:** ADMIN | HR_MANAGER | CANDIDATE

## Prerequisites

- Java 21+
- Maven
- Docker Desktop
- Node.js 18+

## Getting Started

### Option A — Docker Compose (recommended)

```bash
git clone https://github.com/nasia19941/smarthire.git
cd smarthire
cp src/main/resources/application.properties.example src/main/resources/application.properties
docker-compose up --build
```

App runs at `http://localhost:8080`

### Option B — Manual Setup

**1. Clone the repository**
```bash
git clone https://github.com/nasia19941/smarthire.git
cd smarthire
```

**2. Configure application properties**
```bash
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

**3. Start PostgreSQL with Docker**
```bash
docker run --name smarthire-db \
  -e POSTGRES_DB=smarthire \
  -e POSTGRES_USER=smarthire_user \
  -e POSTGRES_PASSWORD=smarthire123 \
  -p 5432:5432 \
  -d postgres:16
```

**4. Run the backend**
```bash
./mvnw spring-boot:run
```

**5. Run the frontend**
```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`

## Run Tests

```bash
./mvnw test
```

**Test coverage:**
- `JwtUtilTest` — token generation, validation (4 tests)
- `ApplicationServiceImplTest` — AI scoring, status update (3 tests)
- `SmartHireMapperTest` — entity to DTO mapping (4 tests)

## API Documentation

Swagger UI: `http://localhost:8080/swagger-ui/index.html`

## API Endpoints

### Authentication (public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register (always CANDIDATE role) |
| POST | /api/auth/login | Login and get JWT token |

### Companies
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | /api/companies | Any |
| POST | /api/companies | Authenticated |
| PUT | /api/companies/{id} | Authenticated |
| DELETE | /api/companies/{id} | ADMIN |

### Job Postings
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | /api/jobposting | Any |
| POST | /api/jobposting | HR_MANAGER, ADMIN |
| PUT | /api/jobposting/{id} | HR_MANAGER, ADMIN |
| DELETE | /api/jobposting/{id} | HR_MANAGER, ADMIN |

### Applications
| Method | Endpoint | Auth |
|--------|----------|------|
| POST | /api/application | Authenticated |
| GET | /api/application | HR_MANAGER, ADMIN |
| GET | /api/application/{id} | Authenticated |
| PUT | /api/application/{id}/status | HR_MANAGER, ADMIN |
| DELETE | /api/application/{id} | Authenticated |

### Users
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | /api/users | Authenticated |
| GET | /api/users/{id} | Authenticated |
| PUT | /api/users/{id} | Authenticated |
| DELETE | /api/users/{id} | ADMIN |

## AI Feature

When a candidate submits an application, the system automatically:
1. Loads the job requirements from the JobPosting
2. Sends CV text + requirements to Google Gemini AI
3. Returns a match score (0-100) and analysis summary
4. Stores results in the Application entity

## Roles & Authorization

| Role | Permissions |
|------|-------------|
| ADMIN | Full system access |
| HR_MANAGER | Manage job postings, view all applications, update status |
| CANDIDATE | Browse jobs, submit applications (auto-assigned on register) |

## Author

Athanasia Tsiama — Coding Factory 9 @ AUEB
GitHub: github.com/nasia19941
