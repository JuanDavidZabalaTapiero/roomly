import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import DashboardNotFound from "./pages/dashboard/DashboardNotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<DashboardNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
