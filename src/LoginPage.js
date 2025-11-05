import React, { useState } from "react";
import "./loginpage.css";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Hardcoded demo credentials
    if (username === "admin" && password === "admin123") {
      onLogin({ role: "admin", username });
    } else if (username === "employee" && password === "emp123") {
      onLogin({ role: "employee", username });
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Employee Management System</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>

        <div className="login-hint">
          <p><b>Admin:</b> admin / admin123</p>
          <p><b>Employee:</b> employee / emp123</p>
        </div>
      </form>
    </div>
  );
}
