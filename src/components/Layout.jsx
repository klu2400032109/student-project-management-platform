import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearAuth, getUser } from "../auth";

export default function Layout({ children }) {
  const nav = useNavigate();
  const user = getUser();

  const logout = () => {
    clearAuth();
    nav("/login");
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <div className="logo">SP</div>
          <div>
            <div className="title">Student Project & Portfolio</div>
            <div className="subtitle">Management System</div>
          </div>
        </div>

        <div className="topbar-right">
          {user ? <div className="userchip">{user.name} ({user.role})</div> : null}
          <button className="btn ghost" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="shell">
        <aside className="sidebar">
          <Link to="/student" className="navitem">Dashboard</Link>
          <Link to="/student/projects" className="navitem">Projects</Link>
          <Link to="/student/projects/new" className="navitem">Add Project</Link>
          <Link to="/student/portfolio" className="navitem">My Portfolio</Link>
          {user?.role === "admin" ? (
            <>
              <div className="divider" />
              <Link to="/admin" className="navitem">Admin Panel</Link>
            </>
          ) : null}
        </aside>

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}