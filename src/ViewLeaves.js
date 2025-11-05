import React, { useEffect, useState } from "react";
import "./ViewLeaves.css";

export default function ViewLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/leaves")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch leaves");
        return res.json();
      })
      .then((data) => {
        setLeaves(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leaves:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="view-leaves-container">
      <h2>📋 All Leave Requests</h2>

      {loading ? (
        <p>Loading leave records...</p>
      ) : leaves.length === 0 ? (
        <p>No leave records found.</p>
      ) : (
        <table className="leaves-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.id}</td>
                <td>{leave.employeeName}</td>
                <td>{leave.leaveType}</td>
                <td>{leave.fromDate}</td>
                <td>{leave.toDate}</td>
                <td>{leave.days}</td>
                <td>{leave.reason}</td>
                <td
                  className={`status ${
                    leave.status === "Approved"
                      ? "approved"
                      : leave.status === "Rejected"
                      ? "rejected"
                      : "pending"
                  }`}
                >
                  {leave.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
