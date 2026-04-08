import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "React,Node",
    status: "Pending",
    githubUrl: "",
    demoUrl: ""
  });
  const [files, setFiles] = useState([]);
  const [msg, setMsg] = useState("");

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      for (const f of files) fd.append("files", f);

      await api.post("/api/projects", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      nav("/student/projects");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Failed to add project");
    }
  };

  return (
    <div>
      <div className="page-title">Add Project</div>

      <form className="panel" onSubmit={submit}>
        <div className="grid2">
          <div>
            <div className="label">Project Title *</div>
            <input className="input" value={form.title} onChange={onChange("title")} placeholder="e.g., Intelligent Traffic Monitoring" />
          </div>
          <div>
            <div className="label">Status</div>
            <select className="input" value={form.status} onChange={onChange("status")}>
              <option>Pending</option>
              <option>InProgress</option>
              <option>Completed</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="label">Description</div>
        <textarea className="input" rows="5" value={form.description} onChange={onChange("description")} placeholder="Write project details..." />

        <div className="grid2">
          <div>
            <div className="label">Tech Stack (comma separated)</div>
            <input className="input" value={form.techStack} onChange={onChange("techStack")} placeholder="React, Node, MySQL" />
          </div>
          <div>
            <div className="label">GitHub URL</div>
            <input className="input" value={form.githubUrl} onChange={onChange("githubUrl")} placeholder="https://github.com/..." />
          </div>
        </div>

        <div className="label">Demo URL</div>
        <input className="input" value={form.demoUrl} onChange={onChange("demoUrl")} placeholder="https://..." />

        <div className="label">Upload Files (report/ppt/images) - max 5</div>
        <input className="input" type="file" multiple onChange={(e)=>setFiles(Array.from(e.target.files || []))} />

        {msg ? <div className="msg error">{msg}</div> : null}

        <div className="actions">
          <button className="btn primary" type="submit">Save Project</button>
          <button className="btn" type="button" onClick={()=>nav("/student/projects")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}