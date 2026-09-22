import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../api/projectApi";
import "./AddProject2.css";

const categories = [
  "UI/UX",
  "Logo",
  "Social media",
  "Certificates",
];
  
const AddProject = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // MAIN IMAGE
  // =====================================================

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setError("");
    setMainImage(file);
  };

  // =====================================================
  // ADDITIONAL IMAGES
  // =====================================================

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const invalidFile = files.find(
      (file) => !file.type.startsWith("image/")
    );

    if (invalidFile) {
      setError("Only image files are allowed.");
      return;
    }

    if (files.length > 6) {
      setError("Maximum 6 additional images allowed.");
      return;
    }

    setError("");
    setAdditionalImages(files);

    // Allow selecting same files again
    e.target.value = "";
  };

  // =====================================================
  // REMOVE ADDITIONAL IMAGE
  // =====================================================

  const handleRemoveAdditionalImage = (index) => {
    setAdditionalImages((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!title.trim()) {
      setError("Project title is required.");
      return;
    }

    if (!category) {
      setError("Please select a category.");
      return;
    }

    if (!description.trim()) {
      setError("Project description is required.");
      return;
    }

    if (!mainImage) {
      setError("Main image select karo.");
      return;
    }

    if (additionalImages.length > 6) {
      setError("Maximum 6 additional images allowed.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("category", category);
      formData.append("description", description.trim());

      formData.append("mainImage", mainImage);

      additionalImages.forEach((file) => {
        formData.append("additionalImages", file);
      });

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      await createProject(formData, token);

      setMessage("Project created successfully!");

      // Reset form
      setTitle("");
      setCategory("");
      setDescription("");
      setMainImage(null);
      setAdditionalImages([]);

    } catch (error) {
      console.error("Create project error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      setError(
        error.response?.data?.message ||
          "Project create nahi ho saka."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="add-project-page">
      <div className="add-project-container">

        {/* HEADER */}
        <div className="add-project-header">

          <div>
            <span className="page-kicker">
              PORTFOLIO MANAGEMENT
            </span>

            <h1>Create New Project</h1>

            <p>
              Add a new project to your portfolio with
              images and project information.
            </p>
          </div>

          <button
            type="button"
            className="back-dashboard-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            ← Dashboard
          </button>

        </div>


        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="form-success">
            <span>✓</span>
            <div>
              <strong>Project Created</strong>
              <p>{message}</p>
            </div>
          </div>
        )}


        {/* ERROR MESSAGE */}
        {error && (
          <div className="form-error">
            <span>!</span>
            <div>
              <strong>Unable to continue</strong>
              <p>{error}</p>
            </div>
          </div>
        )}


        <form onSubmit={handleSubmit}>

          {/* =================================================
              BASIC INFORMATION
          ================================================= */}

          <section className="form-section">

            <div className="form-section-heading">
              <div>
                <span>01</span>

                <div>
                  <h2>Project Information</h2>
                  <p>
                    Enter the basic details of your project.
                  </p>
                </div>
              </div>
            </div>


            <div className="form-grid">

              {/* TITLE */}
              <div className="form-field">

                <label htmlFor="project-title">
                  Project Title
                </label>

                <input
                  id="project-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Hanan Vista Properties"
                  required
                />

              </div>


              {/* CATEGORY */}
              <div className="form-field">

                <label htmlFor="project-category">
                  Category
                </label>

                <select
                  id="project-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

              </div>

            </div>


            {/* DESCRIPTION */}
            <div className="form-field">

              <label htmlFor="project-description">
                Description
              </label>

              <textarea
                id="project-description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Describe the project, its purpose and what you created..."
                rows="7"
                required
              />

              <span className="field-hint">
                Keep the description clear and concise.
              </span>

            </div>

          </section>


          {/* =================================================
              MAIN IMAGE
          ================================================= */}

          <section className="form-section">

            <div className="form-section-heading">
              <div>
                <span>02</span>

                <div>
                  <h2>Main Project Image</h2>
                  <p>
                    This image will be displayed on the
                    portfolio card.
                  </p>
                </div>
              </div>
            </div>


            <div className="main-upload-area">

              {mainImage ? (
                <div className="main-preview">

                  <img
                    src={URL.createObjectURL(mainImage)}
                    alt="Main project preview"
                  />

                  <div className="preview-overlay">

                    <div>
                      <strong>
                        {mainImage.name}
                      </strong>

                      <span>
                        Main project image
                      </span>
                    </div>

                    <label className="change-image-btn">
                      Change Image

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageChange}
                      />
                    </label>

                  </div>

                </div>
              ) : (
                <label className="main-upload-box">

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                  />

                  <div className="upload-icon">
                    ↑
                  </div>

                  <strong>
                    Upload Main Image
                  </strong>

                  <span>
                    Click to browse your files
                  </span>

                  <small>
                    JPG, PNG, WEBP supported
                  </small>

                </label>
              )}

            </div>

          </section>


          {/* =================================================
              ADDITIONAL IMAGES
          ================================================= */}

          <section className="form-section">

            <div className="form-section-heading">
              <div>
                <span>03</span>

                <div>
                  <h2>Additional Images</h2>
                  <p>
                    Add screenshots or other images related
                    to this project.
                  </p>
                </div>
              </div>

              <div className="image-count">
                {additionalImages.length}/6
              </div>
            </div>


            {/* SELECTED IMAGES */}

            {additionalImages.length > 0 && (
              <div className="additional-preview-grid">

                {additionalImages.map((file, index) => (
                  <div
                    className="additional-preview"
                    key={`${file.name}-${index}`}
                  >

                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Additional ${index + 1}`}
                    />

                    <div className="image-number">
                      {index + 1}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveAdditionalImage(index)
                      }
                      className="remove-image-btn"
                    >
                      ×
                    </button>

                  </div>
                ))}

              </div>
            )}


            {/* UPLOAD */}
            {additionalImages.length < 6 && (
              <label className="gallery-upload-box">

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                />

                <span className="gallery-upload-icon">
                  ＋
                </span>

                <strong>
                  Add Additional Images
                </strong>

                <span>
                  You can select up to{" "}
                  {6 - additionalImages.length} more
                  image
                  {6 - additionalImages.length !== 1
                    ? "s"
                    : ""}
                </span>

              </label>
            )}

            {additionalImages.length === 6 && (
              <div className="max-images-message">
                <span>✓</span>
                Maximum 6 additional images selected.
              </div>
            )}

          </section>


          {/* =================================================
              SUBMIT
          ================================================= */}

          <div className="form-submit-area">

            <button
              type="button"
              className="cancel-project-btn"
              onClick={() =>
                navigate("/admin/dashboard")
              }
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-project-submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="submit-spinner"></span>
                  Creating Project...
                </>
              ) : (
                <>
                  Create Project
                  <span>→</span>
                </>
              )}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddProject;