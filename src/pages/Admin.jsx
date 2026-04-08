import React, { useEffect, useState } from "react";
import api from "../api";

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const res = await api.get("/api/admin/projects");
    setProjects(res.data);
  };

  useEffect(() => { load().catch(()=>setMsg("Admin access required")); }, []);

  const setStatus = async (id, status) => {
    await api.put(`/api/admin/projects/${id}/status`, { status });
    await load();
  };

  return (
    <div>
      <div className="page-title">Admin Panel</div>
      {msg ? <div className="msg error">{msg}</div> : null}

      <div className="table">
        <div className="trow thead">
          <div>Project</div>
          <div>Student</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {projects.map(p => (
          <div className="trow" key={p.id}>
            <div className="tmain">
              <div className="tname">{p.title}</div>
              <div className="tmeta">{p.student?.name} • {p.student?.email}</div>
            </div>
            <div>{p.student?.department} {p.student?.year ? `• ${p.student.year}` : ""}</div>
            <div><span className={`badge ${p.status}`}>{p.status}</span></div>
            <div className="tactions">
              <button className="btn" onClick={()=>setStatus(p.id, "InProgress")}>InProgress</button>
              <button className="btn" onClick={()=>setStatus(p.id, "Completed")}>Completed</button>
              <button className="btn danger" onClick={()=>setStatus(p.id, "Rejected")}>Reject</button>
            </div>
          </div>
        ))}
        {projects.length === 0 ? <div className="empty">No projects found.</div> : null}
      </div>
    </div>
  );
}