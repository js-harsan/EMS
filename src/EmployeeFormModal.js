import React, { useState, useEffect } from "react";
import "./EmployeeFormModal.css";

export default function EmployeeFormModal({ onClose, onSave, employee }) {
  const [formData, setFormData] = useState({
    id: "", // backend primary key
    employeeId: "",
    name: "",
    email: "",
    department: "",
    role: "",
    gender: "",
    dob: "",
    joiningDate: "",
  });

  // ✅ Prefill or reset form based on edit/add mode
  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id || "",
        employeeId: employee.employeeId || "",
        name: employee.name || "",
        email: employee.email || "",
        department: employee.department || "",
        role: employee.role || "",
        gender: employee.gender || "",
        dob: employee.dob || "",
        joiningDate: employee.joiningDate || "",
      });
    } else {
      setFormData({
        id: "",
        employeeId: "",
        name: "",
        email: "",
        department: "",
        role: "",
        gender: "",
        dob: "",
        joiningDate: "",
      });
    }
  }, [employee]);

  // ✅ Update input values dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit handler (save or update)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.employeeId || !formData.name || !formData.email) {
      alert("Please fill all required fields!");
      return;
    }

    onSave(formData); // Pass to Sidebar.js for API call
  };

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="EMP001"
              required
              disabled={!!employee} // prevent changing ID during edit
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Software Engineer"
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              💾 {employee ? "Update" : "Save"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
