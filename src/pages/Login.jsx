import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { setAuth } from "../auth";
import AuthShell from "../components/AuthShell.jsx";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.post("/api/auth/login", { email, password });
      setAuth(res.data.token, res.data.user);
      nav("/student");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthShell title="Student Project Hub" subtitle="Welcome back">
      <form onSubmit={submit} className="form">
        <div className="field">
          <label className="field-label">Email</label>
          <input
            className="input"
            placeholder="name@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="field">
          <div className="field-row">
            <label className="field-label">Password</label>
            <Link className="link" to="/forgot">Forgot password?</Link>
          </div>
          <input
            className="input"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {msg ? <div className="msg error">{msg}</div> : null}

        <button className="btn primary" type="submit">
          Login
        </button>

        <div className="auth-links">
          <span>Don&apos;t have an account?</span> <Link to="/register">Register</Link>
        </div>
      </form>
    </AuthShell>
  );
}