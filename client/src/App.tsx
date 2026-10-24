import { Routes, Route } from "react-router";
import RequireAuth from "./components/auth/RequireAuth";

import Layout from "./components/Layout";
import DashboardLayout from "./components/admin/DashboardLayout";
import UserLayout from "./components/user/UserLayout";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import UserHome from "./pages/user/UserHome";
import Dashboard from "./pages/admin/Dashboard";
import EditUserPage from "./pages/admin/EditUserPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<RequireAuth role="user" />}>
        <Route path="/app" element={<UserLayout />}>
          <Route index element={<UserHome />} />
        </Route>
      </Route>

      <Route element={<RequireAuth role="admin" />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users/:userId/edit" element={<EditUserPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
