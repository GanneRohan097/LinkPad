# LinkPad

### Your Personal Cross-Device Workspace

**One workspace. Every device. Everything in sync.**

LinkPad is a cross-device productivity platform that allows users to securely store and access their files, notes, and tasks from anywhere using a single account.

Instead of relying on cables, messaging applications, or multiple storage services, LinkPad provides a centralized workspace accessible across devices.

---

## Features

### File Management
- Upload and manage personal files.
- View uploaded files in one centralized workspace.
- Download and delete files.
- Access files across multiple devices using the same account.

### Notes Management
- Create and organize personal notes.
- Access notes across devices.
- Keep important information in one place.

### Task Management
- Create and manage personal tasks.
- Track pending and completed tasks.
- Organize daily activities.

### Cross-Device Access
- Access your workspace from different devices.
- Secure account-based authentication.
- Manage connected devices.

### Storage Management
- Monitor storage consumption.
- View used and available storage.
- Keep track of uploaded files.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Authentication | JWT |
| File Storage | Supabase Storage |
| API Testing | Postman |
| Version Control | Git, GitHub |

---

## System Architecture

LinkPad follows a layered backend architecture to maintain separation of concerns, scalability, and maintainability.

    Frontend
    React.js
       |
       | REST API
       |
    Backend Server
    Node.js + Express
       |
       ├── Routes
       |
       ├── Controllers
       |
       ├── Services
       |
       └── Repositories
              |
         ┌────┴────┐
         |         |
      PostgreSQL  Supabase
      Database    Storage

---

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm
- PostgreSQL
- Supabase account

### 1. Clone the Repository

    git clone <https://github.com/GanneRohan097/LinkPad.git>
    cd LinkPad

### 2. Install Dependencies

**Backend:**

    cd backend
    npm install

**Frontend:**

    cd frontend
    npm install

### 3. Configure Environment Variables

Create a `.env` file inside the backend directory.

    PORT=5000
    DATABASE_URL=your_postgresql_connection_string
    JWT_SECRET=your_jwt_secret

    SUPABASE_URL=your_supabase_url
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

Never commit your `.env` file or expose secret credentials.

### 4. Start the Backend

    cd backend
    npm run dev

### 5. Start the Frontend

    cd frontend
    npm run dev

---

## Project Structure

    LinkPad/
    |
    |-- frontend/
    |   |-- src/
    |   |   |-- components/
    |   |   |-- pages/
    |   |   |-- services/
    |   |   |-- App.jsx
    |   |-- package.json
    |
    |-- backend/
    |   |-- routes/
    |   |-- controllers/
    |   |-- services/
    |   |-- repositories/
    |   |-- middleware/
    |   |-- config/
    |   |-- server.js
    |
    |-- README.md

---

## Security

- JWT-based authentication.
- Protected API endpoints.
- Environment-based secret management.
- Account-specific access to personal resources.
- Secure handling of user credentials.

---

## Project Objective

The goal of LinkPad is to simplify personal file management and productivity by bringing essential digital resources into a single, accessible workspace.

Rather than building another cloud storage application, LinkPad aims to combine file management, note-taking, and task management into one unified cross-device experience.

---

## Author

**Ganne Rohan**

B.Tech Computer Science and Engineering

GitHub: [@GanneRohan097](https://github.com/GanneRohan097)

---

Built with React.js, Node.js, and PostgreSQL.
