import React, { useEffect, useState } from "react";
import api from "../api";
import { getUser } from "../auth";

export default function Portfolio() {
  const user = getUser();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/api/projects").then(r => setProjects(r.data)).catch(()=>setProjects([]));
  }, []);

  return (
    <div>
      <div className="page-title">My Portfolio</div>

      <div className="panel">
        <div className="portfolio-head">
          <div className="avatar">{(user?.name || "U").slice(0,1).toUpperCase()}</div>
          <div>
            <div className="pname">{user?.name}</div>
            <div className="pmeta">{user?.department} {user?.year ? `• Year ${user.year}` : ""}</div>
            <div className="ptag">Share this as a portfolio page in future (you can host it on Netlify/Vercel).</div>
          </div>
        </div>

        <div className="section-title">Projects</div>
        <div className="proj-grid">
          {projects.map(p => (
            <div className="proj-card" key={p.id}>
              <div className="proj-top">
                <div className="proj-title">{p.title}</div>
                <span className={`badge ${p.status}`}>{p.status}</span>
              </div>
              <div className="proj-desc">{p.description || "No description"}</div>
              <div className="proj-tech">{(p.techStack || []).join(" • ")}</div>
              <div className="proj-links">
                {p.githubUrl ? <a href={p.githubUrl} target="_blank" rel="noreferrer">GitHub</a> : null}
                {p.demoUrl ? <a href={p.demoUrl} target="_blank" rel="noreferrer">Demo</a> : null}
              </div>
              {p.files?.length ? (
                <div className="proj-files">
                  {p.files.map(f => (
                    <a key={f.filename} href={`http://localhost:5000${f.url}`} target="_blank" rel="noreferrer">
                      {f.originalName}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          {projects.length === 0 ? <div className="empty">No projects yet. Add one from "Add Project".</div> : null}
        </div>
      </div>
    </div>
  );
}