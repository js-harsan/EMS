import React, { useState } from "react";
import "./LeaveAttendance.css";

export default function LeaveAttendance() {
  const [formData, setFormData] = useState({
    employeeName: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });
  const [success, setSuccess] = useState("");

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Calculate number of leave days
  const calculateDays = (from, to) => {
    const start = new Date(from);
    const end = new Date(to);
    const diffTime = end - start;
    return diffTime > 0 ? diffTime / (1000 * 60 * 60 * 24) + 1 : 0;
  };

  // ✅ Handle form submit (POST to Spring Boot backend)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.employeeName) {
      alert("Please enter your name!");
      return;
    }

    const newLeave = {
      employeeName: formData.employeeName,
      leaveType: formData.leaveType,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      reason: formData.reason,
      days: calculateDays(formData.fromDate, formData.toDate),
      status: "Pending",
    };

    fetch("http://localhost:8080/api/leaves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLeave),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit leave request");
        return res.json();
      })
      .then(() => {
        setSuccess("✅ Leave request submitted successfully!");
        setFormData({
          employeeName: "",
          leaveType: "",
          fromDate: "",
          toDate: "",
          reason: "",
        });
        setTimeout(() => setSuccess(""), 3000);
      })
      .catch((err) => {
        console.error("Error submitting leave:", err);
        alert("Error submitting leave request. Please try again.");
      });
  };

  return (
    <div className="leave-attendance">
      <h2>🗓️ Apply Leave</h2>

      <form onSubmit={handleSubmit} className="leave-form">
        {/* ✅ Employee Name (manual entry) */}
        <label>Employee Name:</label>
        <input
          type="text"
          name="employeeName"
          placeholder="Enter your full name"
          value={formData.employeeName}
          onChange={handleChange}
          required
        />

        {/* ✅ Leave Type Dropdown */}
        <label>Leave Type:</label>
        <select
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          required
        >
          <option value="">Select Leave Type</option>
          <option value="Earned Leave">Earned Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Maternity Leave">Maternity Leave</option>
          <option value="Paternity Leave">Paternity Leave</option>
          <option value="Loss of Pay">Loss of Pay</option>
        </select>

        {/* ✅ Dates */}
        <label>From Date:</label>
        <input
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleChange}
          required
        />

        <label>To Date:</label>
        <input
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={handleChange}
          required
        />

        {/* ✅ Reason */}
        <label>Reason:</label>
        <textarea
          name="reason"
          placeholder="Enter reason for leave..."
          value={formData.reason}
          onChange={handleChange}
          required
        ></textarea>

        {/* ✅ Submit Button */}
        <button type="submit" className="submit-btn">
          Submit Leave Request
        </button>

        {success && <p className="success-msg">{success}</p>}
      </form>
    </div>
  );
}
