import React from "react";
import "./EmployeeTable.css";

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="employee-table-container">
      <h2>👥 Employee List</h2>

      {employees.length === 0 ? (
        <p className="no-data">No employees found.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Joining Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.id}>
                <td>{index + 1}</td>
                <td>{emp.employeeId}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>{emp.gender}</td>
                <td>{emp.dob}</td>
                <td>{emp.joiningDate}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(emp)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(emp.id)} // ✅ use backend id
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
