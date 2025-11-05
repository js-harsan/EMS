import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./ApproveRequest.css";

export default function ApproveRequest() {
  const [requests, setRequests] = useState([]);

  const BASE_URL = "http://localhost:8080/api/leaves";

  // ✅ Fetch leave requests from backend
  const fetchRequests = () => {
    fetch(BASE_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch leave requests");
        return res.json();
      })
      .then((data) => setRequests(data))
      .catch((err) => console.error("Error fetching leave requests:", err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Handle Approve / Reject — send full updated object to backend
  const handleStatus = (id, newStatus) => {
    const requestToUpdate = requests.find((r) => r.id === id);
    if (!requestToUpdate) return;

    const updatedRequest = { ...requestToUpdate, status: newStatus };

    fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRequest),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update status");
        return res.json();
      })
      .then(() => {
        setRequests((prev) =>
          prev.map((req) =>
            req.id === id ? { ...req, status: newStatus } : req
          )
        );
      })
      .catch((err) => console.error("Error updating leave status:", err));
  };

  // ✅ Handle Delete
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete leave request");
        setRequests((prev) => prev.filter((r) => r.id !== id));
      })
      .catch((err) => console.error("Error deleting leave request:", err));
  };

  // ✅ Reset All Requests (for admin)
  const handleResetAll = () => {
    if (!window.confirm("Reset all leave requests for the new academic year?"))
      return;

    fetch(`${BASE_URL}/reset`, { method: "DELETE" })
      .then(() => {
        setRequests([]);
        alert("✅ All leave requests have been reset!");
      })
      .catch((err) => console.error("Error resetting leave requests:", err));
  };

  // ✅ Approved leaves for calendar view
  const events = requests
    .filter((r) => r.status === "Approved")
    .map((r) => ({
      title: `${r.employeeName} - ${r.leaveType}`,
      start: r.fromDate,
      end: r.toDate,
    }));

  return (
    <div className="approve-request-container">
      <h2>✅ Leave Approval Dashboard</h2>

      {/* === Reset Button === */}
      <div className="reset-container">
        <button className="reset-btn" onClick={handleResetAll}>
          🔄 Reset All Leave Requests (New Academic Year)
        </button>
      </div>

      {/* === Leave Requests Table === */}
      <div className="request-table-container">
        <h3>📝 Leave Requests</h3>
        {requests.length === 0 ? (
          <p>No leave requests found.</p>
        ) : (
          <table className="request-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.employeeName}</td>
                  <td>{req.leaveType}</td>
                  <td>{req.fromDate}</td>
                  <td>{req.toDate}</td>
                  <td>{req.days}</td>
                  <td>{req.reason}</td>
                  <td>
                    <span
                      className={`status-tag ${
                        req.status === "Approved"
                          ? "approved"
                          : req.status === "Rejected"
                          ? "rejected"
                          : "pending"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === "Pending" ? (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => handleStatus(req.id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleStatus(req.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(req.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* === Calendar === */}
      <div className="calendar-view">
        <h3>📅 Approved Leaves Calendar</h3>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
        />
      </div>
    </div>
  );
}
