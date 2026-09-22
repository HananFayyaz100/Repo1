import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setError("");

<<<<<<< HEAD
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";

      const response = await axios.post(
        `${API_URL}/auth/forgot-password`,
=======
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
>>>>>>> 02321d8cdd869fccb7cf3d208a559c05974d44e0
        {
          email,
        }
      );

      setMessage(
        response.data?.message ||
          "Password reset link has been sent to your email."
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">

        <div className="admin-login-left">
          <div className="admin-brand">
            <div className="brand-logo">A</div>

            <div>
              <h2>Admin Panel</h2>
              <span>Portfolio Management</span>
            </div>
          </div>

          <div className="admin-login-intro">
            <span className="intro-badge">
              PASSWORD RECOVERY
            </span>

            <h1>
              Reset your
              <span> password.</span>
            </h1>

            <p>
              Enter your administrator email address
              and we will send you a secure password
              reset link.
            </p>
          </div>
        </div>

        <div className="admin-login-right">

          <div className="login-form-wrapper">

            <div className="mobile-logo">
              <div className="brand-logo">A</div>
            </div>

            <div className="login-heading">
              <span>ACCOUNT RECOVERY</span>

              <h1>Forgot Password?</h1>

              <p>
                Enter your email to receive a reset link.
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

            <form onSubmit={handleForgotPassword}>

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

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="button-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
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
                onClick={() => navigate("/admin/login")}
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

export default ForgotPassword;