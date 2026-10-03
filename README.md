# WhistleDrop

### Anonymous & Confidential Reporting Platform

WhistleDrop is a confidential reporting platform that allows users to submit reports without providing their name, email address, or other personal information.

Each submitted report receives a unique case code that can be used to track its status anonymously. Authorized moderators can securely access submitted reports, review them, and update their status through a protected moderator dashboard.

---

## Features

### Anonymous Report Submission

- Submit a report without creating an account.
- No name or email address is required.
- Select a report category.
- Provide a detailed description of the incident.
- Optionally provide an evidence URL.
- Receive a unique case code after submission.

### Anonymous Report Tracking

Users can track their report using only their case code.

The tracking page displays:

- Case code
- Report category
- Current status
- Submission time
- Last updated time
- Status progression

No user account is required for tracking.

### Moderator Dashboard

Authorized moderators can:

- Log in through a protected moderator interface.
- View submitted reports.
- Filter reports by status.
- Search reports by category.
- View report details.
- Start reviewing reports.
- Resolve reports.
- Dismiss reports.

### Controlled Status Workflow

Reports follow a controlled workflow:

```text
SUBMITTED
     |
     v
UNDER_REVIEW
     |
     +----------+
     |          |
     v          v
 RESOLVED   DISMISSED

Invalid status transitions are rejected by the backend.
For example:
SUBMITTED → RESOLVED

is not allowed.
The report must first move to:
SUBMITTED → UNDER_REVIEW

before it can be resolved or dismissed.
Technology Stack
Backend
- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- Jakarta Validation
- MySQL
- Maven
- SpringDoc OpenAPI / Swagger
Frontend
- React
- Vite
- JavaScript
- React Router
- Axios
- CSS
Architecture
WhistleDrop follows a client-server architecture.
                 ┌──────────────────────┐
                 │      React UI        │
                 │      Vite            │
                 └──────────┬───────────┘
                            │
                            │ HTTP / REST
                            ▼
                 ┌──────────────────────┐
                 │   Spring Boot API    │
                 │                      │
                 │ Controllers          │
                 │ Services             │
                 │ Validation           │
                 │ Security             │
                 └──────────┬───────────┘
                            │
                            │ JPA
                            ▼
                 ┌──────────────────────┐
                 │        MySQL         │
                 │     WhistleDrop      │
                 └──────────────────────┘

Project Structure
WhistleDrop/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── whistledrop/
│   │       │           └── whistledrop/
│   │       │               │
│   │       │               ├── config/
│   │       │               │   ├── OpenApiConfig.java
│   │       │               │   └── WebConfig.java
│   │       │               │
│   │       │               ├── controller/
│   │       │               │   ├── ReportController.java
│   │       │               │   └── ModeratorController.java
│   │       │               │
│   │       │               ├── dto/
│   │       │               │   ├── ReportRequest.java
│   │       │               │   ├── ReportResponse.java
│   │       │               │   ├── StatusUpdateRequest.java
│   │       │               │   └── ErrorResponse.java
│   │       │               │
│   │       │               ├── entity/
│   │       │               │   ├── Report.java
│   │       │               │   └── ReportStatus.java
│   │       │               │
│   │       │               ├── exception/
│   │       │               │   ├── ReportNotFoundException.java
│   │       │               │   ├── InvalidStatusTransitionException.java
│   │       │               │   └── GlobalExceptionHandler.java
│   │       │               │
│   │       │               ├── repository/
│   │       │               │   └── ReportRepository.java
│   │       │               │
│   │       │               ├── security/
│   │       │               │   ├── SecurityConfig.java
│   │       │               │   └── CustomUserDetailsService.java
│   │       │               │
│   │       │               └── service/
│   │       │                   └── ReportService.java
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── package.json
│   └── README.md
│
├── README.md
└── .gitignore

Backend Setup
Requirements
Install the following before running the project:
- Java 17
- Maven
- MySQL
- Node.js and npm
1. Create the MySQL Database
Open MySQL and create the database:
CREATE DATABASE whistledrop;

2. Configure Database Connection
Open:
backend/src/main/resources/application.properties

Configure your local MySQL credentials:
spring.datasource.url=jdbc:mysql://localhost:3306/whistledrop
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

Replace:
YOUR_MYSQL_PASSWORD

with your local MySQL password.

3. Start the Backend
Open a terminal inside the backend directory:
mvn spring-boot:run

The backend runs on:
http://localhost:8080

Frontend Setup
Open another terminal inside the frontend directory.
Install dependencies:
npm install

Start the development server:
npm run dev

Vite will display the local frontend URL in the terminal.
It will normally be:
http://localhost:5173

If that port is already in use, Vite may automatically select another port.
Application Pages
Home
/

Landing page introducing WhistleDrop and its purpose.
Submit Report
/report

Allows users to anonymously submit a confidential report.
Track Report
/track

Allows users to check the status of a report using its case code.
Moderator
/moderator

Protected moderator interface for reviewing and managing reports.
REST API
Public Endpoints
Submit a Report
POST /api/reports

Example request:
{
  "category": "Harassment",
  "description": "Detailed description of the incident.",
  "evidenceUrl": "https://example.com/evidence"
}

Successful submission returns a generated case code.
Track a Report
GET /api/reports/track/{caseCode}

Example:
GET /api/reports/track/MRGAKSYW933B

The endpoint returns the report associated with the provided case code.
Moderator API
Moderator authentication is required for these endpoints.
Get All Reports
GET /api/moderator/reports

Filter Reports by Status
GET /api/moderator/reports/status/{status}

Available statuses:
SUBMITTED
UNDER_REVIEW
RESOLVED
DISMISSED

Filter Reports by Category
GET /api/moderator/reports/category/{category}

Update Report Status
PATCH /api/moderator/reports/{id}/status

Example:
{
  "status": "UNDER_REVIEW"
}

API Documentation
WhistleDrop uses SpringDoc OpenAPI for interactive API documentation.
When the backend is running, open:
http://localhost:8080/swagger-ui/index.html

Swagger can be used to:
- Explore API endpoints
- View request structures
- View response structures
- Test API requests
- Test validation and error responses
- Test protected moderator endpoints
Security
Security is an important part of WhistleDrop because the application handles confidential reports.
Moderator Authentication
Moderator endpoints are protected using:
Spring Security
HTTP Basic Authentication

Only users with the MODERATOR role can access:
/api/moderator/**

Unauthenticated access is rejected by the backend.
Password Protection
Moderator passwords are handled using:
BCryptPasswordEncoder

Passwords should not be stored as plain text in production.
Anonymous Reporting
The report submission API does not require:
- Name
- Email
- Phone number
- User account
The system instead generates a unique case code for each report.
Secure Case Code Generation
Case codes are generated using Java's:
SecureRandom

The generated code is checked against existing case codes before being stored.
This reduces the likelihood of case-code collisions.
Server-Side Validation
Incoming report data is validated using Jakarta Validation.
Examples include:
- Category cannot be blank.
- Category has a maximum length.
- Description cannot be blank.
- Description must contain at least 10 characters.
- Description has a maximum length.
- Evidence URL has a maximum length.
Invalid requests return:
400 Bad Request

Error Handling
WhistleDrop uses a global exception handler to provide structured API errors.
Examples include:
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error

Example error response:
{
  "timestamp": "2026-10-03T10:00:00",
  "status": 400,
  "error": "Validation Error",
  "message": "category: Category is required",
  "path": "/api/reports"
}

Report Status Rules
The backend enforces valid status transitions.
Allowed
SUBMITTED
    ↓
UNDER_REVIEW
    ↓
RESOLVED

or:
SUBMITTED
    ↓
UNDER_REVIEW
    ↓
DISMISSED

Not Allowed
Examples:
SUBMITTED → RESOLVED
SUBMITTED → DISMISSED
RESOLVED → SUBMITTED
RESOLVED → DISMISSED
DISMISSED → SUBMITTED
DISMISSED → RESOLVED

Attempting an invalid transition returns:
400 Bad Request

Testing
The application was manually tested for the following functionality:
Report Submission
- Successful report submission
- Required field validation
- Description length validation
- Case code generation
Report Tracking
- Valid case code lookup
- Invalid case code handling
- Status display
- Status timeline
Moderator Authentication
- Protected moderator endpoints
- Unauthorized access rejection
- Valid moderator authentication
Moderator Dashboard
- Report listing
- Status filtering
- Category filtering
- Report details
- Status updates
Status Workflow
- SUBMITTED → UNDER_REVIEW
- UNDER_REVIEW → RESOLVED
- UNDER_REVIEW → DISMISSED
- Invalid status transitions rejected
API Error Handling
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found
- Validation errors
- Invalid status transitions
Privacy Considerations
WhistleDrop is designed to minimize the personal information collected from reporters.
The reporting interface does not request:
- Name
- Email address
- Phone number
- Personal identification information
- User account registration
Reports are identified using generated case codes.
Users should keep their case code private because it is required to retrieve the associated report through the tracking endpoint.
For a production deployment, additional measures such as rate limiting, audit logging, secure secret management, HTTPS, and stronger authentication should be implemented.
UI Features
The frontend includes:
- Responsive navigation
- Anonymous report submission
- Custom category dropdown
- Custom moderator status dropdown
- Case-code tracking
- Moderator dashboard
- Status timeline
- Dark and light themes
- Adjustable text size
- Responsive mobile navigation
- Interactive visual effects
- Form validation and error states
Future Enhancements
Possible future improvements include:
- Secure evidence file uploads
- Moderator audit logs
- Pagination for large report collections
- Advanced report search
- Automated unit and integration tests
- Production deployment
- Environment-based secret management
- Multiple moderator accounts
- Role-based access control
- Database migration management
- Rate limiting
- HTTPS enforcement
- Improved audit and monitoring capabilities
Running the Complete Application
Start MySQL first.
Then start the backend:
cd backend
mvn spring-boot:run

In another terminal, start the frontend:
cd frontend
npm install
npm run dev

Then open the frontend URL provided by Vite.
The application can then be used in this flow:
Home
  ↓
Submit Report
  ↓
Receive Case Code
  ↓
Track Report
  ↓
Moderator Login
  ↓
Review Report
  ↓
Update Status
  ↓
Track Updated Status

Project Purpose
WhistleDrop was developed as a technical project focused on building a secure and privacy-conscious reporting workflow.
The project demonstrates:
- REST API development
- Spring Boot architecture
- Database persistence
- Authentication and authorization
- Server-side validation
- Exception handling
- Controlled business workflows
- React frontend development
- API integration
- Responsive UI design
- Privacy-focused application design
License
This project was developed as a technical project for the GDG on Campus SRM Recruitments 2026–27.