import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/projects";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (value) => {
    if (!value) return "No Date";
    const d = new Date(value);
    return isNaN(d.getTime()) ? "No Date" : d.toLocaleDateString();
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);
      console.log("PROJECTS API RESPONSE:", response.data);

      const data = Array.isArray(response.data) ? response.data : [];
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const title = (project.title || "").toLowerCase();
      const tech = (project.techStack || project.tech_stack || "").toLowerCase();
      const status = (project.status || "").toLowerCase();

      const matchesSearch =
        title.includes(search.toLowerCase()) ||
        tech.includes(search.toLowerCase()) ||
        status.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        status === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Projects</h1>

        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.select}
        >
          <option value="All">All</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="PLANNING">PLANNING</option>
        </select>

        <button onClick={fetchProjects} style={styles.refreshBtn}>
          Refresh
        </button>

        {loading && <p style={styles.message}>Loading projects...</p>}
        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Tech</th>
                <th style={styles.th}>Created Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td style={styles.td}>{project.title || "No Title"}</td>
                    <td style={styles.td}>{project.status || "No Status"}</td>
                    <td style={styles.td}>
                      {project.techStack || project.tech_stack || "No Tech"}
                    </td>
                    <td style={styles.td}>
                      {formatDate(project.createdAt || project.created_at)}
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => deleteProject(project.id)}
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={styles.noData}>
                    No projects found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #3b1c5a, #1e3a6d)",
    padding: "20px",
    color: "#fff",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "20px",
  },
  searchInput: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "none",
    outline: "none",
    marginBottom: "14px",
    background: "#0b1020",
    color: "#fff",
    fontSize: "16px",
  },
  select: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "none",
    outline: "none",
    marginBottom: "14px",
    background: "#0b1020",
    color: "#fff",
    fontSize: "16px",
  },
  refreshBtn: {
    background: "#161b2e",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    padding: "12px 24px",
    cursor: "pointer",
    fontWeight: "700",
    marginBottom: "20px",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "18px",
    fontSize: "18px",
    background: "rgba(0,0,0,0.15)",
  },
  td: {
    padding: "18px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    fontSize: "16px",
  },
  deleteBtn: {
    background: "#a63d5d",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: "700",
  },
  noData: {
    textAlign: "center",
    padding: "24px",
    color: "#ddd",
  },
  message: {
    color: "#fff",
    marginBottom: "12px",
  },
  error: {
    color: "#ffb3b3",
    marginBottom: "12px",
  },
};

export default Projects;