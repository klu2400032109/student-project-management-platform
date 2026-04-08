import React, { useEffect, useMemo, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/api/projects")
      .then((r) => setProjects(Array.isArray(r.data) ? r.data : []))
      .catch(() => setProjects([]));
  }, []);

  const stats = useMemo(() => {
    const total = projects.length;

    const completed = projects.filter(
      (p) => (p.status || "").toUpperCase() === "COMPLETED"
    ).length;

    const inProgress = projects.filter(
      (p) => (p.status || "").toUpperCase() === "IN_PROGRESS"
    ).length;

    const pending = projects.filter(
      (p) => (p.status || "").toUpperCase() === "PLANNING"
    ).length;

    return { total, completed, inProgress, pending };
  }, [projects]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-top">
        <div className="page-title">Dashboard</div>

        <div className="dashboard-actions-top">
          <Link className="btn primary" to="/student/projects">
            View Projects
          </Link>

          <Link className="btn primary" to="/student/projects/new">
            Add Project
          </Link>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <div className="k">Total Projects</div>
          <div className="v">{stats.total}</div>
        </div>

        <div className="card">
          <div className="k">Completed</div>
          <div className="v">{stats.completed}</div>
        </div>

        <div className="card">
          <div className="k">In Progress</div>
          <div className="v">{stats.inProgress}</div>
        </div>

        <div className="card">
          <div className="k">Pending</div>
          <div className="v">{stats.pending}</div>
        </div>
      </div>
    </div>
  );
}