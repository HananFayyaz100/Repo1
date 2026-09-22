import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AdminLogin2.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";

      const response = await axios.post(
        `${API_URL}/auth/reset-password/${token}`,
        {
          password,
          confirmPassword,
        }
      );

      setMessage(
        response.data?.message ||
          "Password reset successfully."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Password reset failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-container">

        {/* LEFT SIDE */}
        <div className="admin-login-left">

          <div className="admin-brand">
            <div className="brand-logo">
              A
            </div>

            <div>
              <h2>Admin Panel</h2>
              <span>Portfolio Management</span>
            </div>
          </div>

          <div className="admin-login-intro">

            <span className="intro-badge">
              SECURITY
            </span>

            <h1>
              Create a new
              <span> password.</span>
            </h1>

            <p>
              Choose a strong password to secure
              your administrator account.
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="admin-login-right">

          <div className="login-form-wrapper">

            <div className="mobile-logo">
              <div className="brand-logo">
                A
              </div>
            </div>

            <div className="login-heading">

              <span>ACCOUNT RECOVERY</span>

              <h1>Reset Password</h1>

              <p>
                Enter your new administrator password.
              </p>

            </div>

            {error && (
              <div className="login-error">
                <span>!</span>
                <p>{error}</p>
              </div>
            )}

            {message && (
              <div className="login-success">
                <span>✓</span>
                <p>{message}</p>
              </div>
            )}

            <form onSubmit={handleResetPassword}>

              {/* NEW PASSWORD */}
              <div className="input-group">

                <label htmlFor="password">
                  New Password
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    •
                  </span>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter new password"
                    required
                  />

                </div>

              </div>

              {/* CONFIRM PASSWORD */}
              <div className="input-group">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    •
                  </span>

                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm new password"
                    required
                  />

                </div>

              </div>

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="button-spinner"></span>
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset Password
                    <span className="button-arrow">
                      →
                    </span>
                  </>
                )}
              </button>

            </form>

            <div className="forgot-back">

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/login")
                }
              >
                ← Back to Login
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ResetPassword;