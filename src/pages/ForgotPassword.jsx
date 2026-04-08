import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email || !token || !newPassword || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const res = await api.post("/api/auth/reset-password", {
        email,
        token,
        newPassword,
      });

      setMessage(res.data.message || "Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Could not reset password");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Student Project Hub</h1>
        <h2 style={styles.subtitle}>Reset Password</h2>

        <form onSubmit={handleReset} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Registered Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Reset Token</label>
            <input
              type="text"
              placeholder="Enter reset token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          {message && <p style={styles.success}>{message}</p>}
          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Reset Password
          </button>
        </form>

        <Link to="/login" style={styles.link}>
          Back to login
        </Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4b236d, #284a87)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    background: "rgba(44, 20, 78, 0.9)",
    borderRadius: "24px",
    padding: "36px",
    color: "#fff",
    boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
  },
  title: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "18px",
  },
  subtitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "600",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.18)",
    outline: "none",
    background: "#1a1830",
    color: "#fff",
    fontSize: "15px",
  },
  button: {
    marginTop: "8px",
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "#2563eb",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },
  success: {
    color: "#9cffb0",
    fontSize: "15px",
    margin: 0,
  },
  error: {
    color: "#ffb3b3",
    fontSize: "15px",
    margin: 0,
  },
  link: {
    display: "inline-block",
    marginTop: "18px",
    color: "#7dc4ff",
    textDecoration: "underline",
    fontSize: "16px",
  },
};