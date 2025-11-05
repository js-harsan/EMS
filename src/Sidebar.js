import React, { useState, useEffect } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeFormModal from "./EmployeeFormModal";
import LeaveAttendance from "./LeaveAttendance";
import ApproveRequest from "./ApproveRequest";
import AdminDashboard from "./AdminDashboard";
import ViewLeaves from "./ViewLeaves";
import "./Sidebar.css";

export default function Sidebar({ user, onLogout }) {
  const EMP_API = "http://localhost:8080/api/employees";
  const LEAVE_API = "http://localhost:8080/api/leaves";

  const [activePage, setActivePage] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showAddPage, setShowAddPage] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]); // ✅ NEW
  const [editingEmployee, setEditingEmployee] = useState(null);

  // === Set default page based on user role ===
  useEffect(() => {
    if (user?.role === "admin") setActivePage("dashboard");
    else if (user?.role === "employee") setActivePage("applyLeave");
  }, [user]);

  // === Fetch employees & leave requests on load ===
  useEffect(() => {
    fetchEmployees();
    fetchLeaveRequests();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(EMP_API);
      if (!res.ok) throw new Error("Failed to fetch employees");
      setEmployees(await res.json());
    } catch (err) {
      console.error("❌ Error fetching employees:", err);
    }
  };

  const fetchLeaveRequests = async () => {
    try {
      const res = await fetch(LEAVE_API);
      if (!res.ok) throw new Error("Failed to fetch leave requests");
      setLeaveRequests(await res.json());
    } catch (err) {
      console.error("❌ Error fetching leave requests:", err);
    }
  };

  // === Add / Update Employee ===
  const handleSaveEmployee = async (emp) => {
    try {
      const isUpdate = !!emp.id;
      const url = isUpdate ? `${EMP_API}/${emp.id}` : EMP_API;
      const res = await fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emp),
      });
      if (!res.ok) throw new Error("Failed to save employee");
      const savedEmp = await res.json();

      setEmployees((prev) =>
        isUpdate
          ? prev.map((e) => (e.id === savedEmp.id ? savedEmp : e))
          : [...prev, savedEmp]
      );

      setShowAddPage(false);
      setEditingEmployee(null);
    } catch (err) {
      console.error("❌ Error saving employee:", err);
    }
  };

  // === Delete Employee ===
  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      const res = await fetch(`${EMP_API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete employee");
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error("❌ Error deleting employee:", err);
    }
  };

  // === Edit Employee ===
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowAddPage(true);
  };

  // === Dark Mode Toggle ===
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  // === Page Renderer ===
  const renderContent = () => {
    if (showAddPage) {
      return (
        <EmployeeFormModal
          onClose={() => setShowAddPage(false)}
          onSave={handleSaveEmployee}
          employee={editingEmployee}
        />
      );
    }

    switch (activePage) {
      case "dashboard":
        return (
          <AdminDashboard
            employees={employees}
            leaveRequests={leaveRequests} // ✅ pass latest leaves
          />
        );
      case "employees":
        return (
          <EmployeeTable
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />
        );
      case "requests":
        return (
          <ApproveRequest
            employees={employees}
            onStatusChange={fetchLeaveRequests} // ✅ refresh dashboard after approve/reject
          />
        );
      case "applyLeave":
        return <LeaveAttendance />;
      case "viewLeaves":
        return <ViewLeaves />;
      default:
        return (
          <AdminDashboard
            employees={employees}
            leaveRequests={leaveRequests}
          />
        );
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <aside className="sidebar">
        <h2 className="sidebar-title">EMS</h2>
        <p className="welcome">
          Welcome, <b>{user?.username}</b>
        </p>

        <nav className="sidebar-nav">
          {user?.role === "employee" && (
            <div className="nav-section">
              <button
                className={activePage === "applyLeave" ? "active" : ""}
                onClick={() => setActivePage("applyLeave")}
              >
                🗓️ Apply Leave
              </button>
              <button
                className={activePage === "viewLeaves" ? "active" : ""}
                onClick={() => setActivePage("viewLeaves")}
              >
                📋 View Leaves
              </button>
            </div>
          )}

          {user?.role === "admin" && (
            <div className="nav-section">
              <button
                className={activePage === "dashboard" ? "active" : ""}
                onClick={() => setActivePage("dashboard")}
              >
                🏠 Dashboard
              </button>
              <button
                className={activePage === "requests" ? "active" : ""}
                onClick={() => setActivePage("requests")}
              >
                ✅ Approve Requests
              </button>
              <button
                className={activePage === "employees" ? "active" : ""}
                onClick={() => setActivePage("employees")}
              >
                👥 Employees
              </button>
              <button onClick={() => setShowAddPage(true)}>➕ Add Employee</button>
              <button
                className={activePage === "viewLeaves" ? "active" : ""}
                onClick={() => setActivePage("viewLeaves")}
              >
                📄 View All Leaves
              </button>
            </div>
          )}

          <div className="nav-section">
            <button onClick={onLogout}>🚪 Logout</button>
          </div>
        </nav>

        <div className="toggle-mode">
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <span className="slider"></span>
          </label>
          <span>{darkMode ? "Dark" : "Light"} Mode</span>
        </div>
      </aside>

      <main className="main-content">{renderContent()}</main>
    </div>
  );
}
