# LinkPad — System Architecture

## 1. Architecture Goal

The architecture of LinkPad should provide a clear separation between:

* User interface
* API handling
* Business logic
* Data persistence
* File storage

The system should remain simple enough to develop and maintain while allowing the application to grow in the future.

---

## 2. High-Level Architecture

The initial architecture will follow a client-server model.

```text id="xq0f3k"
                  ┌──────────────────┐
                  │   LinkPad Client  │
                  │  React Frontend   │
                  └────────┬─────────┘
                           │
                         HTTPS
                           │
                  ┌────────▼─────────┐
                  │   LinkPad API    │
                  │ Node.js/Express  │
                  └────────┬─────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
      ┌───────▼────────┐       ┌───────▼────────┐
      │   PostgreSQL   │       │  File Storage  │
      │ Structured Data│       │     Files      │
      └────────────────┘       └────────────────┘
```

---

## 3. Frontend

The frontend is responsible for the user interface.

It will handle:

* Registration
* Login
* Dashboard
* File management
* Notes
* Tasks
* Search and filtering
* User interactions
* Form validation
* Displaying API responses
* Uploading files

The frontend should not contain business rules that belong to the backend.

---

## 4. Backend API

The backend acts as the central application layer.

It will handle:

* Authentication
* Authorization
* Request validation
* Business logic
* File operations
* Notes operations
* Task operations
* Database communication
* Error handling

The backend will expose APIs that the frontend consumes.

Example:

```text id="e0bhkn"
React Frontend
      │
      │ HTTP Request
      ▼
Express API
      │
      ▼
Business Logic
      │
      ├──────────────► PostgreSQL
      │
      └──────────────► File Storage
```

---

## 5. Authentication Layer

Authentication will sit in front of protected application functionality.

Conceptually:

```text id="5ajl9h"
Client
  ↓
Authentication
  ↓
Identify User
  ↓
Authorization
  ↓
Application Logic
```

The backend must identify the authenticated user before accessing user-owned resources.

For example:

```text id="gq4s3b"
GET /files

Authenticated User
        ↓
Identify user_id
        ↓
Retrieve files belonging to user_id
```

A request must never be allowed to access another user's resources simply by changing an ID in the request.

---

## 6. Business Logic

Business logic will be separated from HTTP-specific handling where practical.

For example:

```text id="t8j2dq"
Request
   ↓
Controller
   ↓
Service
   ↓
Repository / Data Access
   ↓
Database
```

The responsibilities are:

### Controller

Handles HTTP-specific concerns.

### Service

Contains application and business logic.

### Repository / Data Access

Handles communication with the database.

This separation should make the system easier to test and maintain.

---

## 7. Database

The relational database will store structured application information.

Expected entities include:

```text id="w1v7as"
User
File Metadata
Note
Task
Session / Authentication Data
```

The actual schema and relationships will be designed separately in the database-design phase.

The database should not be responsible for storing application files unless the final storage analysis determines that this is appropriate.

---

## 8. File Storage

Uploaded files will be handled separately from structured database records.

Conceptually:

```text id="3l0m8h"
Uploaded File
     │
     ├──────────────► File Storage
     │
     └──────────────► PostgreSQL
                       │
                       └── File Metadata
```

For example, PostgreSQL may store:

```text id="9l6n5u"
file_id
user_id
file_name
file_size
mime_type
storage_reference
created_at
```

while the actual file contents are stored in the selected file-storage system.

The exact storage technology will be decided after evaluating the available options.

---

## 9. Cross-Device Access

Devices do not communicate directly with each other in the initial architecture.

Instead, they communicate with LinkPad's backend.

```text id="7q4kcr"
Phone
   │
   ▼
LinkPad API
   │
   ▼
User's Data
   ▲
   │
Laptop
```

This means the user's account is the central source of truth.

If a user uploads a file from a phone, the file becomes associated with the user's account.

When the same user logs in from a laptop, the backend retrieves that user's files.

---

## 10. Initial Communication Model

The initial version will use HTTP/HTTPS APIs.

Example:

```text id="a4s6v8"
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout

GET    /api/v1/files
POST   /api/v1/files
GET    /api/v1/files/:id
DELETE /api/v1/files/:id

GET    /api/v1/notes
POST   /api/v1/notes
PATCH  /api/v1/notes/:id
DELETE /api/v1/notes/:id

GET    /api/v1/tasks
POST   /api/v1/tasks
PATCH  /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
```

These endpoints are preliminary examples.

The complete API contract will be designed separately.

---

## 11. Real-Time Communication

Real-time communication is intentionally excluded from the initial architecture.

The initial system does not require:

```text id="p9l1t0"
WebSockets
Real-time collaboration
Live device synchronization
```

If a future requirement requires immediate updates across devices, real-time communication can be introduced as an architectural extension.

This prevents unnecessary complexity in the MVP.

---

## 12. Architectural Principle

The initial architecture follows a simple principle:

> **Keep the core system simple, separate responsibilities clearly, and introduce additional infrastructure only when a real requirement justifies it.**

The architecture should evolve as LinkPad evolves rather than starting with unnecessary complexity.
