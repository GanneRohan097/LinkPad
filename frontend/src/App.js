import { Routes, Route, Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Components/layout/Sidebar";
import MobileNavbar from "./Components/layout/MobileNavbar";
import Dashboard from "./pages/Dashboard";
import FilesPage from "./pages/Files";
import Notes from "./pages/Notes";
import Tasks from "./pages/Tasks";
import Devices from "./pages/Devices";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";

const PATHS = {
  Dashboard: "/dashboard",
  Files: "/files",
  Notes: "/notes",
  Tasks: "/tasks",
  Devices: "/devices",
  Settings: "/settings",
};

function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // find the page name from the current URL
  const page = Object.keys(PATHS).find((name) => PATHS[name] === pathname) || "Dashboard";
  const goTo = (name) => navigate(PATHS[name]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Sidebar activePage={page} onNavigate={goTo} />
      <div className="min-h-screen lg:pl-64">
        <main className="mx-auto max-w-[1440px] px-4 py-7 pb-24 sm:px-7 sm:py-8 lg:px-9">
          <Outlet />
        </main>
      </div>
      <MobileNavbar activePage={page} onNavigate={goTo} />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* pages without the sidebar layout */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>} />
      {/* pages inside the layout */}
       <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/files" element={<FilesPage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;