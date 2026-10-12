# LinkPad — API Design

## 1. API Overview

LinkPad will expose a REST API for communication between the React frontend and Node.js/Express backend.

Base URL:

```text
/api/v1
```

The API will use JSON for normal request and response bodies.

File upload requests will use `multipart/form-data`.

---

## 2. Authentication API

### Register

```http
POST /api/v1/auth/register
```

Purpose:

Create a new LinkPad account.

Request:

```json
{
  "name": "Rohan",
  "email": "rohan@example.com",
  "password": "********"
}
```

Success:

```text
201 Created
```

---

### Login

```http
POST /api/v1/auth/login
```

Purpose:

Authenticate an existing user.

Request:

```json
{
  "email": "rohan@example.com",
  "password": "********"
}
```

Success:

```text
200 OK
```

---

### Logout

```http
POST /api/v1/auth/logout
```

Purpose:

End the authenticated user's session.

Authentication:

Required.

Success:

```text
204 No Content
```

---

## 3. File API

### List Files

```http
GET /api/v1/files
```

Returns files belonging to the authenticated user.

Optional query parameters:

```text
?search=resume
?sort=created_at
```

Authentication:

Required.

---

### Upload File

```http
POST /api/v1/files
```

Content-Type:

```text
multipart/form-data
```

Authentication:

Required.

The uploaded file will be associated with the authenticated user.

Success:

```text
201 Created
```

---

### Get File Information

```http
GET /api/v1/files/:id
```

Returns metadata for a specific file.

Authentication:

Required.

The backend must verify that the requested file belongs to the authenticated user.

---

### Download File

```http
GET /api/v1/files/:id/download
```

Returns the actual file contents.

Authentication:

Required.

The backend must verify file ownership before returning the file.

---

### Delete File

```http
DELETE /api/v1/files/:id
```

Deletes a file owned by the authenticated user.

Success:

```text
204 No Content
```

---

## 4. Notes API

### List Notes

```http
GET /api/v1/notes
```

Returns the authenticated user's notes.

---

### Create Note

```http
POST /api/v1/notes
```

Request:

```json
{
  "title": "Project Idea",
  "content": "Build LinkPad professionally."
}
```

Success:

```text
201 Created
```

---

### Get Note

```http
GET /api/v1/notes/:id
```

Returns a specific note belonging to the authenticated user.

---

### Update Note

```http
PATCH /api/v1/notes/:id
```

Request:

```json
{
  "title": "Updated Title",
  "content": "Updated content."
}
```

---

### Delete Note

```http
DELETE /api/v1/notes/:id
```

Success:

```text
204 No Content
```

---

## 5. Tasks API

### List Tasks

```http
GET /api/v1/tasks
```

Returns the authenticated user's tasks.

---

### Create Task

```http
POST /api/v1/tasks
```

Request:

```json
{
  "title": "Finish LinkPad API",
  "description": "Complete API design",
  "priority": "high",
  "due_date": "2026-10-10T18:00:00Z"
}
```

---

### Get Task

```http
GET /api/v1/tasks/:id
```

Returns a specific task belonging to the authenticated user.

---

### Update Task

```http
PATCH /api/v1/tasks/:id
```

Request:

```json
{
  "title": "Finish LinkPad API",
  "status": "completed"
}
```

---

### Delete Task

```http
DELETE /api/v1/tasks/:id
```

Success:

```text
204 No Content
```

---

# 6. Authentication Rule

All protected endpoints require an authenticated user.

```text
Request
   ↓
Authentication
   ↓
Identify user
   ↓
Authorization
   ↓
Controller
   ↓
Service
   ↓
Database
```

For user-owned resources, the backend must use the authenticated user's identity when querying the database.

The client must not be trusted to provide the owner identity.

---

# 7. HTTP Status Codes

The API will use standard HTTP status codes.

| Status | Meaning                                  |
| ------ | ---------------------------------------- |
| `200`  | Successful request                       |
| `201`  | Resource created                         |
| `204`  | Successful request with no response body |
| `400`  | Invalid request                          |
| `401`  | Not authenticated                        |
| `403`  | Not authorized                           |
| `404`  | Resource not found                       |
| `409`  | Resource conflict                        |
| `422`  | Validation failure                       |
| `500`  | Internal server error                    |

---

# 8. Error Response Format

API errors should use a consistent structure.

Example:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email address"
  }
}
```

The API should not expose internal implementation details, database errors, stack traces, or sensitive information to clients.

---

# 9. API Design Principles

The API should follow these principles:

* Use RESTful resource naming.
* Use appropriate HTTP methods.
* Version the API using `/api/v1`.
* Require authentication for protected resources.
* Enforce resource ownership on the backend.
* Validate all client input.
* Return consistent error responses.
* Never trust client-provided ownership information.
* Keep controllers, business logic, and database access separated.
