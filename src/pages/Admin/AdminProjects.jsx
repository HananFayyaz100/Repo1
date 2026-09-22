// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   getProjects,
//   deleteProject,
//   updateProject,
// } from "../../api/projectApi";

// const categories = [
//   "UI/UX",
//   "Logo",
//   "Social media",
//   "Branding",
// ];

// const AdminProjects = () => {
//   const navigate = useNavigate();

//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Edit project
//   const [editingProject, setEditingProject] =
//     useState(null);

//   const [editTitle, setEditTitle] = useState("");
//   const [editCategory, setEditCategory] =
//     useState("");
//   const [editDescription, setEditDescription] =
//     useState("");

//   // New images
//   const [newMainImage, setNewMainImage] =
//     useState(null);

//   const [newAdditionalImages, setNewAdditionalImages] =
//     useState([]);

//   // Existing additional images marked for deletion
//   const [
//     removedAdditionalImages,
//     setRemovedAdditionalImages,
//   ] = useState([]);

//   const [saving, setSaving] = useState(false);


//   // =====================================================
//   // GET PROJECTS
//   // =====================================================

//   const fetchProjects = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const data = await getProjects();

//       setProjects(data.projects || []);
//     } catch (error) {
//       console.error(
//         "Fetch projects error:",
//         error
//       );

//       setError(
//         error.response?.data?.message ||
//           "Projects load nahi ho sake."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchProjects();
//   }, []);


//   // =====================================================
//   // OPEN EDIT
//   // =====================================================

//   const handleEdit = (project) => {
//     setEditingProject(project);

//     setEditTitle(project.title || "");
//     setEditCategory(project.category || "");
//     setEditDescription(
//       project.description || ""
//     );

//     setNewMainImage(null);
//     setNewAdditionalImages([]);

//     setRemovedAdditionalImages([]);
//   };


//   // =====================================================
//   // CLOSE EDIT
//   // =====================================================

//   const closeEditModal = () => {
//     if (saving) return;

//     setEditingProject(null);

//     setEditTitle("");
//     setEditCategory("");
//     setEditDescription("");

//     setNewMainImage(null);
//     setNewAdditionalImages([]);

//     setRemovedAdditionalImages([]);
//   };


//   // =====================================================
//   // MAIN IMAGE SELECT
//   // =====================================================

//   const handleMainImageChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image file.");
//       return;
//     }

//     setNewMainImage(file);
//   };


//   // =====================================================
//   // ADDITIONAL IMAGES SELECT
//   // =====================================================

//   const handleAdditionalImagesChange = (e) => {
//     const files = Array.from(
//       e.target.files || []
//     );

//     if (files.length === 0) return;

//     const invalidFile = files.find(
//       (file) =>
//         !file.type.startsWith("image/")
//     );

//     if (invalidFile) {
//       alert(
//         "Only image files are allowed."
//       );
//       return;
//     }

//     const existingCount =
//       editingProject?.additionalImages
//         ?.filter(
//           (image) =>
//             !removedAdditionalImages.includes(
//               image
//             )
//         ).length || 0;

//     const totalAfterAdding =
//       existingCount +
//       newAdditionalImages.length +
//       files.length;

//     if (totalAfterAdding > 6) {
//       const remaining =
//         6 -
//         existingCount -
//         newAdditionalImages.length;

//       alert(
//         remaining > 0
//           ? `You can only add ${remaining} more image(s). Maximum 6 additional images are allowed.`
//           : "Maximum 6 additional images are already selected."
//       );

//       return;
//     }

//     setNewAdditionalImages((previous) => [
//       ...previous,
//       ...files,
//     ]);

//     // Reset input so same file can be selected again
//     e.target.value = "";
//   };


//   // =====================================================
//   // REMOVE EXISTING ADDITIONAL IMAGE
//   // =====================================================

//   const handleRemoveExistingImage = (imageUrl) => {
//     setRemovedAdditionalImages(
//       (previous) => [
//         ...previous,
//         imageUrl,
//       ]
//     );
//   };


//   // =====================================================
//   // UNDO REMOVE EXISTING IMAGE
//   // =====================================================

//   const handleUndoRemoveImage = (imageUrl) => {
//     setRemovedAdditionalImages(
//       (previous) =>
//         previous.filter(
//           (image) => image !== imageUrl
//         )
//     );
//   };


//   // =====================================================
//   // REMOVE NEWLY SELECTED IMAGE
//   // =====================================================

//   const handleRemoveNewImage = (index) => {
//     setNewAdditionalImages(
//       (previous) =>
//         previous.filter(
//           (_, imageIndex) =>
//             imageIndex !== index
//         )
//     );
//   };


//   // =====================================================
//   // UPDATE PROJECT
//   // =====================================================

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     if (!editingProject) return;

//     try {
//       setSaving(true);

//       const token =
//         localStorage.getItem("adminToken");

//       if (!token) {
//         navigate("/admin/login");
//         return;
//       }


//       // -----------------------------------------------
//       // Validation
//       // -----------------------------------------------

//       if (!editTitle.trim()) {
//         alert("Project title is required.");
//         setSaving(false);
//         return;
//       }

//       if (!editCategory) {
//         alert("Project category is required.");
//         setSaving(false);
//         return;
//       }

//       if (!editDescription.trim()) {
//         alert(
//           "Project description is required."
//         );
//         setSaving(false);
//         return;
//       }


//       // -----------------------------------------------
//       // Count final additional images
//       // -----------------------------------------------

//       const existingImages =
//         editingProject.additionalImages || [];

//       const remainingExistingImages =
//         existingImages.filter(
//           (image) =>
//             !removedAdditionalImages.includes(
//               image
//             )
//         );

//       const finalImageCount =
//         remainingExistingImages.length +
//         newAdditionalImages.length;


//       if (finalImageCount > 6) {
//         alert(
//           "Maximum 6 additional images are allowed."
//         );

//         setSaving(false);
//         return;
//       }


//       // -----------------------------------------------
//       // FormData
//       // -----------------------------------------------

//       const formData = new FormData();

//       formData.append(
//         "title",
//         editTitle.trim()
//       );

//       formData.append(
//         "category",
//         editCategory
//       );

//       formData.append(
//         "description",
//         editDescription.trim()
//       );


//       // -----------------------------------------------
//       // Main image
//       // -----------------------------------------------

//       if (newMainImage) {
//         formData.append(
//           "mainImage",
//           newMainImage
//         );
//       }


//       // -----------------------------------------------
//       // New additional images
//       // -----------------------------------------------

//       newAdditionalImages.forEach(
//         (file) => {
//           formData.append(
//             "additionalImages",
//             file
//           );
//         }
//       );


//       // -----------------------------------------------
//       // Existing images to remove
//       // -----------------------------------------------

//       formData.append(
//         "removeAdditionalImages",
//         JSON.stringify(
//           removedAdditionalImages
//         )
//       );


//       // -----------------------------------------------
//       // API
//       // -----------------------------------------------

//       const data = await updateProject(
//         editingProject._id,
//         formData,
//         token
//       );


//       // -----------------------------------------------
//       // Update frontend state
//       // -----------------------------------------------

//       setProjects(
//         (previousProjects) =>
//           previousProjects.map(
//             (project) =>
//               project._id ===
//               editingProject._id
//                 ? data.project
//                 : project
//           )
//       );


//       // -----------------------------------------------
//       // Close modal directly
//       // -----------------------------------------------

//       setEditingProject(null);

//       setEditTitle("");
//       setEditCategory("");
//       setEditDescription("");

//       setNewMainImage(null);
//       setNewAdditionalImages([]);
//       setRemovedAdditionalImages([]);


//       alert(
//         "Project updated successfully."
//       );

//     } catch (error) {

//       console.error(
//         "Update project error:",
//         error
//       );

//       if (
//         error.response?.status === 401
//       ) {
//         localStorage.removeItem(
//           "adminToken"
//         );

//         navigate("/admin/login");

//         return;
//       }

//       alert(
//         error.response?.data?.message ||
//           "Project update nahi ho saka."
//       );

//     } finally {
//       setSaving(false);
//     }
//   };


//   // =====================================================
//   // DELETE PROJECT
//   // =====================================================

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this project?"
//     );

//     if (!confirmed) return;

//     try {
//       const token =
//         localStorage.getItem("adminToken");

//       if (!token) {
//         navigate("/admin/login");
//         return;
//       }

//       await deleteProject(id, token);

//       setProjects(
//         (previousProjects) =>
//           previousProjects.filter(
//             (project) =>
//               project._id !== id
//           )
//       );

//       alert(
//         "Project deleted successfully."
//       );

//     } catch (error) {

//       console.error(
//         "Delete project error:",
//         error
//       );

//       if (
//         error.response?.status === 401
//       ) {
//         localStorage.removeItem(
//           "adminToken"
//         );

//         navigate("/admin/login");
//         return;
//       }

//       alert(
//         error.response?.data?.message ||
//           "Project delete nahi ho saka."
//       );
//     }
//   };


//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (
//     <>
//       {/* =================================================
//           PROJECT MANAGEMENT PAGE
//       ================================================= */}

//       <div
//         style={{
//           minHeight: "100vh",
//           padding: "40px 20px",
//           background: "#f5f5f5",
//         }}
//       >
//         <div
//           style={{
//             maxWidth: "1100px",
//             margin: "0 auto",
//           }}
//         >

//           {/* HEADER */}

//           <div
//             style={{
//               display: "flex",
//               justifyContent:
//                 "space-between",
//               alignItems: "center",
//               gap: "20px",
//               marginBottom: "30px",
//               flexWrap: "wrap",
//             }}
//           >
//             <div>
//               <h1>
//                 Manage Projects
//               </h1>

//               <p>
//                 Edit, update and delete
//                 portfolio projects.
//               </p>
//             </div>

//             <button
//               onClick={() =>
//                 navigate(
//                   "/admin/add-project"
//                 )
//               }
//             >
//               + Add Project
//             </button>
//           </div>


//           {/* DASHBOARD BUTTON */}

//           <button
//             onClick={() =>
//               navigate(
//                 "/admin/dashboard"
//               )
//             }
//             style={{
//               marginBottom: "25px",
//             }}
//           >
//             ← Dashboard
//           </button>


//           {/* LOADING */}

//           {loading && (
//             <p>
//               Loading projects...
//             </p>
//           )}


//           {/* ERROR */}

//           {!loading && error && (
//             <p
//               style={{
//                 color: "red",
//               }}
//             >
//               {error}
//             </p>
//           )}


//           {/* EMPTY */}

//           {!loading &&
//             !error &&
//             projects.length === 0 && (
//               <div
//                 style={{
//                   background: "#fff",
//                   padding: "30px",
//                   borderRadius: "15px",
//                 }}
//               >
//                 <h2>
//                   No Projects Yet
//                 </h2>

//                 <p>
//                   Create your first
//                   portfolio project.
//                 </p>

//                 <button
//                   onClick={() =>
//                     navigate(
//                       "/admin/add-project"
//                     )
//                   }
//                 >
//                   Create Project
//                 </button>
//               </div>
//             )}


//           {/* PROJECT LIST */}

//           <div
//             style={{
//               display: "grid",
//               gap: "20px",
//             }}
//           >
//             {projects.map(
//               (project) => (
//                 <div
//                   key={project._id}
//                   style={{
//                     background: "#fff",
//                     padding: "20px",
//                     borderRadius: "15px",

//                     display: "flex",
//                     gap: "20px",

//                     alignItems:
//                       "center",

//                     flexWrap:
//                       "wrap",
//                   }}
//                 >

//                   {/* IMAGE */}

//                   <img
//                     src={
//                       project.mainImage
//                     }
//                     alt={
//                       project.title
//                     }
//                     style={{
//                       width: "160px",
//                       height: "120px",
//                       objectFit:
//                         "cover",
//                       borderRadius:
//                         "10px",
//                     }}
//                   />


//                   {/* INFORMATION */}

//                   <div
//                     style={{
//                       flex: 1,
//                       minWidth:
//                         "250px",
//                     }}
//                   >
//                     <h2>
//                       {project.title}
//                     </h2>

//                     <p>
//                       <strong>
//                         Category:
//                       </strong>{" "}
//                       {
//                         project.category
//                       }
//                     </p>

//                     <p>
//                       {
//                         project.description
//                       }
//                     </p>

//                     <p>
//                       <strong>
//                         Additional Images:
//                       </strong>{" "}
//                       {
//                         project
//                           .additionalImages
//                           ?.length ||
//                         0
//                       }
//                     </p>
//                   </div>


//                   {/* ACTIONS */}

//                   <div
//                     style={{
//                       display:
//                         "flex",
//                       flexDirection:
//                         "column",
//                       gap: "10px",
//                     }}
//                   >
//                     <button
//                       onClick={() =>
//                         handleEdit(
//                           project
//                         )
//                       }
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() =>
//                         handleDelete(
//                           project._id
//                         )
//                       }
//                     >
//                       Delete
//                     </button>
//                   </div>

//                 </div>
//               )
//             )}
//           </div>

//         </div>
//       </div>


//       {/* =================================================
//           EDIT MODAL
//       ================================================= */}

//       {editingProject && (
//         <div
//           onClick={
//             saving
//               ? undefined
//               : closeEditModal
//           }
//           style={{
//             position: "fixed",
//             inset: 0,

//             zIndex: 99999,

//             background:
//               "rgba(0, 0, 0, 0.70)",

//             display: "flex",

//             justifyContent:
//               "center",

//             alignItems:
//               "center",

//             padding: "20px",
//           }}
//         >

//           <div
//             onClick={(e) =>
//               e.stopPropagation()
//             }
//             style={{
//               width: "100%",
//               maxWidth: "700px",

//               background: "#fff",

//               borderRadius:
//                 "15px",

//               padding: "30px",

//               maxHeight: "90vh",

//               overflowY:
//                 "auto",
//             }}
//           >

//             {/* MODAL HEADER */}

//             <div
//               style={{
//                 display:
//                   "flex",

//                 justifyContent:
//                   "space-between",

//                 alignItems:
//                   "center",

//                 marginBottom:
//                   "25px",
//               }}
//             >
//               <h2>
//                 Edit Project
//               </h2>

//               <button
//                 type="button"
//                 onClick={
//                   closeEditModal
//                 }
//                 disabled={saving}
//                 style={{
//                   fontSize:
//                     "24px",
//                 }}
//               >
//                 ×
//               </button>
//             </div>


//             <form
//               onSubmit={
//                 handleUpdate
//               }
//             >

//               {/* =================================================
//                   MAIN IMAGE
//               ================================================= */}

//               <div
//                 style={{
//                   marginBottom:
//                     "30px",
//                 }}
//               >
//                 <h3>
//                   Main Image
//                 </h3>

//                 <img
//                   src={
//                     newMainImage
//                       ? URL.createObjectURL(
//                           newMainImage
//                         )
//                       : editingProject.mainImage
//                   }
//                   alt="Main"
//                   style={{
//                     width:
//                       "100%",
//                     maxHeight:
//                       "250px",
//                     objectFit:
//                       "cover",
//                     borderRadius:
//                       "12px",
//                     display:
//                       "block",
//                     marginBottom:
//                       "12px",
//                   }}
//                 />

//                 <label>
//                   <strong>
//                     Replace Main Image
//                   </strong>
//                 </label>

//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={
//                     handleMainImageChange
//                   }
//                   style={{
//                     display:
//                       "block",
//                     marginTop:
//                       "8px",
//                   }}
//                 />

//                 {newMainImage && (
//                   <p>
//                     New image selected:{" "}
//                     <strong>
//                       {
//                         newMainImage.name
//                       }
//                     </strong>
//                   </p>
//                 )}
//               </div>


//               {/* =================================================
//                   ADDITIONAL IMAGES
//               ================================================= */}

//               <div
//                 style={{
//                   marginBottom:
//                     "30px",
//                 }}
//               >
//                 <h3>
//                   Additional Images
//                 </h3>

//                 <p>
//                   Maximum 6 additional
//                   images.
//                 </p>


//                 {/* EXISTING IMAGES */}

//                 <div
//                   style={{
//                     display:
//                       "grid",

//                     gridTemplateColumns:
//                       "repeat(auto-fill, minmax(140px, 1fr))",

//                     gap: "15px",

//                     marginBottom:
//                       "20px",
//                   }}
//                 >

//                   {(
//                     editingProject
//                       .additionalImages ||
//                     []
//                   ).map(
//                     (
//                       imageUrl
//                     ) => {

//                       const isRemoved =
//                         removedAdditionalImages.includes(
//                           imageUrl
//                         );

//                       return (
//                         <div
//                           key={
//                             imageUrl
//                           }
//                           style={{
//                             position:
//                               "relative",

//                             opacity:
//                               isRemoved
//                                 ? 0.35
//                                 : 1,
//                           }}
//                         >

//                           <img
//                             src={
//                               imageUrl
//                             }
//                             alt="Additional"
//                             style={{
//                               width:
//                                 "100%",
//                               height:
//                                 "120px",
//                               objectFit:
//                                 "cover",
//                               borderRadius:
//                                 "10px",
//                             }}
//                           />

//                           {!isRemoved ? (
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 handleRemoveExistingImage(
//                                   imageUrl
//                                 )
//                               }
//                               style={{
//                                 position:
//                                   "absolute",
//                                 top:
//                                   "5px",
//                                 right:
//                                   "5px",
//                                 width:
//                                   "30px",
//                                 height:
//                                   "30px",
//                                 borderRadius:
//                                   "50%",
//                               }}
//                             >
//                               ×
//                             </button>
//                           ) : (
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 handleUndoRemoveImage(
//                                   imageUrl
//                                 )
//                               }
//                               style={{
//                                 width:
//                                   "100%",
//                                 marginTop:
//                                   "5px",
//                               }}
//                             >
//                               Undo
//                             </button>
//                           )}

//                         </div>
//                       );
//                     }
//                   )}

//                 </div>


//                 {/* NEW IMAGES */}

//                 {newAdditionalImages.length >
//                   0 && (
//                   <>
//                     <h4>
//                       New Images
//                     </h4>

//                     <div
//                       style={{
//                         display:
//                           "grid",

//                         gridTemplateColumns:
//                           "repeat(auto-fill, minmax(140px, 1fr))",

//                         gap: "15px",

//                         marginBottom:
//                           "20px",
//                       }}
//                     >

//                       {newAdditionalImages.map(
//                         (
//                           file,
//                           index
//                         ) => (
//                           <div
//                             key={`${file.name}-${index}`}
//                             style={{
//                               position:
//                                 "relative",
//                             }}
//                           >

//                             <img
//                               src={URL.createObjectURL(
//                                 file
//                               )}
//                               alt="New"
//                               style={{
//                                 width:
//                                   "100%",
//                                 height:
//                                   "120px",
//                                 objectFit:
//                                   "cover",
//                                 borderRadius:
//                                   "10px",
//                               }}
//                             />

//                             <button
//                               type="button"
//                               onClick={() =>
//                                 handleRemoveNewImage(
//                                   index
//                                 )
//                               }
//                               style={{
//                                 position:
//                                   "absolute",
//                                 top:
//                                   "5px",
//                                 right:
//                                   "5px",
//                                 width:
//                                   "30px",
//                                 height:
//                                   "30px",
//                                 borderRadius:
//                                   "50%",
//                               }}
//                             >
//                               ×
//                             </button>

//                           </div>
//                         )
//                       )}

//                     </div>
//                   </>
//                 )}


//                 {/* FILE INPUT */}

//                 <label>
//                   <strong>
//                     Add New Additional Images
//                   </strong>
//                 </label>

//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={
//                     handleAdditionalImagesChange
//                   }
//                   style={{
//                     display:
//                       "block",
//                     marginTop:
//                       "8px",
//                   }}
//                 />

//                 <p>
//                   Current selected total:{" "}
//                   {
//                     (
//                       editingProject
//                         .additionalImages ||
//                       []
//                     ).filter(
//                       (image) =>
//                         !removedAdditionalImages.includes(
//                           image
//                         )
//                     ).length +
//                     newAdditionalImages.length
//                   }
//                   /6
//                 </p>

//               </div>


//               {/* =================================================
//                   TITLE
//               ================================================= */}

//               <div
//                 style={{
//                   marginBottom:
//                     "20px",
//                 }}
//               >
//                 <label>
//                   <strong>
//                     Project Title
//                   </strong>
//                 </label>

//                 <input
//                   type="text"
//                   value={
//                     editTitle
//                   }
//                   onChange={(e) =>
//                     setEditTitle(
//                       e.target.value
//                     )
//                   }
//                   required
//                   style={{
//                     width:
//                       "100%",
//                     padding:
//                       "12px",
//                     marginTop:
//                       "8px",
//                     boxSizing:
//                       "border-box",
//                   }}
//                 />
//               </div>


//               {/* =================================================
//                   CATEGORY
//               ================================================= */}

//               <div
//                 style={{
//                   marginBottom:
//                     "20px",
//                 }}
//               >
//                 <label>
//                   <strong>
//                     Category
//                   </strong>
//                 </label>

//                 <select
//                   value={
//                     editCategory
//                   }
//                   onChange={(e) =>
//                     setEditCategory(
//                       e.target.value
//                     )
//                   }
//                   required
//                   style={{
//                     width:
//                       "100%",
//                     padding:
//                       "12px",
//                     marginTop:
//                       "8px",
//                     boxSizing:
//                       "border-box",
//                   }}
//                 >
//                   {categories.map(
//                     (
//                       category
//                     ) => (
//                       <option
//                         key={
//                           category
//                         }
//                         value={
//                           category
//                         }
//                       >
//                         {category}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>


//               {/* =================================================
//                   DESCRIPTION
//               ================================================= */}

//               <div
//                 style={{
//                   marginBottom:
//                     "25px",
//                 }}
//               >
//                 <label>
//                   <strong>
//                     Description
//                   </strong>
//                 </label>

//                 <textarea
//                   value={
//                     editDescription
//                   }
//                   onChange={(e) =>
//                     setEditDescription(
//                       e.target.value
//                     )
//                   }
//                   required
//                   rows="7"
//                   style={{
//                     width:
//                       "100%",
//                     padding:
//                       "12px",
//                     marginTop:
//                       "8px",
//                     boxSizing:
//                       "border-box",
//                     resize:
//                       "vertical",
//                   }}
//                 />
//               </div>


//               {/* =================================================
//                   BUTTONS
//               ================================================= */}

//               <div
//                 style={{
//                   display:
//                     "flex",
//                   gap:
//                     "10px",
//                 }}
//               >

//                 <button
//                   type="submit"
//                   disabled={
//                     saving
//                   }
//                 >
//                   {saving
//                     ? "Updating..."
//                     : "Save Changes"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={
//                     closeEditModal
//                   }
//                   disabled={
//                     saving
//                   }
//                 >
//                   Cancel
//                 </button>

//               </div>

//             </form>

//           </div>

//         </div>
//       )}
//     </>
//   );
// };

// export default AdminProjects;







// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   getProjects,
//   deleteProject,
//   updateProject,
// } from "../../api/projectApi";

// import "./AdminProjects2.css";

// const categories = [
//   "UI/UX",
//   "Logo",
//   "Social media",
//   "Certificates",
// ];

// const AdminProjects = () => {
//   const navigate = useNavigate();

//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [search, setSearch] = useState("");
//   const [filterCategory, setFilterCategory] =
//     useState("All");

//   // Edit project
//   const [editingProject, setEditingProject] =
//     useState(null);

//   const [editTitle, setEditTitle] = useState("");
//   const [editCategory, setEditCategory] =
//     useState("");
//   const [editDescription, setEditDescription] =
//     useState("");

//   // Images
//   const [newMainImage, setNewMainImage] =
//     useState(null);

//   const [newAdditionalImages, setNewAdditionalImages] =
//     useState([]);

//   const [
//     removedAdditionalImages,
//     setRemovedAdditionalImages,
//   ] = useState([]);

//   const [saving, setSaving] = useState(false);

//   // =====================================================
//   // FETCH PROJECTS
//   // =====================================================

//   const fetchProjects = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const data = await getProjects();

//       setProjects(data.projects || []);
//     } catch (error) {
//       console.error(error);

//       setError(
//         error.response?.data?.message ||
//           "Projects load nahi ho sake."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // =====================================================
//   // FILTER PROJECTS
//   // =====================================================

//   const filteredProjects = projects.filter(
//     (project) => {
//       const matchesSearch =
//         project.title
//           ?.toLowerCase()
//           .includes(search.toLowerCase()) ||
//         project.description
//           ?.toLowerCase()
//           .includes(search.toLowerCase());

//       const matchesCategory =
//         filterCategory === "All" ||
//         project.category === filterCategory;

//       return matchesSearch && matchesCategory;
//     }
//   );

//   // =====================================================
//   // EDIT OPEN
//   // =====================================================

//   const handleEdit = (project) => {
//     setEditingProject(project);

//     setEditTitle(project.title || "");
//     setEditCategory(project.category || "");
//     setEditDescription(project.description || "");

//     setNewMainImage(null);
//     setNewAdditionalImages([]);
//     setRemovedAdditionalImages([]);
//   };

//   // =====================================================
//   // CLOSE EDIT
//   // =====================================================

//   const closeEditModal = () => {
//     if (saving) return;

//     setEditingProject(null);

//     setEditTitle("");
//     setEditCategory("");
//     setEditDescription("");

//     setNewMainImage(null);
//     setNewAdditionalImages([]);
//     setRemovedAdditionalImages([]);
//   };

//   // =====================================================
//   // MAIN IMAGE
//   // =====================================================

//   const handleMainImageChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please select a valid image.");
//       return;
//     }

//     setNewMainImage(file);
//   };

//   // =====================================================
//   // ADDITIONAL IMAGES
//   // =====================================================

//   const handleAdditionalImagesChange = (e) => {
//     const files = Array.from(
//       e.target.files || []
//     );

//     if (!files.length) return;

//     const invalidFile = files.find(
//       (file) => !file.type.startsWith("image/")
//     );

//     if (invalidFile) {
//       alert("Only image files are allowed.");
//       return;
//     }

//     const existingCount =
//       editingProject?.additionalImages?.filter(
//         (image) =>
//           !removedAdditionalImages.includes(image)
//       ).length || 0;

//     const total =
//       existingCount +
//       newAdditionalImages.length +
//       files.length;

//     if (total > 6) {
//       const remaining =
//         6 -
//         existingCount -
//         newAdditionalImages.length;

//       alert(
//         remaining > 0
//           ? `You can add ${remaining} more image(s).`
//           : "Maximum 6 additional images allowed."
//       );

//       return;
//     }

//     setNewAdditionalImages((previous) => [
//       ...previous,
//       ...files,
//     ]);

//     e.target.value = "";
//   };

//   // =====================================================
//   // REMOVE EXISTING IMAGE
//   // =====================================================

//   const handleRemoveExistingImage = (imageUrl) => {
//     setRemovedAdditionalImages((previous) => [
//       ...previous,
//       imageUrl,
//     ]);
//   };

//   // =====================================================
//   // UNDO IMAGE REMOVE
//   // =====================================================

//   const handleUndoRemoveImage = (imageUrl) => {
//     setRemovedAdditionalImages((previous) =>
//       previous.filter((image) => image !== imageUrl)
//     );
//   };

//   // =====================================================
//   // REMOVE NEW IMAGE
//   // =====================================================

//   const handleRemoveNewImage = (index) => {
//     setNewAdditionalImages((previous) =>
//       previous.filter(
//         (_, imageIndex) => imageIndex !== index
//       )
//     );
//   };

//   // =====================================================
//   // UPDATE PROJECT
//   // =====================================================

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     if (!editingProject) return;

//     try {
//       setSaving(true);

//       const token =
//         localStorage.getItem("adminToken");

//       if (!token) {
//         navigate("/admin/login");
//         return;
//       }

//       if (!editTitle.trim()) {
//         alert("Project title is required.");
//         return;
//       }

//       if (!editCategory) {
//         alert("Project category is required.");
//         return;
//       }

//       if (!editDescription.trim()) {
//         alert("Project description is required.");
//         return;
//       }

//       const existingImages =
//         editingProject.additionalImages || [];

//       const remainingExistingImages =
//         existingImages.filter(
//           (image) =>
//             !removedAdditionalImages.includes(image)
//         );

//       const finalImageCount =
//         remainingExistingImages.length +
//         newAdditionalImages.length;

//       if (finalImageCount > 6) {
//         alert(
//           "Maximum 6 additional images are allowed."
//         );
//         return;
//       }

//       const formData = new FormData();

//       formData.append(
//         "title",
//         editTitle.trim()
//       );

//       formData.append(
//         "category",
//         editCategory
//       );

//       formData.append(
//         "description",
//         editDescription.trim()
//       );

//       if (newMainImage) {
//         formData.append(
//           "mainImage",
//           newMainImage
//         );
//       }

//       newAdditionalImages.forEach((file) => {
//         formData.append(
//           "additionalImages",
//           file
//         );
//       });

//       formData.append(
//         "removeAdditionalImages",
//         JSON.stringify(
//           removedAdditionalImages
//         )
//       );

//       const data = await updateProject(
//         editingProject._id,
//         formData,
//         token
//       );

//       setProjects((previousProjects) =>
//         previousProjects.map((project) =>
//           project._id === editingProject._id
//             ? data.project
//             : project
//         )
//       );

//       closeEditModal();

//     } catch (error) {
//       console.error(error);

//       if (error.response?.status === 401) {
//         localStorage.removeItem("adminToken");
//         navigate("/admin/login");
//         return;
//       }

//       alert(
//         error.response?.data?.message ||
//           "Project update nahi ho saka."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // =====================================================
//   // DELETE
//   // =====================================================

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this project?"
//     );

//     if (!confirmed) return;

//     try {
//       const token =
//         localStorage.getItem("adminToken");

//       if (!token) {
//         navigate("/admin/login");
//         return;
//       }

//       await deleteProject(id, token);

//       setProjects((previousProjects) =>
//         previousProjects.filter(
//           (project) => project._id !== id
//         )
//       );

//     } catch (error) {
//       console.error(error);

//       if (error.response?.status === 401) {
//         localStorage.removeItem("adminToken");
//         navigate("/admin/login");
//         return;
//       }

//       alert(
//         error.response?.data?.message ||
//           "Project delete nahi ho saka."
//       );
//     }
//   };

//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (
//     <div className="admin-projects-page">

//       {/* TOP BAR */}
//       <header className="projects-header">

//         <div>
//           <span className="page-kicker">
//             PORTFOLIO MANAGEMENT
//           </span>

//           <h1>Manage Projects</h1>

//           <p>
//             Organize, update and control your
//             portfolio projects.
//           </p>
//         </div>

//         <button
//           className="create-project-btn"
//           onClick={() =>
//             navigate("/admin/add-project")
//           }
//         >
//           <span>＋</span>
//           New Project
//         </button>

//       </header>

//       {/* TOOLBAR */}
//       <div className="projects-toolbar">

//         <div className="search-box">

//           <span className="search-icon">
//             ⌕
//           </span>

//           <input
//             type="text"
//             placeholder="Search projects..."
//             value={search}
//             onChange={(e) =>
//               setSearch(e.target.value)
//             }
//           />

//         </div>

//         <select
//           className="category-filter"
//           value={filterCategory}
//           onChange={(e) =>
//             setFilterCategory(e.target.value)
//           }
//         >
//           <option value="All">
//             All Categories
//           </option>

//           {categories.map((category) => (
//             <option
//               key={category}
//               value={category}
//             >
//               {category}
//             </option>
//           ))}
//         </select>

//       </div>

//       {/* STATUS */}
//       <div className="projects-summary">
//         <div>
//           <strong>
//             {filteredProjects.length}
//           </strong>{" "}
//           project
//           {filteredProjects.length !== 1
//             ? "s"
//             : ""}{" "}
//           found
//         </div>

//         <div>
//           Total:{" "}
//           <strong>
//             {projects.length}
//           </strong>
//         </div>
//       </div>

//       {/* LOADING */}
//       {loading && (
//         <div className="projects-empty">
//           <div className="loading-spinner"></div>
//           <p>Loading projects...</p>
//         </div>
//       )}

//       {/* ERROR */}
//       {!loading && error && (
//         <div className="projects-error">
//           <strong>Something went wrong</strong>
//           <p>{error}</p>

//           <button onClick={fetchProjects}>
//             Try Again
//           </button>
//         </div>
//       )}

//       {/* EMPTY */}
//       {!loading &&
//         !error &&
//         filteredProjects.length === 0 && (
//           <div className="projects-empty">

//             <div className="empty-icon">
//               ▦
//             </div>

//             <h2>
//               No projects found
//             </h2>

//             <p>
//               Try another search or create
//               a new project.
//             </p>

//             <button
//               onClick={() =>
//                 navigate("/admin/add-project")
//               }
//             >
//               Create Project
//             </button>

//           </div>
//         )}

//       {/* PROJECTS GRID */}
//       {!loading &&
//         !error &&
//         filteredProjects.length > 0 && (
//           <div className="admin-project-grid">

//             {filteredProjects.map(
//               (project) => (
//                 <article
//                   className="admin-project-card"
//                   key={project._id}
//                 >

//                   {/* IMAGE */}
//                   <div className="project-card-image">

//                     <img
//                       src={project.mainImage}
//                       alt={project.title}
//                     />

//                     <div className="project-card-category">
//                       {project.category}
//                     </div>

//                   </div>

//                   {/* CONTENT */}
//                   <div className="project-card-content">

//                     <h2>
//                       {project.title}
//                     </h2>

//                     <p>
//                       {project.description}
//                     </p>

//                     <div className="project-card-footer">

//                       <span>
//                         {
//                           project
//                             .additionalImages
//                             ?.length || 0
//                         }{" "}
//                         additional images
//                       </span>

//                       <div className="project-card-actions">

//                         <button
//                           className="edit-btn"
//                           onClick={() =>
//                             handleEdit(project)
//                           }
//                         >
//                           Edit
//                         </button>

//                         <button
//                           className="delete-btn"
//                           onClick={() =>
//                             handleDelete(
//                               project._id
//                             )
//                           }
//                         >
//                           Delete
//                         </button>

//                       </div>

//                     </div>

//                   </div>

//                 </article>
//               )
//             )}

//           </div>
//         )}


//       {/* =================================================
//           EDIT MODAL
//       ================================================= */}

//       {editingProject && (
//         <div
//           className="edit-modal-overlay"
//           onClick={
//             saving
//               ? undefined
//               : closeEditModal
//           }
//         >

//           <div
//             className="edit-modal"
//             onClick={(e) =>
//               e.stopPropagation()
//             }
//           >

//             {/* MODAL HEADER */}

//             <div className="edit-modal-header">

//               <div>
//                 <span className="page-kicker">
//                   PROJECT EDITOR
//                 </span>

//                 <h2>
//                   Edit Project
//                 </h2>
//               </div>

//               <button
//                 type="button"
//                 className="modal-close-btn"
//                 onClick={closeEditModal}
//                 disabled={saving}
//               >
//                 ×
//               </button>

//             </div>


//             <form
//               onSubmit={handleUpdate}
//             >

//               {/* MAIN IMAGE */}

//               <section className="edit-section">

//                 <div className="edit-section-title">
//                   <h3>Main Image</h3>
//                   <span>01</span>
//                 </div>

//                 <div className="main-image-preview">

//                   <img
//                     src={
//                       newMainImage
//                         ? URL.createObjectURL(
//                             newMainImage
//                           )
//                         : editingProject.mainImage
//                     }
//                     alt="Project Main"
//                   />

//                 </div>

//                 <label className="upload-button">
//                   Replace Main Image

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={
//                       handleMainImageChange
//                     }
//                   />
//                 </label>

//                 {newMainImage && (
//                   <p className="selected-file">
//                     New image:{" "}
//                     <strong>
//                       {newMainImage.name}
//                     </strong>
//                   </p>
//                 )}

//               </section>


//               {/* ADDITIONAL IMAGES */}

//               <section className="edit-section">

//                 <div className="edit-section-title">
//                   <div>
//                     <h3>
//                       Additional Images
//                     </h3>

//                     <p>
//                       Manage project gallery
//                     </p>
//                   </div>

//                   <span className="image-counter">

//                     {
//                       (
//                         editingProject
//                           .additionalImages ||
//                         []
//                       ).filter(
//                         (image) =>
//                           !removedAdditionalImages.includes(
//                             image
//                           )
//                       ).length +
//                       newAdditionalImages.length
//                     }
//                     /6

//                   </span>

//                 </div>


//                 <div className="image-management-grid">

//                   {(
//                     editingProject.additionalImages ||
//                     []
//                   ).map((imageUrl) => {

//                     const removed =
//                       removedAdditionalImages.includes(
//                         imageUrl
//                       );

//                     return (
//                       <div
//                         className={`managed-image ${
//                           removed
//                             ? "removed-image"
//                             : ""
//                         }`}
//                         key={imageUrl}
//                       >

//                         <img
//                           src={imageUrl}
//                           alt="Additional"
//                         />

//                         {!removed ? (
//                           <button
//                             type="button"
//                             onClick={() =>
//                               handleRemoveExistingImage(
//                                 imageUrl
//                               )
//                             }
//                           >
//                             ×
//                           </button>
//                         ) : (
//                           <button
//                             type="button"
//                             className="undo-image"
//                             onClick={() =>
//                               handleUndoRemoveImage(
//                                 imageUrl
//                               )
//                             }
//                           >
//                             Undo
//                           </button>
//                         )}

//                       </div>
//                     );
//                   })}


//                   {newAdditionalImages.map(
//                     (file, index) => (
//                       <div
//                         className="managed-image new-managed-image"
//                         key={`${file.name}-${index}`}
//                       >

//                         <img
//                           src={URL.createObjectURL(
//                             file
//                           )}
//                           alt="New"
//                         />

//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleRemoveNewImage(
//                               index
//                             )
//                           }
//                         >
//                           ×
//                         </button>

//                       </div>
//                     )
//                   )}

//                 </div>


//                 <label className="gallery-upload-box">

//                   <span className="gallery-plus">
//                     ＋
//                   </span>

//                   <strong>
//                     Add Gallery Images
//                   </strong>

//                   <small>
//                     Select images — maximum 6
//                   </small>

//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={
//                       handleAdditionalImagesChange
//                     }
//                   />

//                 </label>

//               </section>


//               {/* PROJECT INFO */}

//               <section className="edit-section">

//                 <div className="edit-section-title">
//                   <h3>Project Information</h3>
//                   <span>02</span>
//                 </div>

//                 <div className="edit-form-grid">

//                   <div className="form-field">

//                     <label>
//                       Project Title
//                     </label>

//                     <input
//                       type="text"
//                       value={editTitle}
//                       onChange={(e) =>
//                         setEditTitle(
//                           e.target.value
//                         )
//                       }
//                       required
//                     />

//                   </div>


//                   <div className="form-field">

//                     <label>
//                       Category
//                     </label>

//                     <select
//                       value={editCategory}
//                       onChange={(e) =>
//                         setEditCategory(
//                           e.target.value
//                         )
//                       }
//                       required
//                     >

//                       {categories.map(
//                         (category) => (
//                           <option
//                             key={category}
//                             value={category}
//                           >
//                             {category}
//                           </option>
//                         )
//                       )}

//                     </select>

//                   </div>

//                 </div>


//                 <div className="form-field">

//                   <label>
//                     Description
//                   </label>

//                   <textarea
//                     value={editDescription}
//                     onChange={(e) =>
//                       setEditDescription(
//                         e.target.value
//                       )
//                     }
//                     rows="6"
//                     required
//                   />

//                 </div>

//               </section>


//               {/* ACTIONS */}

//               <div className="edit-modal-actions">

//                 <button
//                   type="button"
//                   className="cancel-edit-btn"
//                   onClick={closeEditModal}
//                   disabled={saving}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="save-edit-btn"
//                   disabled={saving}
//                 >
//                   {saving
//                     ? "Saving Changes..."
//                     : "Save Changes"}
//                 </button>

//               </div>

//             </form>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// };

// export default AdminProjects;




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getProjects,
  deleteProject,
  updateProject,
} from "../../api/projectApi";

// NEW: review API (see reviewApi.js)
import { createReview } from "../../api/reviewApi";

import "./AdminProjects2.css";

const categories = [
  "UI/UX",
  "Logo",
  "Social media",
  "Certificates",
];

const AdminProjects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] =
    useState("All");

  // Edit project
  const [editingProject, setEditingProject] =
    useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] =
    useState("");
  const [editDescription, setEditDescription] =
    useState("");

  // Images
  const [newMainImage, setNewMainImage] =
    useState(null);

  const [newAdditionalImages, setNewAdditionalImages] =
    useState([]);

  const [
    removedAdditionalImages,
    setRemovedAdditionalImages,
  ] = useState([]);

  const [saving, setSaving] = useState(false);

  // =====================================================
  // NEW: ADD REVIEW STATE (isolated, project state se alag)
  // =====================================================

  const [showAddReviewModal, setShowAddReviewModal] =
    useState(false);

  const [reviewName, setReviewName] = useState("");
  const [reviewProfession, setReviewProfession] =
    useState("");
  const [reviewMessage, setReviewMessage] =
    useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewImage, setReviewImage] = useState(null);

  const [savingReview, setSavingReview] =
    useState(false);

  // =====================================================
  // FETCH PROJECTS
  // =====================================================

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();

      setProjects(data.projects || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Projects load nahi ho sake."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // =====================================================
  // FILTER PROJECTS
  // =====================================================

  const filteredProjects = projects.filter(
    (project) => {
      const matchesSearch =
        project.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        project.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        filterCategory === "All" ||
        project.category === filterCategory;

      return matchesSearch && matchesCategory;
    }
  );

  // =====================================================
  // EDIT OPEN
  // =====================================================

  const handleEdit = (project) => {
    setEditingProject(project);

    setEditTitle(project.title || "");
    setEditCategory(project.category || "");
    setEditDescription(project.description || "");

    setNewMainImage(null);
    setNewAdditionalImages([]);
    setRemovedAdditionalImages([]);
  };

  // =====================================================
  // CLOSE EDIT
  // =====================================================

  const closeEditModal = () => {
    if (saving) return;

    setEditingProject(null);

    setEditTitle("");
    setEditCategory("");
    setEditDescription("");

    setNewMainImage(null);
    setNewAdditionalImages([]);
    setRemovedAdditionalImages([]);
  };

  // =====================================================
  // MAIN IMAGE
  // =====================================================

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    setNewMainImage(file);
  };

  // =====================================================
  // ADDITIONAL IMAGES
  // =====================================================

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    if (!files.length) return;

    const invalidFile = files.find(
      (file) => !file.type.startsWith("image/")
    );

    if (invalidFile) {
      alert("Only image files are allowed.");
      return;
    }

    const existingCount =
      editingProject?.additionalImages?.filter(
        (image) =>
          !removedAdditionalImages.includes(image)
      ).length || 0;

    const total =
      existingCount +
      newAdditionalImages.length +
      files.length;

    if (total > 6) {
      const remaining =
        6 -
        existingCount -
        newAdditionalImages.length;

      alert(
        remaining > 0
          ? `You can add ${remaining} more image(s).`
          : "Maximum 6 additional images allowed."
      );

      return;
    }

    setNewAdditionalImages((previous) => [
      ...previous,
      ...files,
    ]);

    e.target.value = "";
  };

  // =====================================================
  // REMOVE EXISTING IMAGE
  // =====================================================

  const handleRemoveExistingImage = (imageUrl) => {
    setRemovedAdditionalImages((previous) => [
      ...previous,
      imageUrl,
    ]);
  };

  // =====================================================
  // UNDO IMAGE REMOVE
  // =====================================================

  const handleUndoRemoveImage = (imageUrl) => {
    setRemovedAdditionalImages((previous) =>
      previous.filter((image) => image !== imageUrl)
    );
  };

  // =====================================================
  // REMOVE NEW IMAGE
  // =====================================================

  const handleRemoveNewImage = (index) => {
    setNewAdditionalImages((previous) =>
      previous.filter(
        (_, imageIndex) => imageIndex !== index
      )
    );
  };

  // =====================================================
  // UPDATE PROJECT
  // =====================================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingProject) return;

    try {
      setSaving(true);

      const token =
        localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      if (!editTitle.trim()) {
        alert("Project title is required.");
        return;
      }

      if (!editCategory) {
        alert("Project category is required.");
        return;
      }

      if (!editDescription.trim()) {
        alert("Project description is required.");
        return;
      }

      const existingImages =
        editingProject.additionalImages || [];

      const remainingExistingImages =
        existingImages.filter(
          (image) =>
            !removedAdditionalImages.includes(image)
        );

      const finalImageCount =
        remainingExistingImages.length +
        newAdditionalImages.length;

      if (finalImageCount > 6) {
        alert(
          "Maximum 6 additional images are allowed."
        );
        return;
      }

      const formData = new FormData();

      formData.append(
        "title",
        editTitle.trim()
      );

      formData.append(
        "category",
        editCategory
      );

      formData.append(
        "description",
        editDescription.trim()
      );

      if (newMainImage) {
        formData.append(
          "mainImage",
          newMainImage
        );
      }

      newAdditionalImages.forEach((file) => {
        formData.append(
          "additionalImages",
          file
        );
      });

      formData.append(
        "removeAdditionalImages",
        JSON.stringify(
          removedAdditionalImages
        )
      );

      const data = await updateProject(
        editingProject._id,
        formData,
        token
      );

      setProjects((previousProjects) =>
        previousProjects.map((project) =>
          project._id === editingProject._id
            ? data.project
            : project
        )
      );

      closeEditModal();

    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Project update nahi ho saka."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      const token =
        localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      await deleteProject(id, token);

      setProjects((previousProjects) =>
        previousProjects.filter(
          (project) => project._id !== id
        )
      );

    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Project delete nahi ho saka."
      );
    }
  };

  // =====================================================
  // NEW: ADD REVIEW HANDLERS (project code ko touch nahi kiya)
  // =====================================================

  const openAddReviewModal = () => {
    setReviewName("");
    setReviewProfession("");
    setReviewMessage("");
    setReviewRating(5);
    setReviewImage(null);
    setShowAddReviewModal(true);
  };

  const closeAddReviewModal = () => {
    if (savingReview) return;
    setShowAddReviewModal(false);
  };

  const handleReviewImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    setReviewImage(file);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();

    try {
      setSavingReview(true);

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      if (!reviewName.trim()) {
        alert("Name is required.");
        return;
      }

      if (!reviewProfession.trim()) {
        alert("Profession is required.");
        return;
      }

      if (!reviewMessage.trim()) {
        alert("Review message is required.");
        return;
      }

      const formData = new FormData();
      formData.append("name", reviewName.trim());
      formData.append(
        "profession",
        reviewProfession.trim()
      );
      formData.append("message", reviewMessage.trim());
      formData.append("rating", reviewRating);

      if (reviewImage) {
        formData.append("image", reviewImage);
      }

      await createReview(formData, token);

      alert("Review add ho gaya.");
      closeAddReviewModal();

    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Review add nahi ho saka."
      );
    } finally {
      setSavingReview(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="admin-projects-page">

      {/* TOP BAR */}
      <header className="projects-header">

        <div>
          <span className="page-kicker">
            PORTFOLIO MANAGEMENT
          </span>

          <h1>Manage Projects</h1>

          <p>
            Organize, update and control your
            portfolio projects.
          </p>
        </div>

        {/* NEW: Add Review button — same class/style as existing button */}
        <div style={{ display: "flex", gap: "12px" }}>

          <button
            className="create-project-btn"
            onClick={openAddReviewModal}
          >
            <span>＋</span>
            Add Review
          </button>

          <button
            className="create-project-btn"
            onClick={() =>
              navigate("/admin/add-project")
            }
          >
            <span>＋</span>
            New Project
          </button>

        </div>

      </header>

      {/* TOOLBAR */}
      <div className="projects-toolbar">

        <div className="search-box">

          <span className="search-icon">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          className="category-filter"
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(e.target.value)
          }
        >
          <option value="All">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

      </div>

      {/* STATUS */}
      <div className="projects-summary">
        <div>
          <strong>
            {filteredProjects.length}
          </strong>{" "}
          project
          {filteredProjects.length !== 1
            ? "s"
            : ""}{" "}
          found
        </div>

        <div>
          Total:{" "}
          <strong>
            {projects.length}
          </strong>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="projects-empty">
          <div className="loading-spinner"></div>
          <p>Loading projects...</p>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="projects-error">
          <strong>Something went wrong</strong>
          <p>{error}</p>

          <button onClick={fetchProjects}>
            Try Again
          </button>
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        !error &&
        filteredProjects.length === 0 && (
          <div className="projects-empty">

            <div className="empty-icon">
              ▦
            </div>

            <h2>
              No projects found
            </h2>

            <p>
              Try another search or create
              a new project.
            </p>

            <button
              onClick={() =>
                navigate("/admin/add-project")
              }
            >
              Create Project
            </button>

          </div>
        )}

      {/* PROJECTS GRID */}
      {!loading &&
        !error &&
        filteredProjects.length > 0 && (
          <div className="admin-project-grid">

            {filteredProjects.map(
              (project) => (
                <article
                  className="admin-project-card"
                  key={project._id}
                >

                  {/* IMAGE */}
                  <div className="project-card-image">

                    <img
                      src={project.mainImage}
                      alt={project.title}
                    />

                    <div className="project-card-category">
                      {project.category}
                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="project-card-content">

                    <h2>
                      {project.title}
                    </h2>

                    <p>
                      {project.description}
                    </p>

                    <div className="project-card-footer">

                      <span>
                        {
                          project
                            .additionalImages
                            ?.length || 0
                        }{" "}
                        additional images
                      </span>

                      <div className="project-card-actions">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(project)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              project._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                </article>
              )
            )}

          </div>
        )}


      {/* =================================================
          EDIT MODAL
      ================================================= */}

      {editingProject && (
        <div
          className="edit-modal-overlay"
          onClick={
            saving
              ? undefined
              : closeEditModal
          }
        >

          <div
            className="edit-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="edit-modal-header">

              <div>
                <span className="page-kicker">
                  PROJECT EDITOR
                </span>

                <h2>
                  Edit Project
                </h2>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={closeEditModal}
                disabled={saving}
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleUpdate}
            >

              {/* MAIN IMAGE */}

              <section className="edit-section">

                <div className="edit-section-title">
                  <h3>Main Image</h3>
                  <span>01</span>
                </div>

                <div className="main-image-preview">

                  <img
                    src={
                      newMainImage
                        ? URL.createObjectURL(
                            newMainImage
                          )
                        : editingProject.mainImage
                    }
                    alt="Project Main"
                  />

                </div>

                <label className="upload-button">
                  Replace Main Image

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleMainImageChange
                    }
                  />
                </label>

                {newMainImage && (
                  <p className="selected-file">
                    New image:{" "}
                    <strong>
                      {newMainImage.name}
                    </strong>
                  </p>
                )}

              </section>


              {/* ADDITIONAL IMAGES */}

              <section className="edit-section">

                <div className="edit-section-title">
                  <div>
                    <h3>
                      Additional Images
                    </h3>

                    <p>
                      Manage project gallery
                    </p>
                  </div>

                  <span className="image-counter">

                    {
                      (
                        editingProject
                          .additionalImages ||
                        []
                      ).filter(
                        (image) =>
                          !removedAdditionalImages.includes(
                            image
                          )
                      ).length +
                      newAdditionalImages.length
                    }
                    /6

                  </span>

                </div>


                <div className="image-management-grid">

                  {(
                    editingProject.additionalImages ||
                    []
                  ).map((imageUrl) => {

                    const removed =
                      removedAdditionalImages.includes(
                        imageUrl
                      );

                    return (
                      <div
                        className={`managed-image ${
                          removed
                            ? "removed-image"
                            : ""
                        }`}
                        key={imageUrl}
                      >

                        <img
                          src={imageUrl}
                          alt="Additional"
                        />

                        {!removed ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveExistingImage(
                                imageUrl
                              )
                            }
                          >
                            ×
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="undo-image"
                            onClick={() =>
                              handleUndoRemoveImage(
                                imageUrl
                              )
                            }
                          >
                            Undo
                          </button>
                        )}

                      </div>
                    );
                  })}


                  {newAdditionalImages.map(
                    (file, index) => (
                      <div
                        className="managed-image new-managed-image"
                        key={`${file.name}-${index}`}
                      >

                        <img
                          src={URL.createObjectURL(
                            file
                          )}
                          alt="New"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveNewImage(
                              index
                            )
                          }
                        >
                          ×
                        </button>

                      </div>
                    )
                  )}

                </div>


                <label className="gallery-upload-box">

                  <span className="gallery-plus">
                    ＋
                  </span>

                  <strong>
                    Add Gallery Images
                  </strong>

                  <small>
                    Select images — maximum 6
                  </small>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={
                      handleAdditionalImagesChange
                    }
                  />

                </label>

              </section>


              {/* PROJECT INFO */}

              <section className="edit-section">

                <div className="edit-section-title">
                  <h3>Project Information</h3>
                  <span>02</span>
                </div>

                <div className="edit-form-grid">

                  <div className="form-field">

                    <label>
                      Project Title
                    </label>

                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) =>
                        setEditTitle(
                          e.target.value
                        )
                      }
                      required
                    />

                  </div>


                  <div className="form-field">

                    <label>
                      Category
                    </label>

                    <select
                      value={editCategory}
                      onChange={(e) =>
                        setEditCategory(
                          e.target.value
                        )
                      }
                      required
                    >

                      {categories.map(
                        (category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>


                <div className="form-field">

                  <label>
                    Description
                  </label>

                  <textarea
                    value={editDescription}
                    onChange={(e) =>
                      setEditDescription(
                        e.target.value
                      )
                    }
                    rows="6"
                    required
                  />

                </div>

              </section>


              {/* ACTIONS */}

              <div className="edit-modal-actions">

                <button
                  type="button"
                  className="cancel-edit-btn"
                  onClick={closeEditModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-edit-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving Changes..."
                    : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}


      {/* =================================================
          NEW: ADD REVIEW MODAL
          Reuses the exact same edit-modal-* classes as the
          Edit Project modal above, so styling matches
          automatically — no CSS file changes needed.
      ================================================= */}

      {showAddReviewModal && (
        <div
          className="edit-modal-overlay"
          onClick={
            savingReview
              ? undefined
              : closeAddReviewModal
          }
        >

          <div
            className="edit-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="edit-modal-header">

              <div>
                <span className="page-kicker">
                  REVIEWS
                </span>

                <h2>Add Review</h2>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={closeAddReviewModal}
                disabled={savingReview}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleAddReview}>

              {/* PERSON IMAGE */}

              <section className="edit-section">

                <div className="edit-section-title">
                  <h3>Person Image</h3>
                  <span>01</span>
                </div>

                {reviewImage && (
                  <div className="main-image-preview">
                    <img
                      src={URL.createObjectURL(
                        reviewImage
                      )}
                      alt="Reviewer"
                    />
                  </div>
                )}

                <label className="upload-button">
                  {reviewImage
                    ? "Change Image"
                    : "Upload Image"}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleReviewImageChange}
                  />
                </label>

                {reviewImage && (
                  <p className="selected-file">
                    Selected:{" "}
                    <strong>{reviewImage.name}</strong>
                  </p>
                )}

              </section>

              {/* REVIEW INFO */}

              <section className="edit-section">

                <div className="edit-section-title">
                  <h3>Review Details</h3>
                  <span>02</span>
                </div>

                <div className="edit-form-grid">

                  <div className="form-field">
                    <label>Name</label>
                    <input
                      type="text"
                      value={reviewName}
                      onChange={(e) =>
                        setReviewName(e.target.value)
                      }
                      placeholder="e.g. Ayesha Khan"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Profession</label>
                    <input
                      type="text"
                      value={reviewProfession}
                      onChange={(e) =>
                        setReviewProfession(
                          e.target.value
                        )
                      }
                      placeholder="e.g. Marketing Manager"
                      required
                    />
                  </div>

                </div>

                <div className="form-field">
                  <label>Message</label>
                  <textarea
                    value={reviewMessage}
                    onChange={(e) =>
                      setReviewMessage(e.target.value)
                    }
                    rows="5"
                    placeholder="Client ka review yahan likhein..."
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Rating (1 to 5 stars)</label>
                  <select
                    value={reviewRating}
                    onChange={(e) =>
                      setReviewRating(
                        Number(e.target.value)
                      )
                    }
                  >
                    <option value={5}>★★★★★ (5)</option>
                    <option value={4}>★★★★☆ (4)</option>
                    <option value={3}>★★★☆☆ (3)</option>
                    <option value={2}>★★☆☆☆ (2)</option>
                    <option value={1}>★☆☆☆☆ (1)</option>
                  </select>
                </div>

              </section>

              {/* ACTIONS */}

              <div className="edit-modal-actions">

                <button
                  type="button"
                  className="cancel-edit-btn"
                  onClick={closeAddReviewModal}
                  disabled={savingReview}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-edit-btn"
                  disabled={savingReview}
                >
                  {savingReview
                    ? "Adding Review..."
                    : "Add Review"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminProjects;
