// App.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import LoginPage from "./LoginPage";
import "./App.css"; // ✅ Add App-level styles

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  // ✅ Show login page first
  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  // ✅ After login, show sidebar and dashboard content
  return (
    <div className="app-container">
      <Sidebar user={user} onLogout={handleLogout} />
    </div>
  );
}
