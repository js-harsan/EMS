import React, { useState } from "react";
import CountUp from "react-countup";
import {
  BarChart,
  Bar,
  Line,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import "./AdminDashboard.css";

export default function AdminDashboard({ employees = [], leaveRequests = [] }) {
  const COLORS = ["#4ECDC4", "#FF6B6B", "#FFD93D", "#1A535C", "#FF9F1C", "#6C5CE7"];

  // === FILTER STATE ===
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  // === Filter employees by department & gender ===
  const filteredEmployees = employees.filter((emp) => {
    return (
      (selectedDept === "" || emp.department === selectedDept) &&
      (selectedGender === "" || emp.gender === selectedGender)
    );
  });

  // === Basic Stats ===
  const totalEmployees = filteredEmployees.length;
  const approvedRequests = leaveRequests.filter(
    (l) => l.status?.toLowerCase() === "approved"
  ).length;
  const pendingRequests = leaveRequests.filter(
    (l) => l.status?.toLowerCase() === "pending"
  ).length;
  const rejectedRequests = leaveRequests.filter(
    (l) => l.status?.toLowerCase() === "rejected"
  ).length;

  const totalProcessed = approvedRequests + rejectedRequests;
  const approvalRate =
    totalProcessed > 0 ? Math.round((approvedRequests / totalProcessed) * 100) : 0;

  // === Monthly Distribution ===
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2025, i).toLocaleString("default", { month: "short" }),
    leaves: 0,
  }));
  leaveRequests.forEach((req) => {
    if (req.fromDate) {
      const monthIndex = new Date(req.fromDate).getMonth();
      monthlyData[monthIndex].leaves += 1;
    }
  });

  // === Department Distribution ===
  const deptCount = filteredEmployees.reduce((acc, emp) => {
    const dept = emp.department || "Unknown";
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});
  const departmentData = Object.entries(deptCount).map(([name, value]) => ({
    name,
    value,
  }));

  // === Gender Ratio ===
  const genderCount = filteredEmployees.reduce(
    (acc, emp) => {
      const g = emp.gender?.toLowerCase();
      if (g === "male") acc.male++;
      else if (g === "female") acc.female++;
      else acc.other++;
      return acc;
    },
    { male: 0, female: 0, other: 0 }
  );
  const genderData = [
    { name: "Male", value: genderCount.male },
    { name: "Female", value: genderCount.female },
    { name: "Other", value: genderCount.other },
  ];

  // === Insights ===
  const topDept =
    departmentData.length > 0
      ? departmentData.reduce((max, d) => (d.value > max.value ? d : max), departmentData[0])
          .name
      : "N/A";

  const topMonth =
    monthlyData.length > 0
      ? monthlyData.reduce((max, m) => (m.leaves > max.leaves ? m : max), monthlyData[0]).month
      : "N/A";

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Admin Dashboard - Live Insights</h2>

      {/* === FILTER BAR === */}
      <div className="filter-bar">
        <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
          <option value="">All Departments</option>
          {Object.keys(deptCount).map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* === SUMMARY CARDS === */}
      <div className="live-summary">
        <div className="summary-card gradient-blue">
          <h4>Total Employees</h4>
          <p>
            <CountUp end={totalEmployees} duration={1.5} />
          </p>
        </div>
        <div className="summary-card gradient-green">
          <h4>Approval Rate</h4>
          <p>
            <CountUp end={approvalRate} duration={1.5} />%
          </p>
        </div>
        <div className="summary-card gradient-orange">
          <h4>Total Leave Requests</h4>
          <p>
            <CountUp end={leaveRequests.length} duration={1.5} />
          </p>
        </div>
      </div>

      {/* === COMPARISON SUMMARY === */}
      <div className="comparison-summary">
        <div className="comparison-card gradient-purple">
          <h4>📈 Employee Growth</h4>
          <p>+5% vs last month</p>
        </div>
        <div className="comparison-card gradient-teal">
          <h4>🕒 Avg Leave Duration</h4>
          <p>3.2 Days</p>
        </div>
        <div className="comparison-card gradient-red">
          <h4>⚠️ Rejection Rate</h4>
          <p>{Math.round((rejectedRequests / leaveRequests.length) * 100) || 0}%</p>
        </div>
      </div>

      {/* === CHARTS === */}
      <div className="charts-grid">
        <div className="chart-box wide">
          <h3>📅 Monthly Leave Requests</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="leaves" fill="#4ECDC4" barSize={35} />
              <Line dataKey="leaves" stroke="#6C5CE7" strokeWidth={3} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>🏢 Department Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={departmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {departmentData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>⚧️ Gender Ratio</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {genderData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* === SMART INSIGHTS === */}
      <div className="insight-box">
        <h3>🧠 Smart Insights</h3>
        <ul>
          <li>✔️ {approvalRate}% of processed leave requests were approved.</li>
          <li>📅 Most active leave month: {topMonth}</li>
          <li>🏢 Department with most employees: {topDept}</li>
          <li>👥 Male-Female ratio: {genderCount.male}:{genderCount.female}</li>
        </ul>
      </div>
    </div>
  );
}
