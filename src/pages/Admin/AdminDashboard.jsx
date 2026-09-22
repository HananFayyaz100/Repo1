// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { getProjects } from "../../api/projectApi";

// // NEW: reviews API (see reviewApi.js from the AdminProjects update)
// import { getReviews, deleteReview, updateReview } from "../../api/reviewApi";

// import "./AdminDashboard2.css";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const [projects, setProjects] = useState([]);
//   const [loadingProjects, setLoadingProjects] = useState(true);
//   const [projectError, setProjectError] = useState("");

//   // =====================================================
//   // NEW: REVIEWS STATE (project state se poori tarah alag,
//   // ek doosre ko touch nahi karte)
//   // =====================================================

//   const [reviews, setReviews] = useState([]);
//   const [loadingReviews, setLoadingReviews] = useState(true);
//   const [reviewsError, setReviewsError] = useState("");

//   // NEW: jis review ko delete kiya ja raha hai uski id —
//   // sirf usi card ke button ko disable karne ke liye
//   const [deletingReviewId, setDeletingReviewId] = useState(null);

//   // NEW: EDIT REVIEW state — bilkul alag, delete/add se koi lena dena nahi
//   const [editingReview, setEditingReview] = useState(null);
//   const [editReviewName, setEditReviewName] = useState("");
//   const [editReviewProfession, setEditReviewProfession] = useState("");
//   const [editReviewMessage, setEditReviewMessage] = useState("");
//   const [editReviewRating, setEditReviewRating] = useState(5);
//   const [editReviewImage, setEditReviewImage] = useState(null);
//   const [savingEditReview, setSavingEditReview] = useState(false);

//   // =====================================================
//   // LOGOUT
//   // =====================================================

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/admin/login");
//   };

//   // =====================================================
//   // FETCH PROJECTS
//   // =====================================================

//   useEffect(() => {
//     const fetchDashboardProjects = async () => {
//       try {
//         setLoadingProjects(true);
//         setProjectError("");

//         const data = await getProjects();

//         setProjects(data?.projects || []);
//       } catch (error) {
//         console.error("Dashboard projects error:", error);

//         setProjectError(
//           error.response?.data?.message ||
//             "Unable to load portfolio information."
//         );
//       } finally {
//         setLoadingProjects(false);
//       }
//     };

//     fetchDashboardProjects();
//   }, []);

//   // =====================================================
//   // NEW: FETCH REVIEWS
//   // (isolated try/catch — is fail hone se projects wala
//   // data kabhi crash nahi hoga)
//   // =====================================================

//   useEffect(() => {
//     const fetchDashboardReviews = async () => {
//       try {
//         setLoadingReviews(true);
//         setReviewsError("");

//         const data = await getReviews();

//         // Backend { success, data } bhejta hai — dono
//         // shapes ko safely handle kar rahe hain
//         const list = Array.isArray(data?.data)
//           ? data.data
//           : Array.isArray(data?.reviews)
//           ? data.reviews
//           : Array.isArray(data)
//           ? data
//           : [];

//         setReviews(list);
//       } catch (error) {
//         console.error("Dashboard reviews error:", error);

//         setReviewsError(
//           error.response?.data?.message ||
//             "Unable to load reviews."
//         );
//       } finally {
//         setLoadingReviews(false);
//       }
//     };

//     fetchDashboardReviews();
//   }, []);

//   // =====================================================
//   // DASHBOARD STATISTICS
//   // =====================================================

//   const statistics = useMemo(() => {
//     const totalProjects = projects.length;

//     const totalImages = projects.reduce((total, project) => {
//       const additional =
//         Array.isArray(project.additionalImages)
//           ? project.additionalImages.length
//           : 0;

//       return total + 1 + additional;
//     }, 0);

//     const uniqueCategories = [
//       ...new Set(
//         projects
//           .map((project) => project.category)
//           .filter(Boolean)
//       ),
//     ];

//     const categoryCounts = uniqueCategories
//       .map((category) => {
//         const count = projects.filter(
//           (project) =>
//             project.category === category
//         ).length;

//         return {
//           category,
//           count,
//         };
//       })
//       .sort((a, b) => b.count - a.count);

//     const latestProject =
//       projects.length > 0
//         ? projects[0]
//         : null;

//     return {
//       totalProjects,
//       totalImages,
//       totalCategories: uniqueCategories.length,
//       categoryCounts,
//       latestProject,
//     };
//   }, [projects]);

//   // =====================================================
//   // NEW: REVIEW STATISTICS (safe defaults, kabhi NaN nahi dega)
//   // =====================================================

//   const reviewStatistics = useMemo(() => {
//     const totalReviews = reviews.length;

//     const averageRating =
//       totalReviews > 0
//         ? (
//             reviews.reduce(
//               (sum, review) =>
//                 sum + (Number(review?.rating) || 0),
//               0
//             ) / totalReviews
//           ).toFixed(1)
//         : "0.0";

//     return { totalReviews, averageRating };
//   }, [reviews]);

//   // =====================================================
//   // RECENT PROJECTS
//   // =====================================================

//   const recentProjects = useMemo(() => {
//     return projects.slice(0, 4);
//   }, [projects]);

//   // =====================================================
//   // NEW: RECENT REVIEWS
//   // =====================================================

//   const recentReviews = useMemo(() => {
//     return reviews.slice(0, 4);
//   }, [reviews]);

//   // =====================================================
//   // CATEGORY MAX
//   // =====================================================

//   const maxCategoryCount =
//     statistics.categoryCounts.length > 0
//       ? Math.max(
//           ...statistics.categoryCounts.map(
//             (item) => item.count
//           )
//         )
//       : 1;

//   // =====================================================
//   // FORMAT DATE
//   // =====================================================

//   const formatDate = (date) => {
//     if (!date) return "Recently";

//     const parsedDate = new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//       return "Recently";
//     }

//     return parsedDate.toLocaleDateString(
//       "en-US",
//       {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       }
//     );
//   };

//   // =====================================================
//   // NEW: DELETE REVIEW
//   // (poori tarah isolated — koi bhi error yahan sirf reviews
//   // section ko affect karega, baaki dashboard bilkul safe rahega)
//   // =====================================================

//   const handleDeleteReview = async (reviewId) => {
//     if (!reviewId) return;

//     const confirmed = window.confirm(
//       "Are you sure you want to delete this review?"
//     );

//     if (!confirmed) return;

//     try {
//       setDeletingReviewId(reviewId);

//       const token = localStorage.getItem("adminToken");

//       if (!token) {
//         navigate("/admin/login");
//         return;
//       }

//       await deleteReview(reviewId, token);

//       setReviews((previousReviews) =>
//         previousReviews.filter(
//           (review) =>
//             (review._id || review.id) !== reviewId
//         )
//       );
//     } catch (error) {
//       console.error("Delete review error:", error);

//       if (error.response?.status === 401) {
//         localStorage.removeItem("adminToken");
//         navigate("/admin/login");
//         return;
//       }

//       alert(
//         error.response?.data?.message ||
//           "Review delete nahi ho saka."
//       );
//     } finally {
//       setDeletingReviewId(null);
//     }
//   };

//   // =====================================================
//   // NEW: EDIT REVIEW
//   // (delete se bilkul alag state/handlers — dono ek dusre
//   // ko kabhi touch nahi karte, is liye ek fail ho to
//   // dusra unaffected rehta hai)
//   // =====================================================

//   const openEditReviewModal = (review) => {
//     if (!review) return;

//     setEditingReview(review);
//     setEditReviewName(review.name || "");
//     setEditReviewProfession(review.profession || "");
//     setEditReviewMessage(review.message || "");
//     setEditReviewRating(Number(review.rating) || 5);
//     setEditReviewImage(null);
//   };

//   const closeEditReviewModal = () => {
//     if (savingEditReview) return;

//     setEditingReview(null);
//     setEditReviewName("");
//     setEditReviewProfession("");
//     setEditReviewMessage("");
//     setEditReviewRating(5);
//     setEditReviewImage(null);
//   };

//   const handleEditReviewImageChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please select a valid image.");
//       return;
//     }

//     setEditReviewImage(file);
//   };

//   const handleUpdateReview = async (e) => {
//     e.preventDefault();

//     if (!editingReview) return;

//     const reviewId = editingReview._id || editingReview.id;

//     if (!reviewId) {
//       alert("Review id missing, update nahi ho sakta.");
//       return;
//     }

//     try {
//       setSavingEditReview(true);

//       const token = localStorage.getItem("adminToken");

//       if (!token) {
//         navigate("/admin/login");
//         return;
//       }

//       if (!editReviewName.trim()) {
//         alert("Name is required.");
//         return;
//       }

//       if (!editReviewProfession.trim()) {
//         alert("Profession is required.");
//         return;
//       }

//       if (!editReviewMessage.trim()) {
//         alert("Review message is required.");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("name", editReviewName.trim());
//       formData.append("profession", editReviewProfession.trim());
//       formData.append("message", editReviewMessage.trim());
//       formData.append("rating", editReviewRating);

//       if (editReviewImage) {
//         formData.append("image", editReviewImage);
//       }

//       const result = await updateReview(reviewId, formData, token);

//       // Backend { success, data } bhejta hai — dono shapes handle kar rahe hain
//       const updatedReview = result?.data || result;

//       setReviews((previousReviews) =>
//         previousReviews.map((review) =>
//           (review._id || review.id) === reviewId
//             ? { ...review, ...updatedReview }
//             : review
//         )
//       );

//       closeEditReviewModal();
//     } catch (error) {
//       console.error("Update review error:", error);

//       if (error.response?.status === 401) {
//         localStorage.removeItem("adminToken");
//         navigate("/admin/login");
//         return;
//       }

//       alert(
//         error.response?.data?.message ||
//           "Review update nahi ho saka."
//       );
//     } finally {
//       setSavingEditReview(false);
//     }
//   };

//   // =====================================================
//   // NEW: RENDER STARS (safe — rating na ho to bhi crash nahi karega)
//   // =====================================================

//   const renderStars = (rating) => {
//     const safeRating = Math.min(
//       5,
//       Math.max(0, Number(rating) || 0)
//     );

//     return "★".repeat(safeRating) + "☆".repeat(5 - safeRating);
//   };

//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (
//     <div className="vision-dashboard">

//       {/* =====================================================
//           SIDEBAR
//       ===================================================== */}

//       <aside className="vision-sidebar">

//         {/* BRAND */}

//         <div className="vision-brand">

//           <div className="vision-brand-mark">
//             A
//           </div>

//           <div className="vision-brand-text">
//             <h2>Ali Fayyaz</h2>
//             <span>Portfolio Manager</span>
//           </div>

//         </div>


//         {/* NAVIGATION */}

//         <nav className="vision-nav">

//           <button
//             className="vision-nav-item active"
//             onClick={() =>
//               navigate("/admin/dashboard")
//             }
//           >
//             <span className="vision-nav-icon">
//               ⌂
//             </span>

//             <span>Dashboard</span>

//             <span className="nav-arrow">
//               ⌃
//             </span>
//           </button>


//           <button
//             className="vision-nav-item"
//             onClick={() => {}}
//           >
//             <span className="vision-nav-icon">
//               ●
//             </span>

//             <span>Profile</span>
//           </button>


//           <button
//             className="vision-nav-item"
//             onClick={() =>
//               navigate("/admin/projects")
//             }
//           >
//             <span className="vision-nav-icon">
//               ▦
//             </span>

//             <span>Projects</span>

//             <span className="nav-arrow">
//               ⌄
//             </span>
//           </button>


//           {/* CERTIFICATE
//               Existing Project Management */}

//           <button
//             className="vision-nav-item"
//             onClick={() =>
//               navigate("/admin/projects")
//             }
//           >
//             <span className="vision-nav-icon">
//               ▤
//             </span>

//             <span>Certificate</span>

//             <span className="nav-arrow">
//               ⌄
//             </span>
//           </button>

//         </nav>


//         {/* SIDEBAR BOTTOM */}

//         <div className="vision-sidebar-bottom">

//           <button
//             className="vision-bottom-link"
//             onClick={() =>
//               navigate("/admin/login")
//             }
//           >
//             <span className="vision-nav-icon">
//               ↪
//             </span>

//             <span>Sign In</span>
//           </button>


//           <button className="vision-bottom-link">
//             <span className="vision-nav-icon">
//               ＋
//             </span>

//             <span>Sign Up</span>
//           </button>


//           <div className="vision-help-card">

//             <div className="help-wave"></div>

//             <div className="help-content">
//               <strong>Need help?</strong>

//               <span>
//                 Contact your administrator.
//               </span>
//             </div>

//           </div>


//           <button
//             className="vision-logout"
//             onClick={handleLogout}
//           >
//             <span>↪</span>
//             Logout
//           </button>

//         </div>

//       </aside>


//       {/* =====================================================
//           MAIN
//       ===================================================== */}

//       <main className="vision-main">


//         {/* ===================================================
//             TOP BAR
//         =================================================== */}

//         <header className="vision-topbar">

//           <div className="topbar-title">
//             <span>Dashboard</span>
//           </div>


//           <div className="topbar-right">

//             <div className="search-box">

//               <span>⌕</span>

//               <input
//                 type="text"
//                 placeholder="Type here..."
//               />

//             </div>


//             <button
//               className="topbar-action"
//               onClick={() =>
//                 navigate("/admin/add-project")
//               }
//             >
//               <span>＋</span>
//               New Project
//             </button>


//             <button className="topbar-icon">
//               ♧
//             </button>

//             <button className="topbar-icon">
//               ♢
//             </button>

//           </div>

//         </header>


//         {/* ===================================================
//             CONTENT
//         =================================================== */}

//         <div className="vision-content">


//           {/* =================================================
//               WELCOME HEADER
//           ================================================= */}

//           <section className="dashboard-welcome-row">

//             <div>

//               <span className="dashboard-eyebrow">
//                 ADMINISTRATION
//               </span>

//               <h1>
//                 Good to see you,{" "}
//                 <span>Ali Fayyaz</span>
//               </h1>

//               <p>
//                 Here's what's happening with
//                 your portfolio today.
//               </p>

//             </div>


//             <div className="dashboard-date">

//               <span>PORTFOLIO STATUS</span>

//               <strong>
//                 {loadingProjects
//                   ? "Loading..."
//                   : "● Active"}
//               </strong>

//             </div>

//           </section>


//           {/* =================================================
//               STATISTICS
//           ================================================= */}

//           <section className="dashboard-stat-grid">


//             {/* TOTAL PROJECTS */}

//             <div className="dashboard-stat-card">

//               <div className="stat-top">

//                 <span>
//                   TOTAL PROJECTS
//                 </span>

//                 <div className="stat-symbol">
//                   ▦
//                 </div>

//               </div>

//               <div className="stat-value">

//                 {loadingProjects
//                   ? "—"
//                   : statistics.totalProjects}

//               </div>

//               <p>
//                 Projects currently in your
//                 portfolio.
//               </p>

//             </div>


//             {/* TOTAL IMAGES */}

//             <div className="dashboard-stat-card">

//               <div className="stat-top">

//                 <span>
//                   TOTAL IMAGES
//                 </span>

//                 <div className="stat-symbol">
//                   ◈
//                 </div>

//               </div>

//               <div className="stat-value">

//                 {loadingProjects
//                   ? "—"
//                   : statistics.totalImages}

//               </div>

//               <p>
//                 Main and additional project
//                 images.
//               </p>

//             </div>


//             {/* CATEGORIES */}

//             <div className="dashboard-stat-card">

//               <div className="stat-top">

//                 <span>
//                   CATEGORIES
//                 </span>

//                 <div className="stat-symbol">
//                   ◇
//                 </div>

//               </div>

//               <div className="stat-value">

//                 {loadingProjects
//                   ? "—"
//                   : statistics.totalCategories}

//               </div>

//               <p>
//                 Different project categories
//                 available.
//               </p>

//             </div>


//             {/* LATEST PROJECT */}

//             <div className="dashboard-stat-card latest-stat">

//               <div className="stat-top">

//                 <span>
//                   LATEST PROJECT
//                 </span>

//                 <div className="stat-symbol">
//                   ✦
//                 </div>

//               </div>

//               <div className="latest-project-name">

//                 {loadingProjects
//                   ? "Loading..."
//                   : statistics.latestProject
//                   ? statistics.latestProject.title
//                   : "No projects yet"}

//               </div>

//               <p>
//                 {statistics.latestProject
//                   ? formatDate(
//                       statistics.latestProject.createdAt
//                     )
//                   : "Create your first project."}
//               </p>

//             </div>

//           </section>


//           {/* =================================================
//               MAIN INFORMATION GRID
//           ================================================= */}

//           <section className="dashboard-info-grid">


//             {/* =================================================
//                 RECENT PROJECTS
//             ================================================= */}

//             <div className="recent-projects-card">

//               <div className="dashboard-section-heading">

//                 <div>

//                   <span>
//                     PORTFOLIO
//                   </span>

//                   <h2>
//                     Recent Projects
//                   </h2>

//                 </div>


//                 <button
//                   onClick={() =>
//                     navigate("/admin/projects")
//                   }
//                   className="see-all-button"
//                 >
//                   View All →
//                 </button>

//               </div>


//               {loadingProjects ? (

//                 <div className="dashboard-loading">
//                   <div className="dashboard-spinner"></div>
//                   <span>Loading projects...</span>
//                 </div>

//               ) : projectError ? (

//                 <div className="dashboard-error">
//                   <span>!</span>
//                   <p>{projectError}</p>
//                 </div>

//               ) : recentProjects.length === 0 ? (

//                 <div className="dashboard-no-projects">

//                   <div className="empty-project-icon">
//                     ＋
//                   </div>

//                   <h3>
//                     No projects yet
//                   </h3>

//                   <p>
//                     Add your first project to
//                     start building your portfolio.
//                   </p>

//                   <button
//                     onClick={() =>
//                       navigate("/admin/add-project")
//                     }
//                   >
//                     Create Project
//                   </button>

//                 </div>

//               ) : (

//                 <div className="recent-project-list">

//                   {recentProjects.map(
//                     (project, index) => (

//                       <div
//                         className="recent-project-item"
//                         key={
//                           project._id ||
//                           project.id ||
//                           index
//                         }
//                       >

//                         <div className="recent-project-image">

//                           {project.mainImage ? (
//                             <img
//                               src={project.mainImage}
//                               alt={project.title}
//                             />
//                           ) : (
//                             <span>IMG</span>
//                           )}

//                         </div>


//                         <div className="recent-project-info">

//                           <span>
//                             {project.category ||
//                               "Uncategorized"}
//                           </span>

//                           <h3>
//                             {project.title}
//                           </h3>

//                           <p>
//                             {formatDate(
//                               project.createdAt
//                             )}
//                           </p>

//                         </div>


//                         <button
//                           className="recent-project-edit"
//                           onClick={() =>
//                             navigate(
//                               "/admin/projects"
//                             )
//                           }
//                         >
//                           EDIT
//                         </button>

//                       </div>

//                     )
//                   )}

//                 </div>

//               )}

//             </div>


//             {/* =================================================
//                 CATEGORY OVERVIEW
//             ================================================= */}

//             <div className="category-overview-card">

//               <div className="dashboard-section-heading">

//                 <div>

//                   <span>
//                     BREAKDOWN
//                   </span>

//                   <h2>
//                     Categories
//                   </h2>

//                 </div>

//               </div>


//               {loadingProjects ? (

//                 <div className="category-loading">
//                   Loading...
//                 </div>

//               ) : statistics.categoryCounts.length === 0 ? (

//                 <div className="category-empty">
//                   No category data available.
//                 </div>

//               ) : (

//                 <div className="category-list">

//                   {statistics.categoryCounts
//                     .slice(0, 5)
//                     .map((item) => {

//                       const percentage =
//                         Math.max(
//                           8,
//                           Math.round(
//                             (item.count /
//                               maxCategoryCount) *
//                               100
//                           )
//                         );

//                       return (
//                         <div
//                           className="category-row"
//                           key={item.category}
//                         >

//                           <div className="category-row-top">

//                             <span>
//                               {item.category}
//                             </span>

//                             <strong>
//                               {item.count}
//                             </strong>

//                           </div>


//                           <div className="category-bar">

//                             <div
//                               style={{
//                                 width:
//                                   `${percentage}%`,
//                               }}
//                             ></div>

//                           </div>

//                         </div>
//                       );
//                     })}

//                 </div>

//               )}


//               <div className="category-total">

//                 <span>
//                   Total categories
//                 </span>

//                 <strong>
//                   {loadingProjects
//                     ? "—"
//                     : statistics.totalCategories}
//                 </strong>

//               </div>

//             </div>

//           </section>


//           {/* =================================================
//               NEW: RECENT REVIEWS
//               Existing classNames hi reuse kiye hain
//               (recent-projects-card / recent-project-list /
//               dashboard-loading / dashboard-error /
//               dashboard-no-projects / dashboard-section-heading)
//               taake bilkul same design ke sath render ho,
//               koi nayi CSS add karne ki zaroorat nahi.
//           ================================================= */}

//           <section className="dashboard-info-grid">

//             <div className="recent-projects-card">

//               <div className="dashboard-section-heading">

//                 <div>

//                   <span>
//                     FEEDBACK
//                   </span>

//                   <h2>
//                     Recent Reviews
//                   </h2>

//                 </div>

//                 <span className="see-all-button">
//                   {loadingReviews
//                     ? "..."
//                     : `${reviewStatistics.totalReviews} total`}
//                 </span>

//               </div>


//               {loadingReviews ? (

//                 <div className="dashboard-loading">
//                   <div className="dashboard-spinner"></div>
//                   <span>Loading reviews...</span>
//                 </div>

//               ) : reviewsError ? (

//                 <div className="dashboard-error">
//                   <span>!</span>
//                   <p>{reviewsError}</p>
//                 </div>

//               ) : recentReviews.length === 0 ? (

//                 <div className="dashboard-no-projects">

//                   <div className="empty-project-icon">
//                     ✦
//                   </div>

//                   <h3>
//                     No reviews yet
//                   </h3>

//                   <p>
//                     Reviews added from the Projects
//                     page will show up here.
//                   </p>

//                 </div>

//               ) : (

//                 <div className="recent-project-list">

//                   {recentReviews.map((review, index) => (

//                     <div
//                       className="recent-project-item"
//                       key={review._id || review.id || index}
//                     >

//                       <div className="recent-project-image">

//                         {review.image ? (
//                           <img
//                             src={review.image}
//                             alt={review.name || "Reviewer"}
//                           />
//                         ) : (
//                           <span>IMG</span>
//                         )}

//                       </div>


//                       <div className="recent-project-info">

//                         <span>
//                           {review.profession ||
//                             "Client"}
//                         </span>

//                         <h3>
//                           {review.name || "Anonymous"}
//                         </h3>

//                         <p
//                           title={review.message || ""}
//                         >
//                           {renderStars(review.rating)}
//                           {"  "}
//                           {(review.message || "").length > 60
//                             ? `${review.message.slice(0, 60)}...`
//                             : review.message || "No message"}
//                         </p>

//                       </div>


//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "flex-end",
//                           gap: "6px",
//                         }}
//                       >

//                         <span
//                           className="recent-project-edit"
//                           title={`${review.rating || 0} / 5 stars`}
//                         >
//                           {review.rating || 0}★
//                         </span>

//                         <button
//                           className="recent-project-edit"
//                           onClick={() =>
//                             openEditReviewModal(review)
//                           }
//                         >
//                           Edit
//                         </button>

//                         <button
//                           className="recent-project-edit"
//                           onClick={() =>
//                             handleDeleteReview(
//                               review._id || review.id
//                             )
//                           }
//                           disabled={
//                             deletingReviewId ===
//                             (review._id || review.id)
//                           }
//                         >
//                           {deletingReviewId ===
//                           (review._id || review.id)
//                             ? "..."
//                             : "Delete"}
//                         </button>

//                       </div>

//                     </div>

//                   ))}

//                 </div>

//               )}


//               {!loadingReviews &&
//                 !reviewsError &&
//                 reviewStatistics.totalReviews > 0 && (
//                   <div className="category-total">
//                     <span>Average rating</span>
//                     <strong>
//                       {reviewStatistics.averageRating} / 5
//                     </strong>
//                   </div>
//                 )}

//             </div>

//           </section>


//           {/* =================================================
//               NEW: EDIT REVIEW MODAL
//               Inline styles use kiye hain (koi CSS file par
//               depend nahi karta), taake ye har hal mein sahi
//               render ho aur kuch bhi visually toota hua na lage.
//           ================================================= */}

//           {editingReview && (
//             <div
//               onClick={
//                 savingEditReview
//                   ? undefined
//                   : closeEditReviewModal
//               }
//               style={{
//                 position: "fixed",
//                 inset: 0,
//                 background: "rgba(0, 0, 0, 0.55)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 zIndex: 1000,
//                 padding: "20px",
//               }}
//             >

//               <div
//                 onClick={(e) => e.stopPropagation()}
//                 style={{
//                   background: "#fff",
//                   borderRadius: "14px",
//                   width: "100%",
//                   maxWidth: "480px",
//                   maxHeight: "90vh",
//                   overflowY: "auto",
//                   padding: "24px",
//                   boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
//                 }}
//               >

//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     marginBottom: "18px",
//                   }}
//                 >
//                   <h2 style={{ margin: 0, fontSize: "20px" }}>
//                     Edit Review
//                   </h2>

//                   <button
//                     type="button"
//                     onClick={closeEditReviewModal}
//                     disabled={savingEditReview}
//                     style={{
//                       background: "none",
//                       border: "none",
//                       fontSize: "22px",
//                       cursor: "pointer",
//                       lineHeight: 1,
//                     }}
//                   >
//                     ×
//                   </button>
//                 </div>

//                 <form onSubmit={handleUpdateReview}>

//                   <div style={{ marginBottom: "16px" }}>

//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "14px",
//                         marginBottom: "10px",
//                       }}
//                     >
//                       <img
//                         src={
//                           editReviewImage
//                             ? URL.createObjectURL(editReviewImage)
//                             : editingReview.image || ""
//                         }
//                         alt="Reviewer"
//                         style={{
//                           width: "56px",
//                           height: "56px",
//                           borderRadius: "50%",
//                           objectFit: "cover",
//                           background: "#eee",
//                         }}
//                         onError={(e) => {
//                           e.currentTarget.style.visibility = "hidden";
//                         }}
//                       />

//                       <label
//                         style={{
//                           border: "1px solid #ddd",
//                           borderRadius: "8px",
//                           padding: "8px 14px",
//                           fontSize: "13px",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Change Image
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleEditReviewImageChange}
//                           style={{ display: "none" }}
//                         />
//                       </label>
//                     </div>

//                   </div>

//                   <div style={{ marginBottom: "14px" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         fontSize: "13px",
//                         marginBottom: "6px",
//                       }}
//                     >
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       value={editReviewName}
//                       onChange={(e) =>
//                         setEditReviewName(e.target.value)
//                       }
//                       required
//                       style={{
//                         width: "100%",
//                         padding: "10px 12px",
//                         borderRadius: "8px",
//                         border: "1px solid #ddd",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                   </div>

//                   <div style={{ marginBottom: "14px" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         fontSize: "13px",
//                         marginBottom: "6px",
//                       }}
//                     >
//                       Profession
//                     </label>
//                     <input
//                       type="text"
//                       value={editReviewProfession}
//                       onChange={(e) =>
//                         setEditReviewProfession(e.target.value)
//                       }
//                       required
//                       style={{
//                         width: "100%",
//                         padding: "10px 12px",
//                         borderRadius: "8px",
//                         border: "1px solid #ddd",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                   </div>

//                   <div style={{ marginBottom: "14px" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         fontSize: "13px",
//                         marginBottom: "6px",
//                       }}
//                     >
//                       Message
//                     </label>
//                     <textarea
//                       value={editReviewMessage}
//                       onChange={(e) =>
//                         setEditReviewMessage(e.target.value)
//                       }
//                       rows="4"
//                       required
//                       style={{
//                         width: "100%",
//                         padding: "10px 12px",
//                         borderRadius: "8px",
//                         border: "1px solid #ddd",
//                         boxSizing: "border-box",
//                         resize: "vertical",
//                       }}
//                     />
//                   </div>

//                   <div style={{ marginBottom: "20px" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         fontSize: "13px",
//                         marginBottom: "6px",
//                       }}
//                     >
//                       Rating
//                     </label>
//                     <select
//                       value={editReviewRating}
//                       onChange={(e) =>
//                         setEditReviewRating(Number(e.target.value))
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "10px 12px",
//                         borderRadius: "8px",
//                         border: "1px solid #ddd",
//                         boxSizing: "border-box",
//                       }}
//                     >
//                       <option value={5}>★★★★★ (5)</option>
//                       <option value={4}>★★★★☆ (4)</option>
//                       <option value={3}>★★★☆☆ (3)</option>
//                       <option value={2}>★★☆☆☆ (2)</option>
//                       <option value={1}>★☆☆☆☆ (1)</option>
//                     </select>
//                   </div>

//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "flex-end",
//                       gap: "10px",
//                     }}
//                   >
//                     <button
//                       type="button"
//                       onClick={closeEditReviewModal}
//                       disabled={savingEditReview}
//                       style={{
//                         padding: "10px 18px",
//                         borderRadius: "8px",
//                         border: "1px solid #ddd",
//                         background: "#fff",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Cancel
//                     </button>

//                     <button
//                       type="submit"
//                       disabled={savingEditReview}
//                       style={{
//                         padding: "10px 18px",
//                         borderRadius: "8px",
//                         border: "none",
//                         background: "#111",
//                         color: "#fff",
//                         cursor: "pointer",
//                       }}
//                     >
//                       {savingEditReview
//                         ? "Saving..."
//                         : "Save Changes"}
//                     </button>
//                   </div>

//                 </form>

//               </div>

//             </div>
//           )}


//           {/* =================================================
//               QUICK ACTIONS
//           ================================================= */}

//           <section className="quick-actions-section">

//             <div className="dashboard-section-heading">

//               <div>

//                 <span>
//                   QUICK ACTIONS
//                 </span>

//                 <h2>
//                   Manage your portfolio
//                 </h2>

//               </div>

//             </div>


//             <div className="quick-action-grid">


//               {/* ADD */}

//               <button
//                 className="quick-action-card"
//                 onClick={() =>
//                   navigate("/admin/add-project")
//                 }
//               >

//                 <div className="quick-action-icon">
//                   ＋
//                 </div>

//                 <div>
//                   <h3>
//                     Add New Project
//                   </h3>

//                   <p>
//                     Upload a new project,
//                     images and details.
//                   </p>
//                 </div>

//                 <span className="quick-arrow">
//                   →
//                 </span>

//               </button>


//               {/* MANAGE */}

//               <button
//                 className="quick-action-card"
//                 onClick={() =>
//                   navigate("/admin/projects")
//                 }
//               >

//                 <div className="quick-action-icon">
//                   ▦
//                 </div>

//                 <div>
//                   <h3>
//                     Manage Projects
//                   </h3>

//                   <p>
//                     Edit, update or delete
//                     existing projects.
//                   </p>
//                 </div>

//                 <span className="quick-arrow">
//                   →
//                 </span>

//               </button>


//               {/* WEBSITE */}

//               <button
//                 className="quick-action-card"
//                 onClick={() =>
//                   navigate("/")
//                 }
//               >

//                 <div className="quick-action-icon">
//                   ↗
//                 </div>

//                 <div>
//                   <h3>
//                     View Website
//                   </h3>

//                   <p>
//                     Open the public portfolio
//                     website.
//                   </p>
//                 </div>

//                 <span className="quick-arrow">
//                   →
//                 </span>

//               </button>

//             </div>

//           </section>


//           {/* =================================================
//               PORTFOLIO INSIGHT
//           ================================================= */}

//           <section className="portfolio-insight">

//             <div className="insight-icon">
//               ✦
//             </div>

//             <div className="insight-content">

//               <span>
//                 PORTFOLIO INSIGHT
//               </span>

//               <h2>
//                 Your portfolio at a glance
//               </h2>

//               <p>
//                 You currently have{" "}
//                 <strong>
//                   {loadingProjects
//                     ? "..."
//                     : statistics.totalProjects}
//                 </strong>{" "}
//                 project
//                 {statistics.totalProjects === 1
//                   ? ""
//                   : "s"} and{" "}
//                 <strong>
//                   {loadingProjects
//                     ? "..."
//                     : statistics.totalImages}
//                 </strong>{" "}
//                 image
//                 {statistics.totalImages === 1
//                   ? ""
//                   : "s"} across{" "}
//                 <strong>
//                   {loadingProjects
//                     ? "..."
//                     : statistics.totalCategories}
//                 </strong>{" "}
//                 categor
//                 {statistics.totalCategories === 1
//                   ? "y"
//                   : "ies"}.
//               </p>

//             </div>


//             <button
//               onClick={() =>
//                 navigate("/admin/projects")
//               }
//               className="insight-button"
//             >
//               Manage Portfolio →
//             </button>

//           </section>


//           {/* =================================================
//               FOOTER
//           ================================================= */}

//           <footer className="vision-footer">

//             <span>
//               © {new Date().getFullYear()} Ali Fayyaz
//             </span>

//             <div>

//               <span>
//                 Help Center
//               </span>

//               <span>
//                 Privacy
//               </span>

//               <span
//                 onClick={handleLogout}
//               >
//                 Logout
//               </span>

//             </div>

//           </footer>

//         </div>

//       </main>

//     </div>
//   );
// };

// export default AdminDashboard;




























import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProjects } from "../../api/projectApi";

// Reviews API (existing)
import { getReviews, deleteReview, updateReview } from "../../api/reviewApi";

// NEW: Tools / Skills API (see toolApi.js)
import {
  getAllTools,
  createTool,
  updateTool,
  deleteTool,
  getToolImageUrl,
} from "../../api/toolApi";

import "./AdminDashboard3.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectError, setProjectError] = useState("");

  // =====================================================
  // REVIEWS STATE (project state se poori tarah alag,
  // ek doosre ko touch nahi karte)
  // =====================================================

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState("");

  const [deletingReviewId, setDeletingReviewId] = useState(null);

  const [editingReview, setEditingReview] = useState(null);
  const [editReviewName, setEditReviewName] = useState("");
  const [editReviewProfession, setEditReviewProfession] = useState("");
  const [editReviewMessage, setEditReviewMessage] = useState("");
  const [editReviewRating, setEditReviewRating] = useState(5);
  const [editReviewImage, setEditReviewImage] = useState(null);
  const [savingEditReview, setSavingEditReview] = useState(false);

  // =====================================================
  // NEW: TOOLS / SKILLS STATE
  // (projects aur reviews se poori tarah alag — koi bhi
  // ek fail ho to baaki do bilkul unaffected rehte hain)
  // =====================================================

  const [tools, setTools] = useState([]);
  const [loadingTools, setLoadingTools] = useState(true);
  const [toolsError, setToolsError] = useState("");

  const [deletingToolId, setDeletingToolId] = useState(null);
  const [togglingToolId, setTogglingToolId] = useState(null);

  // NEW: ADD TOOL modal state
  const [showAddToolModal, setShowAddToolModal] = useState(false);
  const [newToolName, setNewToolName] = useState("");
  const [newToolPercentage, setNewToolPercentage] = useState(50);
  const [newToolOrder, setNewToolOrder] = useState(0);
  const [newToolImage, setNewToolImage] = useState(null);
  const [savingNewTool, setSavingNewTool] = useState(false);

  // NEW: EDIT TOOL modal state — add/delete se bilkul alag
  const [editingTool, setEditingTool] = useState(null);
  const [editToolName, setEditToolName] = useState("");
  const [editToolPercentage, setEditToolPercentage] = useState(50);
  const [editToolOrder, setEditToolOrder] = useState(0);
  const [editToolImage, setEditToolImage] = useState(null);
  const [savingEditTool, setSavingEditTool] = useState(false);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // =====================================================
  // FETCH PROJECTS
  // =====================================================

  useEffect(() => {
    const fetchDashboardProjects = async () => {
      try {
        setLoadingProjects(true);
        setProjectError("");

        const data = await getProjects();

        setProjects(data?.projects || []);
      } catch (error) {
        console.error("Dashboard projects error:", error);

        setProjectError(
          error.response?.data?.message ||
            "Unable to load portfolio information."
        );
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchDashboardProjects();
  }, []);

  // =====================================================
  // FETCH REVIEWS
  // (isolated try/catch — is fail hone se projects wala
  // data kabhi crash nahi hoga)
  // =====================================================

  useEffect(() => {
    const fetchDashboardReviews = async () => {
      try {
        setLoadingReviews(true);
        setReviewsError("");

        const data = await getReviews();

        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.reviews)
          ? data.reviews
          : Array.isArray(data)
          ? data
          : [];

        setReviews(list);
      } catch (error) {
        console.error("Dashboard reviews error:", error);

        setReviewsError(
          error.response?.data?.message ||
            "Unable to load reviews."
        );
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchDashboardReviews();
  }, []);

  // =====================================================
  // NEW: FETCH TOOLS
  // (poori tarah isolated — token missing ho, request fail
  // ho, ya response ka shape ajeeb ho, kuch bhi ho, projects
  // aur reviews wala data kabhi crash nahi hoga)
  // =====================================================

  useEffect(() => {
    const fetchDashboardTools = async () => {
      try {
        setLoadingTools(true);
        setToolsError("");

        const token = localStorage.getItem("adminToken");

        if (!token) {
          setToolsError("Please sign in again to manage skills.");
          setTools([]);
          return;
        }

        const data = await getAllTools(token);

        // Backend { success, data } bhejta hai — dono shapes
        // safely handle kar rahe hain taake kabhi crash na ho
        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.tools)
          ? data.tools
          : Array.isArray(data)
          ? data
          : [];

        setTools(list);
      } catch (error) {
        console.error("Dashboard tools error:", error);

        if (error.response?.status === 401) {
          // Sirf tools section ke liye state set karte hain —
          // poore dashboard ko logout / redirect nahi karte,
          // taake reviews/projects section unaffected rahe
          setToolsError("Session expired. Please sign in again to manage skills.");
        } else {
          setToolsError(
            error.response?.data?.message ||
              "Unable to load skills."
          );
        }
      } finally {
        setLoadingTools(false);
      }
    };

    fetchDashboardTools();
  }, []);

  // =====================================================
  // DASHBOARD STATISTICS
  // =====================================================

  const statistics = useMemo(() => {
    const totalProjects = projects.length;

    const totalImages = projects.reduce((total, project) => {
      const additional =
        Array.isArray(project.additionalImages)
          ? project.additionalImages.length
          : 0;

      return total + 1 + additional;
    }, 0);

    const uniqueCategories = [
      ...new Set(
        projects
          .map((project) => project.category)
          .filter(Boolean)
      ),
    ];

    const categoryCounts = uniqueCategories
      .map((category) => {
        const count = projects.filter(
          (project) =>
            project.category === category
        ).length;

        return {
          category,
          count,
        };
      })
      .sort((a, b) => b.count - a.count);

    const latestProject =
      projects.length > 0
        ? projects[0]
        : null;

    return {
      totalProjects,
      totalImages,
      totalCategories: uniqueCategories.length,
      categoryCounts,
      latestProject,
    };
  }, [projects]);

  // =====================================================
  // REVIEW STATISTICS (safe defaults, kabhi NaN nahi dega)
  // =====================================================

  const reviewStatistics = useMemo(() => {
    const totalReviews = reviews.length;

    const averageRating =
      totalReviews > 0
        ? (
            reviews.reduce(
              (sum, review) =>
                sum + (Number(review?.rating) || 0),
              0
            ) / totalReviews
          ).toFixed(1)
        : "0.0";

    return { totalReviews, averageRating };
  }, [reviews]);

  // =====================================================
  // NEW: TOOL STATISTICS (safe defaults, kabhi NaN nahi dega)
  // =====================================================

  const toolStatistics = useMemo(() => {
    const totalTools = tools.length;

    const activeTools = tools.filter(
      (tool) => tool?.isActive !== false
    ).length;

    const averagePercentage =
      totalTools > 0
        ? Math.round(
            tools.reduce(
              (sum, tool) => sum + (Number(tool?.percentage) || 0),
              0
            ) / totalTools
          )
        : 0;

    return { totalTools, activeTools, averagePercentage };
  }, [tools]);

  // =====================================================
  // RECENT PROJECTS
  // =====================================================

  const recentProjects = useMemo(() => {
    return projects.slice(0, 4);
  }, [projects]);

  // =====================================================
  // RECENT REVIEWS
  // =====================================================

  const recentReviews = useMemo(() => {
    return reviews.slice(0, 4);
  }, [reviews]);

  // =====================================================
  // NEW: SORTED TOOLS (order field ke hisaab se — same
  // sorting jo public Skills.jsx me backend se aati hai)
  // =====================================================

  const sortedTools = useMemo(() => {
    return [...tools].sort((a, b) => {
      const orderA = Number(a?.order) || 0;
      const orderB = Number(b?.order) || 0;
      return orderA - orderB;
    });
  }, [tools]);

  // =====================================================
  // CATEGORY MAX
  // =====================================================

  const maxCategoryCount =
    statistics.categoryCounts.length > 0
      ? Math.max(
          ...statistics.categoryCounts.map(
            (item) => item.count
          )
        )
      : 1;

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "Recently";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently";
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // DELETE REVIEW
  // =====================================================

  const handleDeleteReview = async (reviewId) => {
    if (!reviewId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    try {
      setDeletingReviewId(reviewId);

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      await deleteReview(reviewId, token);

      setReviews((previousReviews) =>
        previousReviews.filter(
          (review) =>
            (review._id || review.id) !== reviewId
        )
      );
    } catch (error) {
      console.error("Delete review error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Review delete nahi ho saka."
      );
    } finally {
      setDeletingReviewId(null);
    }
  };

  // =====================================================
  // EDIT REVIEW
  // =====================================================

  const openEditReviewModal = (review) => {
    if (!review) return;

    setEditingReview(review);
    setEditReviewName(review.name || "");
    setEditReviewProfession(review.profession || "");
    setEditReviewMessage(review.message || "");
    setEditReviewRating(Number(review.rating) || 5);
    setEditReviewImage(null);
  };

  const closeEditReviewModal = () => {
    if (savingEditReview) return;

    setEditingReview(null);
    setEditReviewName("");
    setEditReviewProfession("");
    setEditReviewMessage("");
    setEditReviewRating(5);
    setEditReviewImage(null);
  };

  const handleEditReviewImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    setEditReviewImage(file);
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();

    if (!editingReview) return;

    const reviewId = editingReview._id || editingReview.id;

    if (!reviewId) {
      alert("Review id missing, update nahi ho sakta.");
      return;
    }

    try {
      setSavingEditReview(true);

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      if (!editReviewName.trim()) {
        alert("Name is required.");
        return;
      }

      if (!editReviewProfession.trim()) {
        alert("Profession is required.");
        return;
      }

      if (!editReviewMessage.trim()) {
        alert("Review message is required.");
        return;
      }

      const formData = new FormData();
      formData.append("name", editReviewName.trim());
      formData.append("profession", editReviewProfession.trim());
      formData.append("message", editReviewMessage.trim());
      formData.append("rating", editReviewRating);

      if (editReviewImage) {
        formData.append("image", editReviewImage);
      }

      const result = await updateReview(reviewId, formData, token);

      const updatedReview = result?.data || result;

      setReviews((previousReviews) =>
        previousReviews.map((review) =>
          (review._id || review.id) === reviewId
            ? { ...review, ...updatedReview }
            : review
        )
      );

      closeEditReviewModal();
    } catch (error) {
      console.error("Update review error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Review update nahi ho saka."
      );
    } finally {
      setSavingEditReview(false);
    }
  };

  // =====================================================
  // RENDER STARS
  // =====================================================

  const renderStars = (rating) => {
    const safeRating = Math.min(
      5,
      Math.max(0, Number(rating) || 0)
    );

    return "★".repeat(safeRating) + "☆".repeat(5 - safeRating);
  };

  // =====================================================
  // NEW: ADD TOOL
  // (delete/edit se bilkul alag state/handlers — koi ek
  // fail ho to baaki do unaffected rehte hain)
  // =====================================================

  const openAddToolModal = () => {
    setNewToolName("");
    setNewToolPercentage(50);
    setNewToolOrder(tools.length);
    setNewToolImage(null);
    setShowAddToolModal(true);
  };

  const closeAddToolModal = () => {
    if (savingNewTool) return;
    setShowAddToolModal(false);
  };

  const handleNewToolImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    setNewToolImage(file);
  };

  const handleCreateTool = async (e) => {
    e.preventDefault();

    if (!newToolName.trim()) {
      alert("Skill/Tool name is required.");
      return;
    }

    const percentageNum = Number(newToolPercentage);

    if (Number.isNaN(percentageNum) || percentageNum < 0 || percentageNum > 100) {
      alert("Percentage 0 se 100 ke darmiyan hona chahiye.");
      return;
    }

    try {
      setSavingNewTool(true);

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      const formData = new FormData();
      formData.append("name", newToolName.trim());
      formData.append("percentage", percentageNum);
      formData.append("order", Number(newToolOrder) || 0);

      if (newToolImage) {
        formData.append("image", newToolImage);
      }

      const result = await createTool(formData, token);

      const createdTool = result?.data || result;

      setTools((previousTools) => [...previousTools, createdTool]);

      setShowAddToolModal(false);
    } catch (error) {
      console.error("Create tool error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Skill/Tool add nahi hua."
      );
    } finally {
      setSavingNewTool(false);
    }
  };

  // =====================================================
  // NEW: EDIT TOOL
  // =====================================================

  const openEditToolModal = (tool) => {
    if (!tool) return;

    setEditingTool(tool);
    setEditToolName(tool.name || "");
    setEditToolPercentage(Number(tool.percentage) || 0);
    setEditToolOrder(Number(tool.order) || 0);
    setEditToolImage(null);
  };

  const closeEditToolModal = () => {
    if (savingEditTool) return;

    setEditingTool(null);
    setEditToolName("");
    setEditToolPercentage(50);
    setEditToolOrder(0);
    setEditToolImage(null);
  };

  const handleEditToolImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    setEditToolImage(file);
  };

  const handleUpdateTool = async (e) => {
    e.preventDefault();

    if (!editingTool) return;

    const toolId = editingTool._id || editingTool.id;

    if (!toolId) {
      alert("Tool id missing, update nahi ho sakta.");
      return;
    }

    if (!editToolName.trim()) {
      alert("Skill/Tool name is required.");
      return;
    }

    const percentageNum = Number(editToolPercentage);

    if (Number.isNaN(percentageNum) || percentageNum < 0 || percentageNum > 100) {
      alert("Percentage 0 se 100 ke darmiyan hona chahiye.");
      return;
    }

    try {
      setSavingEditTool(true);

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      const formData = new FormData();
      formData.append("name", editToolName.trim());
      formData.append("percentage", percentageNum);
      formData.append("order", Number(editToolOrder) || 0);

      if (editToolImage) {
        formData.append("image", editToolImage);
      }

      const result = await updateTool(toolId, formData, token);

      const updatedTool = result?.data || result;

      setTools((previousTools) =>
        previousTools.map((tool) =>
          (tool._id || tool.id) === toolId
            ? { ...tool, ...updatedTool }
            : tool
        )
      );

      closeEditToolModal();
    } catch (error) {
      console.error("Update tool error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Skill/Tool update nahi hua."
      );
    } finally {
      setSavingEditTool(false);
    }
  };

  // =====================================================
  // NEW: DELETE TOOL
  // =====================================================

  const handleDeleteTool = async (toolId) => {
    if (!toolId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this skill/tool?"
    );

    if (!confirmed) return;

    try {
      setDeletingToolId(toolId);

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      await deleteTool(toolId, token);

      setTools((previousTools) =>
        previousTools.filter(
          (tool) => (tool._id || tool.id) !== toolId
        )
      );
    } catch (error) {
      console.error("Delete tool error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Skill/Tool delete nahi hua."
      );
    } finally {
      setDeletingToolId(null);
    }
  };

  // =====================================================
  // NEW: TOGGLE TOOL ACTIVE/INACTIVE
  // (public website par sirf isActive: true tools dikhte
  // hain, is liye admin ko yahi se on/off karne dete hain)
  // =====================================================

  const handleToggleToolActive = async (tool) => {
    const toolId = tool?._id || tool?.id;
    if (!toolId) return;

    try {
      setTogglingToolId(toolId);

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      const formData = new FormData();
      formData.append("isActive", !(tool.isActive !== false));

      const result = await updateTool(toolId, formData, token);
      const updatedTool = result?.data || result;

      setTools((previousTools) =>
        previousTools.map((t) =>
          (t._id || t.id) === toolId
            ? { ...t, ...updatedTool }
            : t
        )
      );
    } catch (error) {
      console.error("Toggle tool active error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Status update nahi hua."
      );
    } finally {
      setTogglingToolId(null);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="vision-dashboard">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="vision-sidebar">

        {/* BRAND */}

        <div className="vision-brand">

          <div className="vision-brand-mark">
            A
          </div>

          <div className="vision-brand-text">
            <h2>Ali Fayyaz</h2>
            <span>Portfolio Manager</span>
          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="vision-nav">

          <button
            className="vision-nav-item active"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <span className="vision-nav-icon">
              ⌂
            </span>

            <span>Dashboard</span>

            <span className="nav-arrow">
              ⌃
            </span>
          </button>


          <button
            className="vision-nav-item"
            onClick={() => {}}
          >
            <span className="vision-nav-icon">
              ●
            </span>

            <span>Profile</span>
          </button>


          <button
            className="vision-nav-item"
            onClick={() =>
              navigate("/admin/projects")
            }
          >
            <span className="vision-nav-icon">
              ▦
            </span>

            <span>Projects</span>

            <span className="nav-arrow">
              ⌄
            </span>
          </button>


          {/* CERTIFICATE
              Existing Project Management */}

          <button
            className="vision-nav-item"
            onClick={() =>
              navigate("/admin/projects")
            }
          >
            <span className="vision-nav-icon">
              ▤
            </span>

            <span>Certificate</span>

            <span className="nav-arrow">
              ⌄
            </span>
          </button>

        </nav>


        {/* SIDEBAR BOTTOM */}

        <div className="vision-sidebar-bottom">

          <button
            className="vision-bottom-link"
            onClick={() =>
              navigate("/admin/login")
            }
          >
            <span className="vision-nav-icon">
              ↪
            </span>

            <span>Sign In</span>
          </button>


          <button className="vision-bottom-link">
            <span className="vision-nav-icon">
              ＋
            </span>

            <span>Sign Up</span>
          </button>


          <div className="vision-help-card">

            <div className="help-wave"></div>

            <div className="help-content">
              <strong>Need help?</strong>

              <span>
                Contact your administrator.
              </span>
            </div>

          </div>


          <button
            className="vision-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="vision-main">


        {/* ===================================================
            TOP BAR
        =================================================== */}

        <header className="vision-topbar">

          <div className="topbar-title">
            <span>Dashboard</span>
          </div>


          <div className="topbar-right">

            <div className="search-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Type here..."
              />

            </div>


            <button
              className="topbar-action"
              onClick={() =>
                navigate("/admin/add-project")
              }
            >
              <span>＋</span>
              New Project
            </button>


            <button className="topbar-icon">
              ♧
            </button>

            <button className="topbar-icon">
              ♢
            </button>

          </div>

        </header>


        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="vision-content">


          {/* =================================================
              WELCOME HEADER
          ================================================= */}

          <section className="dashboard-welcome-row">

            <div>

              <span className="dashboard-eyebrow">
                ADMINISTRATION
              </span>

              <h1>
                Good to see you,{" "}
                <span>Ali Fayyaz</span>
              </h1>

              <p>
                Here's what's happening with
                your portfolio today.
              </p>

            </div>


            <div className="dashboard-date">

              <span>PORTFOLIO STATUS</span>

              <strong>
                {loadingProjects
                  ? "Loading..."
                  : "● Active"}
              </strong>

            </div>

          </section>


          {/* =================================================
              STATISTICS
          ================================================= */}

          <section className="dashboard-stat-grid">


            {/* TOTAL PROJECTS */}

            <div className="dashboard-stat-card">

              <div className="stat-top">

                <span>
                  TOTAL PROJECTS
                </span>

                <div className="stat-symbol">
                  ▦
                </div>

              </div>

              <div className="stat-value">

                {loadingProjects
                  ? "—"
                  : statistics.totalProjects}

              </div>

              <p>
                Projects currently in your
                portfolio.
              </p>

            </div>


            {/* TOTAL IMAGES */}

            <div className="dashboard-stat-card">

              <div className="stat-top">

                <span>
                  TOTAL IMAGES
                </span>

                <div className="stat-symbol">
                  ◈
                </div>

              </div>

              <div className="stat-value">

                {loadingProjects
                  ? "—"
                  : statistics.totalImages}

              </div>

              <p>
                Main and additional project
                images.
              </p>

            </div>


            {/* CATEGORIES */}

            <div className="dashboard-stat-card">

              <div className="stat-top">

                <span>
                  CATEGORIES
                </span>

                <div className="stat-symbol">
                  ◇
                </div>

              </div>

              <div className="stat-value">

                {loadingProjects
                  ? "—"
                  : statistics.totalCategories}

              </div>

              <p>
                Different project categories
                available.
              </p>

            </div>


            {/* LATEST PROJECT */}

            <div className="dashboard-stat-card latest-stat">

              <div className="stat-top">

                <span>
                  LATEST PROJECT
                </span>

                <div className="stat-symbol">
                  ✦
                </div>

              </div>

              <div className="latest-project-name">

                {loadingProjects
                  ? "Loading..."
                  : statistics.latestProject
                  ? statistics.latestProject.title
                  : "No projects yet"}

              </div>

              <p>
                {statistics.latestProject
                  ? formatDate(
                      statistics.latestProject.createdAt
                    )
                  : "Create your first project."}
              </p>

            </div>

          </section>


          {/* =================================================
              MAIN INFORMATION GRID
          ================================================= */}

          <section className="dashboard-info-grid">


            {/* =================================================
                RECENT PROJECTS
            ================================================= */}

            <div className="recent-projects-card">

              <div className="dashboard-section-heading">

                <div>

                  <span>
                    PORTFOLIO
                  </span>

                  <h2>
                    Recent Projects
                  </h2>

                </div>


                <button
                  onClick={() =>
                    navigate("/admin/projects")
                  }
                  className="see-all-button"
                >
                  View All →
                </button>

              </div>


              {loadingProjects ? (

                <div className="dashboard-loading">
                  <div className="dashboard-spinner"></div>
                  <span>Loading projects...</span>
                </div>

              ) : projectError ? (

                <div className="dashboard-error">
                  <span>!</span>
                  <p>{projectError}</p>
                </div>

              ) : recentProjects.length === 0 ? (

                <div className="dashboard-no-projects">

                  <div className="empty-project-icon">
                    ＋
                  </div>

                  <h3>
                    No projects yet
                  </h3>

                  <p>
                    Add your first project to
                    start building your portfolio.
                  </p>

                  <button
                    onClick={() =>
                      navigate("/admin/add-project")
                    }
                  >
                    Create Project
                  </button>

                </div>

              ) : (

                <div className="recent-project-list">

                  {recentProjects.map(
                    (project, index) => (

                      <div
                        className="recent-project-item"
                        key={
                          project._id ||
                          project.id ||
                          index
                        }
                      >

                        <div className="recent-project-image">

                          {project.mainImage ? (
                            <img
                              src={project.mainImage}
                              alt={project.title}
                            />
                          ) : (
                            <span>IMG</span>
                          )}

                        </div>


                        <div className="recent-project-info">

                          <span>
                            {project.category ||
                              "Uncategorized"}
                          </span>

                          <h3>
                            {project.title}
                          </h3>

                          <p>
                            {formatDate(
                              project.createdAt
                            )}
                          </p>

                        </div>


                        <button
                          className="recent-project-edit"
                          onClick={() =>
                            navigate(
                              "/admin/projects"
                            )
                          }
                        >
                          EDIT
                        </button>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>


            {/* =================================================
                CATEGORY OVERVIEW
            ================================================= */}

            <div className="category-overview-card">

              <div className="dashboard-section-heading">

                <div>

                  <span>
                    BREAKDOWN
                  </span>

                  <h2>
                    Categories
                  </h2>

                </div>

              </div>


              {loadingProjects ? (

                <div className="category-loading">
                  Loading...
                </div>

              ) : statistics.categoryCounts.length === 0 ? (

                <div className="category-empty">
                  No category data available.
                </div>

              ) : (

                <div className="category-list">

                  {statistics.categoryCounts
                    .slice(0, 5)
                    .map((item) => {

                      const percentage =
                        Math.max(
                          8,
                          Math.round(
                            (item.count /
                              maxCategoryCount) *
                              100
                          )
                        );

                      return (
                        <div
                          className="category-row"
                          key={item.category}
                        >

                          <div className="category-row-top">

                            <span>
                              {item.category}
                            </span>

                            <strong>
                              {item.count}
                            </strong>

                          </div>


                          <div className="category-bar">

                            <div
                              style={{
                                width:
                                  `${percentage}%`,
                              }}
                            ></div>

                          </div>

                        </div>
                      );
                    })}

                </div>

              )}


              <div className="category-total">

                <span>
                  Total categories
                </span>

                <strong>
                  {loadingProjects
                    ? "—"
                    : statistics.totalCategories}
                </strong>

              </div>

            </div>

          </section>


          {/* =================================================
              RECENT REVIEWS
          ================================================= */}

          <section className="dashboard-info-grid">

            <div className="recent-projects-card">

              <div className="dashboard-section-heading">

                <div>

                  <span>
                    FEEDBACK
                  </span>

                  <h2>
                    Recent Reviews
                  </h2>

                </div>

                <span className="see-all-button">
                  {loadingReviews
                    ? "..."
                    : `${reviewStatistics.totalReviews} total`}
                </span>

              </div>


              {loadingReviews ? (

                <div className="dashboard-loading">
                  <div className="dashboard-spinner"></div>
                  <span>Loading reviews...</span>
                </div>

              ) : reviewsError ? (

                <div className="dashboard-error">
                  <span>!</span>
                  <p>{reviewsError}</p>
                </div>

              ) : recentReviews.length === 0 ? (

                <div className="dashboard-no-projects">

                  <div className="empty-project-icon">
                    ✦
                  </div>

                  <h3>
                    No reviews yet
                  </h3>

                  <p>
                    Reviews added from the Projects
                    page will show up here.
                  </p>

                </div>

              ) : (

                <div className="recent-project-list">

                  {recentReviews.map((review, index) => (

                    <div
                      className="recent-project-item"
                      key={review._id || review.id || index}
                    >

                      <div className="recent-project-image">

                        {review.image ? (
                          <img
                            src={review.image}
                            alt={review.name || "Reviewer"}
                          />
                        ) : (
                          <span>IMG</span>
                        )}

                      </div>


                      <div className="recent-project-info">

                        <span>
                          {review.profession ||
                            "Client"}
                        </span>

                        <h3>
                          {review.name || "Anonymous"}
                        </h3>

                        <p
                          title={review.message || ""}
                        >
                          {renderStars(review.rating)}
                          {"  "}
                          {(review.message || "").length > 60
                            ? `${review.message.slice(0, 60)}...`
                            : review.message || "No message"}
                        </p>

                      </div>


                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: "6px",
                        }}
                      >

                        <span
                          className="recent-project-edit"
                          title={`${review.rating || 0} / 5 stars`}
                        >
                          {review.rating || 0}★
                        </span>

                        <button
                          className="recent-project-edit"
                          onClick={() =>
                            openEditReviewModal(review)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="recent-project-edit"
                          onClick={() =>
                            handleDeleteReview(
                              review._id || review.id
                            )
                          }
                          disabled={
                            deletingReviewId ===
                            (review._id || review.id)
                          }
                        >
                          {deletingReviewId ===
                          (review._id || review.id)
                            ? "..."
                            : "Delete"}
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}


              {!loadingReviews &&
                !reviewsError &&
                reviewStatistics.totalReviews > 0 && (
                  <div className="category-total">
                    <span>Average rating</span>
                    <strong>
                      {reviewStatistics.averageRating} / 5
                    </strong>
                  </div>
                )}

            </div>

          </section>


          {/* =================================================
              NEW: SKILLS / TOOLS SECTION
              Existing classNames hi reuse kiye hain
              (recent-projects-card / recent-project-list /
              dashboard-loading / dashboard-error /
              dashboard-no-projects / dashboard-section-heading)
              taake bilkul same design ke sath render ho,
              koi nayi CSS add karne ki zaroorat nahi. Ye
              section projects aur reviews se poori tarah
              isolated hai — is me koi bhi error sirf isi
              card ko affect karega, baaki dashboard safe
              rahega.
          ================================================= */}

          <section className="dashboard-info-grid">

            <div className="recent-projects-card">

              <div className="dashboard-section-heading">

                <div>

                  <span>
                    WEBSITE SKILLS
                  </span>

                  <h2>
                    Skills / Tools
                  </h2>

                </div>

                <button
                  onClick={openAddToolModal}
                  className="see-all-button"
                >
                  ＋ Add Skill
                </button>

              </div>


              {loadingTools ? (

                <div className="dashboard-loading">
                  <div className="dashboard-spinner"></div>
                  <span>Loading skills...</span>
                </div>

              ) : toolsError ? (

                <div className="dashboard-error">
                  <span>!</span>
                  <p>{toolsError}</p>
                </div>

              ) : sortedTools.length === 0 ? (

                <div className="dashboard-no-projects">

                  <div className="empty-project-icon">
                    ◇
                  </div>

                  <h3>
                    No skills yet
                  </h3>

                  <p>
                    Add a skill/tool to show it on
                    the public website's Skills section.
                  </p>

                  <button onClick={openAddToolModal}>
                    Add Skill
                  </button>

                </div>

              ) : (

                <div className="recent-project-list">

                  {sortedTools.map((tool, index) => {
                    const toolId = tool._id || tool.id;
                    const isActive = tool.isActive !== false;

                    return (
                      <div
                        className="recent-project-item"
                        key={toolId || index}
                        style={
                          isActive
                            ? undefined
                            : { opacity: 0.55 }
                        }
                      >

                        <div className="recent-project-image">

                          {tool.image ? (
                            <img
                              src={getToolImageUrl(tool.image)}
                              alt={tool.name || "Tool"}
                              onError={(e) => {
                                e.currentTarget.style.visibility =
                                  "hidden";
                              }}
                            />
                          ) : (
                            <span>IMG</span>
                          )}

                        </div>


                        <div className="recent-project-info">

                          <span>
                            {isActive ? "Visible" : "Hidden"}
                            {" · Order "}
                            {Number(tool.order) || 0}
                          </span>

                          <h3>
                            {tool.name || "Untitled"}
                          </h3>

                          <p>
                            {Number(tool.percentage) || 0}% proficiency
                          </p>

                        </div>


                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: "6px",
                          }}
                        >

                          <button
                            className="recent-project-edit"
                            onClick={() =>
                              handleToggleToolActive(tool)
                            }
                            disabled={togglingToolId === toolId}
                            title="Show/Hide on website"
                          >
                            {togglingToolId === toolId
                              ? "..."
                              : isActive
                              ? "Hide"
                              : "Show"}
                          </button>

                          <button
                            className="recent-project-edit"
                            onClick={() =>
                              openEditToolModal(tool)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="recent-project-edit"
                            onClick={() =>
                              handleDeleteTool(toolId)
                            }
                            disabled={deletingToolId === toolId}
                          >
                            {deletingToolId === toolId
                              ? "..."
                              : "Delete"}
                          </button>

                        </div>

                      </div>
                    );
                  })}

                </div>

              )}


              {!loadingTools &&
                !toolsError &&
                toolStatistics.totalTools > 0 && (
                  <div className="category-total">
                    <span>
                      {toolStatistics.activeTools} visible ·{" "}
                      {toolStatistics.totalTools -
                        toolStatistics.activeTools}{" "}
                      hidden
                    </span>
                    <strong>
                      Avg {toolStatistics.averagePercentage}%
                    </strong>
                  </div>
                )}

            </div>

          </section>


          {/* =================================================
              EDIT REVIEW MODAL
          ================================================= */}

          {editingReview && (
            <div
              onClick={
                savingEditReview
                  ? undefined
                  : closeEditReviewModal
              }
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                padding: "20px",
              }}
            >

              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  width: "100%",
                  maxWidth: "480px",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  padding: "24px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "18px",
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: "20px" }}>
                    Edit Review
                  </h2>

                  <button
                    type="button"
                    onClick={closeEditReviewModal}
                    disabled={savingEditReview}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "22px",
                      cursor: "pointer",
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleUpdateReview}>

                  <div style={{ marginBottom: "16px" }}>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src={
                          editReviewImage
                            ? URL.createObjectURL(editReviewImage)
                            : editingReview.image || ""
                        }
                        alt="Reviewer"
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          background: "#eee",
                        }}
                        onError={(e) => {
                          e.currentTarget.style.visibility = "hidden";
                        }}
                      />

                      <label
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          padding: "8px 14px",
                          fontSize: "13px",
                          cursor: "pointer",
                        }}
                      >
                        Change Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditReviewImageChange}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>

                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "6px",
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={editReviewName}
                      onChange={(e) =>
                        setEditReviewName(e.target.value)
                      }
                      required
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "6px",
                      }}
                    >
                      Profession
                    </label>
                    <input
                      type="text"
                      value={editReviewProfession}
                      onChange={(e) =>
                        setEditReviewProfession(e.target.value)
                      }
                      required
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "6px",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      value={editReviewMessage}
                      onChange={(e) =>
                        setEditReviewMessage(e.target.value)
                      }
                      rows="4"
                      required
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        boxSizing: "border-box",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "6px",
                      }}
                    >
                      Rating
                    </label>
                    <select
                      value={editReviewRating}
                      onChange={(e) =>
                        setEditReviewRating(Number(e.target.value))
                      }
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value={5}>★★★★★ (5)</option>
                      <option value={4}>★★★★☆ (4)</option>
                      <option value={3}>★★★☆☆ (3)</option>
                      <option value={2}>★★☆☆☆ (2)</option>
                      <option value={1}>★☆☆☆☆ (1)</option>
                    </select>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "10px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={closeEditReviewModal}
                      disabled={savingEditReview}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={savingEditReview}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#111",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {savingEditReview
                        ? "Saving..."
                        : "Save Changes"}
                    </button>
                  </div>

                </form>

              </div>

            </div>
          )}


          {/* =================================================
              NEW: ADD TOOL MODAL
              Edit-review modal jaisa hi inline-style pattern —
              kisi CSS file par depend nahi karta.
          ================================================= */}

          {showAddToolModal && (
            <div
              onClick={
                savingNewTool ? undefined : closeAddToolModal
              }
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                padding: "20px",
              }}
            >

              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  width: "100%",
                  maxWidth: "480px",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  padding: "24px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "18px",
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: "20px" }}>
                    Add Skill / Tool
                  </h2>

                  <button
                    type="button"
                    onClick={closeAddToolModal}
                    disabled={savingNewTool}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "22px",
                      cursor: "pointer",
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleCreateTool}>

                  <div style={{ marginBottom: "16px" }}>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        marginBottom: "10px",
                      }}
                    >
                      {newToolImage && (
                        <img
                          src={URL.createObjectURL(newToolImage)}
                          alt="Preview"
                          style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "12px",
                            objectFit: "cover",
                            background: "#eee",
                          }}
                        />
                      )}

                      <label
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          padding: "8px 14px",
                          fontSize: "13px",
                          cursor: "pointer",
                        }}
                      >
                        {newToolImage ? "Change Icon" : "Upload Icon"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleNewToolImageChange}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>

                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "6px",
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={newToolName}
                      onChange={(e) =>
                        setNewToolName(e.target.value)
                      }
                      placeholder="e.g. React, Figma, Node.js"
                      required
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "6px",
                      }}
                    >
                      Percentage: {newToolPercentage}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={newToolPercentage}
                      onChange={(e) =>
                        setNewToolPercentage(Number(e.target.value))
                      }
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "6px",
                      }}
                    >
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={newToolOrder}
                      onChange={(e) =>
                        setNewToolOrder(e.target.value)
                      }
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "10px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={closeAddToolModal}
                      disabled={savingNewTool}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={savingNewTool}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#111",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {savingNewTool ? "Saving..." : "Add Skill"}
                    </button>
                  </div>

                </form>

              </div>

            </div>
          )}


          {/* =================================================
              NEW: EDIT TOOL MODAL
          ================================================= */}

          {editingTool && (
            <div
              onClick={
                savingEditTool ? undefined : closeEditToolModal
              }
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                padding: "20px",
              }}
            >

              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  width: "100%",
                  maxWidth: "480px",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  padding: "24px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "18px",
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: "20px" }}>
                    Edit Skill / Tool
                  </h2>

                  <button
                    type="button"
                    onClick={closeEditToolModal}
                    disabled={savingEditTool}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "22px",
                      cursor: "pointer",
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleUpdateTool}>

                  <div style={{ marginBottom: "16px" }}>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src={
                          editToolImage
                            ? URL.createObjectURL(editToolImage)
                            : getToolImageUrl(editingTool.image) || ""
                        }
                        alt={editingTool.name || "Tool"}
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "12px",
                          objectFit: "cover",
                          background: "#eee",
                        }}
                        onError={(e) => {
                          e.currentTarget.style.visibility = "hidden";
                        }}
                      />

                      <label
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          padding: "8px 14px",
                          fontSize: "13px",
                          cursor: "pointer",
                        }}
                      >
                        Change Icon
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditToolImageChange}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>

                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "6px",
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={editToolName}
                      onChange={(e) =>
                        setEditToolName(e.target.value)
                      }
                      required
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "6px",
                      }}
                    >
                      Percentage: {editToolPercentage}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editToolPercentage}
                      onChange={(e) =>
                        setEditToolPercentage(Number(e.target.value))
                      }
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "6px",
                      }}
                    >
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={editToolOrder}
                      onChange={(e) =>
                        setEditToolOrder(e.target.value)
                      }
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "10px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={closeEditToolModal}
                      disabled={savingEditTool}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={savingEditTool}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#111",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {savingEditTool
                        ? "Saving..."
                        : "Save Changes"}
                    </button>
                  </div>

                </form>

              </div>

            </div>
          )}


          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <section className="quick-actions-section">

            <div className="dashboard-section-heading">

              <div>

                <span>
                  QUICK ACTIONS
                </span>

                <h2>
                  Manage your portfolio
                </h2>

              </div>

            </div>


            <div className="quick-action-grid">


              {/* ADD */}

              <button
                className="quick-action-card"
                onClick={() =>
                  navigate("/admin/add-project")
                }
              >

                <div className="quick-action-icon">
                  ＋
                </div>

                <div>
                  <h3>
                    Add New Project
                  </h3>

                  <p>
                    Upload a new project,
                    images and details.
                  </p>
                </div>

                <span className="quick-arrow">
                  →
                </span>

              </button>


              {/* MANAGE */}

              <button
                className="quick-action-card"
                onClick={() =>
                  navigate("/admin/projects")
                }
              >

                <div className="quick-action-icon">
                  ▦
                </div>

                <div>
                  <h3>
                    Manage Projects
                  </h3>

                  <p>
                    Edit, update or delete
                    existing projects.
                  </p>
                </div>

                <span className="quick-arrow">
                  →
                </span>

              </button>


              {/* NEW: SKILLS */}

              <button
                className="quick-action-card"
                onClick={openAddToolModal}
              >

                <div className="quick-action-icon">
                  ◇
                </div>

                <div>
                  <h3>
                    Add Skill / Tool
                  </h3>

                  <p>
                    Add a new skill icon and
                    proficiency level.
                  </p>
                </div>

                <span className="quick-arrow">
                  →
                </span>

              </button>


              {/* WEBSITE */}

              <button
                className="quick-action-card"
                onClick={() =>
                  navigate("/")
                }
              >

                <div className="quick-action-icon">
                  ↗
                </div>

                <div>
                  <h3>
                    View Website
                  </h3>

                  <p>
                    Open the public portfolio
                    website.
                  </p>
                </div>

                <span className="quick-arrow">
                  →
                </span>

              </button>

            </div>

          </section>


          {/* =================================================
              PORTFOLIO INSIGHT
          ================================================= */}

          <section className="portfolio-insight">

            <div className="insight-icon">
              ✦
            </div>

            <div className="insight-content">

              <span>
                PORTFOLIO INSIGHT
              </span>

              <h2>
                Your portfolio at a glance
              </h2>

              <p>
                You currently have{" "}
                <strong>
                  {loadingProjects
                    ? "..."
                    : statistics.totalProjects}
                </strong>{" "}
                project
                {statistics.totalProjects === 1
                  ? ""
                  : "s"} and{" "}
                <strong>
                  {loadingProjects
                    ? "..."
                    : statistics.totalImages}
                </strong>{" "}
                image
                {statistics.totalImages === 1
                  ? ""
                  : "s"} across{" "}
                <strong>
                  {loadingProjects
                    ? "..."
                    : statistics.totalCategories}
                </strong>{" "}
                categor
                {statistics.totalCategories === 1
                  ? "y"
                  : "ies"}.
              </p>

            </div>


            <button
              onClick={() =>
                navigate("/admin/projects")
              }
              className="insight-button"
            >
              Manage Portfolio →
            </button>

          </section>


          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="vision-footer">

            <span>
              © {new Date().getFullYear()} Ali Fayyaz
            </span>

            <div>

              <span>
                Help Center
              </span>

              <span>
                Privacy
              </span>

              <span
                onClick={handleLogout}
              >
                Logout
              </span>

            </div>

          </footer>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;




