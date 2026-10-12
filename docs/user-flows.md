# LinkPad — User Flows

## 1. Registration Flow

```text
User
  ↓
Open LinkPad
  ↓
Registration Page
  ↓
Enter account details
  ↓
Submit
  ↓
Validate details
  ↓
Create account
  ↓
Registration successful
  ↓
Login / Dashboard
```

---

## 2. Login Flow

```text
User
  ↓
Open Login Page
  ↓
Enter credentials
  ↓
Submit
  ↓
Validate credentials
  ↓
Authenticate user
  ↓
Create authenticated session
  ↓
Open Dashboard
```

If authentication fails:

```text
Invalid credentials
      ↓
Show error
      ↓
Remain on Login Page
```

---

## 3. File Upload Flow

```text
User
  ↓
Open Files
  ↓
Select file
  ↓
Upload
  ↓
Validate file
  ↓
Store file
  ↓
Store file metadata
  ↓
Show uploaded file
```

The uploaded file must be associated with the authenticated user's account.

---

## 4. File Download Flow

```text
User
  ↓
Open Files
  ↓
Select file
  ↓
Download
  ↓
Verify user authorization
  ↓
Retrieve file
  ↓
Send file to user
```

A user must not be able to download another user's file.

---

## 5. File Delete Flow

```text
User
  ↓
Select file
  ↓
Delete
  ↓
Confirm deletion
  ↓
Verify authorization
  ↓
Delete file
  ↓
Remove/update metadata
  ↓
Refresh file list
```

---

## 6. Note Creation Flow

```text
User
  ↓
Open Notes
  ↓
Create Note
  ↓
Enter content
  ↓
Save
  ↓
Validate
  ↓
Store note
  ↓
Display note
```

---

## 7. Task Creation Flow

```text
User
  ↓
Open Tasks
  ↓
Create Task
  ↓
Enter task information
  ↓
Save
  ↓
Validate
  ↓
Store task
  ↓
Display task
```

---

## 8. Cross-Device Flow

This is the most important LinkPad flow.

### Device A

```text
Phone
  ↓
Login
  ↓
Upload file
  ↓
Create note
  ↓
Create task
```

The information is stored in LinkPad.

### Device B

```text
Laptop
  ↓
Login with same account
  ↓
Open Dashboard
  ↓
Files available
Notes available
Tasks available
```

The user's information is associated with the account rather than with the individual device.

---

## 9. Unauthorized Access Flow

If a user attempts to access another user's resource:

```text
User Request
     ↓
Authentication Check
     ↓
Identify User
     ↓
Check Resource Ownership
     ↓
Not Owner
     ↓
Reject Request
     ↓
Return Authorization Error
```

This flow will be important when we design the backend and security model later.

---

## 10. Primary Product Flow

The complete core workflow can be summarized as:

```text
             LinkPad
                │
          Authentication
                │
             Dashboard
                │
       ┌────────┼────────┐
       ↓        ↓        ↓
     Files    Notes    Tasks
       │        │        │
       └────────┼────────┘
                │
          Account Storage
                │
       ┌────────┼────────┐
       ↓        ↓        ↓
     Phone    Laptop   Tablet
```

The primary objective is to maintain a consistent personal workspace across authenticated devices.
