// New code explanations:

// 1. useState
// const [status, setStatus] = useState("checking");
// Tracks the authentication status.
// "checking"       → Token validation is in progress.
// "authenticated"  → Token is valid.
// "unauthenticated"→ Token is missing, expired, or invalid.
// "error"           → Server could not be reached.

// 2. useEffect
// Runs the token validation when ProtectedRoute mounts.
// This prevents protected pages from rendering before validation finishes.

// 3. Read the token
// const token = localStorage.getItem("token");
// Retrieves the saved JWT from browser storage.

// 4. cancelled
// let cancelled = false;
// Prevents an asynchronous response from updating state
// after the component has unmounted.

// 5. Check for a missing token
// if (!token) {
//   setStatus("unauthenticated");
//   return;
// }
// If there is no token, authentication fails immediately.

// 6. Validate with the backend
// fetch("/api/auth/me", ...)
// Sends the JWT to the backend.
// Authorization: `Bearer ${token}`
// The backend verifies whether the token is valid and not expired.

// 7. Handle an invalid token
// if (!response.ok)
// Removes the saved token and user data, then marks the session
// as unauthenticated. The user is redirected to /login.

// 8. Handle a valid token
// setStatus("authenticated");
// Allows the protected route to render.

// 9. Handle network errors
// catch { setStatus("error"); }
// If the server is unreachable, shows an error and retry option.
// It does not delete the token because the session's validity
// could not be determined.

// 10. Cleanup
// return () => { cancelled = true; };
// Prevents state updates from an outdated request.

// 11. Loading screen
// if (status === "checking")
// Displays "Verifying your session..." while validation runs.
// This avoids briefly showing protected content before validation.

// 12. Redirect
// if (status === "unauthenticated")
// Navigate sends the user to /login.
// replace prevents the blocked route from remaining as the
// current history entry.

// 13. Server error screen
// if (status === "error")
// Displays an error message and a retry button.
// Clicking retry reloads the page and starts validation again.

// 14. Render protected content
// return <Outlet />;
// Runs only after the backend confirms the token is valid.

// Important distinction:
// localStorage only stores the token; it does not validate it.
// The backend must verify the JWT signature and expiration.
// ProtectedRoute controls frontend navigation, while backend
// authorization protects the actual API data.
import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const ProtectedRoute = () => {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const token = localStorage.getItem("token");
    let cancelled = false;

    if (!token) {
      setStatus("unauthenticated");
      return;
    }

    async function validateToken() {
      try {
        const response = await fetch(
          "https://linkpad-q82m.onrender.com/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (cancelled) return;

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setStatus("unauthenticated");
          return;
        }

        setStatus("authenticated");
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    validateToken();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-400">
        Verifying your session...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
        <p>Unable to connect to LinkPad's server.</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          type="button"
        >
          Try again
        </button>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;

// ProtectedRoute: notes
// What it is: A guard component. It checks whether the user has a valid token before showing a page. No token means redirect to login.
// The code, line by line:
// No token means the user isn’t logged in, so send them to /login. replace removes the blocked page from history, so the Back button won’t return to it.

// jsx
// return <Outlet />;

// Token is valid, so let them through. Outlet is a placeholder that renders whichever child route matched (Layout, Dashboard, etc.).

// Flow in one line:

// Open /dashboard → token? → yes: validate with backend → valid: show page
//                          → no: redirect to /login
//                          → expired/invalid: clear session and redirect to /login

// When to use: Any page that needs a logged-in user (dashboard, files, notes, tasks, settings).

// How you use it: Wrap the protected routes once, and every page inside is protected:

// jsx
// <Route element={<ProtectedRoute />}>
//   <Route path="/dashboard" element={<Dashboard />} />
// </Route>

// One mistake to remember: Checking only whether a token exists is insufficient. This guard asks the backend to validate it. The backend must reject expired or invalid tokens with 401.

// Key terms:

// Navigate redirects to another URL
// Outlet renders the child route
// localStorage browser storage that survives refresh
// useEffect validates the session when the guard mounts