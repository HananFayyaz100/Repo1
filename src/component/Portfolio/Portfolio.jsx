import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import "./Portfolio2.css";
import { getProjects } from "../../api/projectApi";
const categories = [
  "All",
  "UI/UX",
  "Logo",
  "Social media",
  "Certificates",
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Selected project for See More
  const [selectedProject, setSelectedProject] =
  useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();

        setProjects(data.projects || []);
      } catch (error) {
        console.error(
          "Error fetching projects:",
          error
        );

        setError("Projects load nahi ho sake.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.category === activeCategory
        );

  return (
    <>
      <section className="portfolio-section">
        <h2 className="portfolio-title">
          <span className="highlight">
            My Portfolio
          </span>
        </h2>

        <p className="portfolio-subtitle">
          Explore the projects I've worked on below,
          demonstrating my skills, creativity, and
          dedication to delivering high-quality work.
        </p>

        {/* Categories */}
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                activeCategory === category
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="portfolio-message">
            <p>Loading projects...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="portfolio-message">
            <p>{error}</p>
          </div>
        )}

        {/* No Projects */}
        {!loading &&
          !error &&
          filteredProjects.length === 0 && (
            <div className="portfolio-message">
              <p>
                No projects found in this category.
              </p>
            </div>
          )}

        {/* Projects */}
        {!loading &&
          !error &&
          filteredProjects.length > 0 && (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  key={project._id}
                  className="project-card"
                >
                  <img
                    src={project.mainImage}
                    alt={project.title}
                    className="project-image"
                  />

                  <div className="project-popup">
                    <h3>{project.title}</h3>

                    <p>
                      {project.description}
                    </p>

                    <button
                      type="button"
                      className="project-see-more"
                      onClick={() => {
  setSelectedProject(project);
  setActiveImageIndex(0);
}}
                    >
                      See More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </section>

      {/* =========================
          SEE MORE MODAL
      ========================= */}

      {selectedProject && (() => {
  const galleryImages = [
    selectedProject.mainImage,
    ...(selectedProject.additionalImages || []),
  ];

  const nextImage = () => {
    setActiveImageIndex((prev) =>
      prev === galleryImages.length - 1
        ? 0
        : prev + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0
        ? galleryImages.length - 1
        : prev - 1
    );
  };

  return (
    <div
      className="portfolio-lightbox"
      onClick={() => {
          setSelectedProject(null);
    setActiveImageIndex(0);
      }}
    >
      <div
        className="portfolio-lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE */}
        <button
          className="lightbox-close"
          onClick={() => {
              setSelectedProject(null);
    setActiveImageIndex(0);
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* TOP INFO */}
        <div className="lightbox-topbar">
          <div>
            <span className="lightbox-category">
              {selectedProject.category}
            </span>

            <h2>
              {selectedProject.title}
            </h2>
          </div>

          <div className="lightbox-counter">
            {activeImageIndex + 1} /{" "}
            {galleryImages.length}
          </div>
        </div>

        {/* MAIN IMAGE AREA */}
        <div className="lightbox-stage">

          <button
            className="lightbox-arrow lightbox-prev"
            onClick={prevImage}
            aria-label="Previous image"
          >
            ‹
          </button>

          <img
            key={galleryImages[activeImageIndex]}
            src={galleryImages[activeImageIndex]}
            alt={`${selectedProject.title} ${
              activeImageIndex + 1
            }`}
            className="lightbox-main-image"
          />

          <button
            className="lightbox-arrow lightbox-next"
            onClick={nextImage}
            aria-label="Next image"
          >
            ›
          </button>

        </div>

        {/* DESCRIPTION */}
        <div className="lightbox-description">
          <p>
            {selectedProject.description}
          </p>
        </div>

        {/* THUMBNAILS */}
        {galleryImages.length > 1 && (
          <div className="lightbox-thumbnails">

            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                className={`lightbox-thumb ${
                  activeImageIndex === index
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveImageIndex(index)
                }
                aria-label={`Show image ${
                  index + 1
                }`}
              >
                <img
                  src={image}
                  alt=""
                />
              </button>
            ))}

          </div>
        )}

      </div>
    </div>
  );
})()}
    </>
  );
};

export default Portfolio;