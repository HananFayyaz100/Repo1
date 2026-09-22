import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin2.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";

      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      if (!token) {
        setError("Token nahi mila.");
        return;
      }

      localStorage.setItem("adminToken", token);

      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
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
              ADMINISTRATOR
            </span>

            <h1>
              Manage your
              <span> portfolio.</span>
            </h1>

            <p>
              Create, update and manage your projects
              from one secure dashboard.
            </p>
          </div>

          <div className="admin-login-features">

            <div className="feature-item">
              <div className="feature-icon">
                ✓
              </div>

              <div>
                <strong>Manage Projects</strong>
                <p>
                  Add, edit and delete your projects.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                ✓
              </div>

              <div>
                <strong>Image Management</strong>
                <p>
                  Upload main and additional images.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                ✓
              </div>

              <div>
                <strong>Secure Access</strong>
                <p>
                  Protected administrator dashboard.
                </p>
              </div>
            </div>

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
              <span>WELCOME BACK</span>

              <h1>Admin Login</h1>

              <p>
                Sign in to continue to your dashboard.
              </p>
            </div>

            {error && (
              <div className="login-error">
                <span>!</span>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <div className="input-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    @
                  </span>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="admin@example.com"
                    required
                  />

                </div>
              </div>

              {/* PASSWORD */}
              <div className="input-group">

                <label htmlFor="password">
                  Password
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
                    placeholder="Enter your password"
                    required
                  />

                </div>
              </div>
                            <div className="forgot-password">
                <button
                  type="button"
                  onClick={() => navigate("/admin/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="button-spinner"></span>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login to Dashboard
                    <span className="button-arrow">
                      →
                    </span>
                  </>
                )}
              </button>

            </form>

            <div className="login-security">
              <span className="security-icon">
                🔒
              </span>

              <p>
                Your connection is protected and secure.
              </p>
            </div>

          </div>

        </div>

      </div>

      <div className="login-copyright">
        © {new Date().getFullYear()} Admin Panel
      </div>

    </div>
  );
};

export default AdminLogin;