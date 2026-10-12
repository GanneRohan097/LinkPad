# LinkPad — Database Schema Design

## 1. Database Choice

LinkPad will use **PostgreSQL** as its relational database.

PostgreSQL will store:

* User accounts
* File metadata and file contents
* Notes
* Tasks

The initial MVP will keep the architecture simple by storing uploaded file data directly in PostgreSQL.

---

## 2. Entity Relationship

```text
                    users
                      │
          ┌───────────┼───────────┐
          │           │           │
          │           │           │
          ▼           ▼           ▼
        files       notes       tasks
```

Relationships:

```text
users 1 ──── N files
users 1 ──── N notes
users 1 ──── N tasks
```

A user can have many files, notes, and tasks.

Each file, note, and task belongs to exactly one user.

---

# 3. Users Table

The `users` table stores LinkPad account information.

| Column          | Type         | Constraints      | Purpose                |
| --------------- | ------------ | ---------------- | ---------------------- |
| `id`            | UUID         | Primary Key      | Unique user identifier |
| `name`          | VARCHAR(100) | NOT NULL         | User's display name    |
| `email`         | VARCHAR(255) | NOT NULL, UNIQUE | Login email            |
| `password_hash` | TEXT         | NOT NULL         | Secure password hash   |
| `created_at`    | TIMESTAMPTZ  | NOT NULL         | Account creation time  |
| `updated_at`    | TIMESTAMPTZ  | NOT NULL         | Last account update    |

### Design Notes

`email` must be unique so that multiple accounts cannot be created using the same email address.

The application must never store plaintext passwords.

Only the password hash will be stored.

---

# 4. Files Table

The `files` table stores uploaded file information and the actual file contents.

| Column       | Type         | Constraints           | Purpose                |
| ------------ | ------------ | --------------------- | ---------------------- |
| `id`         | UUID         | Primary Key           | Unique file identifier |
| `user_id`    | UUID         | NOT NULL, Foreign Key | File owner             |
| `file_name`  | VARCHAR(255) | NOT NULL              | Original file name     |
| `mime_type`  | VARCHAR(100) | NOT NULL              | File type              |
| `file_size`  | BIGINT       | NOT NULL              | File size in bytes     |
| `file_data`  | BYTEA        | NOT NULL              | Actual file contents   |
| `created_at` | TIMESTAMPTZ  | NOT NULL              | Upload time            |

Relationship:

```text
files.user_id → users.id
```

### Design Notes

The `file_data` column uses PostgreSQL's `BYTEA` type to store binary file contents.

`file_size` is stored explicitly so the application does not need to calculate it every time the file list is displayed.

`mime_type` allows the application to identify the type of file when downloading or displaying information about it.

---

# 5. Notes Table

The `notes` table stores personal notes.

| Column       | Type         | Constraints             | Purpose                    |
| ------------ | ------------ | ----------------------- | -------------------------- |
| `id`         | UUID         | Primary Key             | Unique note identifier     |
| `user_id`    | UUID         | NOT NULL, Foreign Key   | Note owner                 |
| `title`      | VARCHAR(255) | NOT NULL                | Note title                 |
| `content`    | TEXT         | NOT NULL                | Note contents              |
| `is_pinned`  | BOOLEAN      | NOT NULL, DEFAULT FALSE | Whether the note is pinned |
| `created_at` | TIMESTAMPTZ  | NOT NULL                | Creation time              |
| `updated_at` | TIMESTAMPTZ  | NOT NULL                | Last modification time     |

Relationship:

```text
notes.user_id → users.id
```

---

# 6. Tasks Table

The `tasks` table stores personal tasks.

| Column        | Type         | Constraints           | Purpose                     |
| ------------- | ------------ | --------------------- | --------------------------- |
| `id`          | UUID         | Primary Key           | Unique task identifier      |
| `user_id`     | UUID         | NOT NULL, Foreign Key | Task owner                  |
| `title`       | VARCHAR(255) | NOT NULL              | Task title                  |
| `description` | TEXT         | Optional              | Additional task information |
| `status`      | VARCHAR(20)  | NOT NULL              | Task state                  |
| `priority`    | VARCHAR(20)  | NOT NULL              | Task priority               |
| `due_date`    | TIMESTAMPTZ  | Optional              | Task deadline               |
| `created_at`  | TIMESTAMPTZ  | NOT NULL              | Creation time               |
| `updated_at`  | TIMESTAMPTZ  | NOT NULL              | Last modification time      |

Relationship:

```text
tasks.user_id → users.id
```

### Initial Status Values

```text
pending
completed
```

### Initial Priority Values

```text
low
medium
high
```

These values will be validated by the backend and database constraints where appropriate.

---

# 7. Foreign Key Relationships

The database will enforce ownership relationships using foreign keys.

```text
users.id
   │
   ├────────── files.user_id
   │
   ├────────── notes.user_id
   │
   └────────── tasks.user_id
```

This prevents resources from referencing users that do not exist.

---

# 8. Deletion Behavior

When a user is permanently deleted, their associated files, notes, and tasks should also be removed.

Conceptually:

```text
Delete User
     │
     ├── Delete user's files
     ├── Delete user's notes
     └── Delete user's tasks
```

This can be implemented using foreign-key cascading behavior.

The application must ensure that deletion behavior does not accidentally remove resources belonging to another user.

---

# 9. Indexing

The initial database should include indexes for frequently queried fields.

Important indexes include:

```text
users.email
files.user_id
files.created_at
notes.user_id
tasks.user_id
tasks.status
```

The `users.email` index is particularly important because login requires finding a user by email.

The ownership indexes improve queries such as:

```sql
SELECT *
FROM files
WHERE user_id = ?;
```

Similar queries will be used for notes and tasks.

Additional indexes should only be added when justified by actual query patterns or performance measurements.

---

# 10. Data Ownership Model

The fundamental database rule is:

```text
One User
   │
   ├── Owns Files
   ├── Owns Notes
   └── Owns Tasks
```

The backend will always obtain the authenticated user's identity and use it when accessing resources.

For example:

```text
Authenticated User
        ↓
      user_id
        ↓
SELECT files
WHERE user_id = authenticated_user_id;
```

A client must not be trusted to decide which user's data it can access.

---

# 11. Initial Schema Summary

```text
┌──────────────────────┐
│        users         │
├──────────────────────┤
│ id PK                │
│ name                 │
│ email UNIQUE         │
│ password_hash        │
│ created_at           │
│ updated_at           │
└──────────┬───────────┘
           │
     ┌─────┼─────┐
     │     │     │
     ▼     ▼     ▼
┌────────┐ ┌────────┐ ┌────────┐
│ files  │ │ notes  │ │ tasks  │
├────────┤ ├────────┤ ├────────┤
│ id PK  │ │ id PK  │ │ id PK  │
│ user_id│ │ user_id│ │ user_id│
│ ...    │ │ ...    │ │ ...    │
└────────┘ └────────┘ └────────┘
```

This schema is intentionally limited to the current MVP.

No device-pairing, sharing, collaboration, notification, or real-time-specific tables are required at this stage.
