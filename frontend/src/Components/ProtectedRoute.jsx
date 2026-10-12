import { Navigate, Outlet } from "react-router-dom";

import React from 'react'

export const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    if(!token){
        return <Navigate to="/login" replace/>
    }
    return <Outlet/>
}

export default ProtectedRoute;

// ProtectedRoute: notes
// What it is: A guard component. It checks whether the user has a token before showing a page. No token means redirect to login.
// The code, line by line:
// No token means the user isn’t logged in, so send them to /login. replace removes the blocked page from history, so the Back button won’t return to it.

// jsx
// return <Outlet />;

// Token found, so let them through. Outlet is a placeholder that renders whichever child route matched (Layout, Dashboard, etc.).

// Flow in one line:

// Open /dashboard → token? → yes: show page
//                          → no: redirect to /login

// When to use: Any page that needs a logged-in user (dashboard, files, notes, tasks, settings).

// How you use it: Wrap the protected routes once, and every page inside is protected:

// jsx
// <Route element={<ProtectedRoute />}>
//   <Route path="/dashboard" element={<Dashboard />} />
// </Route>

// One mistake to remember: It only checks that a token exists, not that it’s valid. A fake token would pass this guard. The real security is the backend, which rejects invalid tokens with 401.

// Key terms:

// Navigate redirects to another URL
// Outlet renders the child route
// localStorage browser storage that survives refresh