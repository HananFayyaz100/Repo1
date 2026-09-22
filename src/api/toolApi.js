import axios from "axios";

// Agar aapki projectApi.js / reviewApi.js mein pehle se koi axios
// instance / BASE_URL bana hua hai, to yahan usi ko import kar lein
// aur neeche ki API_URL line hata dein — pattern reviewApi.js jaisa
// hi rakha gaya hai taake dono APIs consistent rahen.
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Backend ka root origin (API_URL se "/api" hata kar) — tool image
// Cloudinary se aati hai (poora secure_url), lekin agar kabhi koi
// relative path (e.g. "/uploads/tools/xxx.jpg") backend se aaye,
// to wo bhi safely resolve ho jaye isliye yahi helper reuse kiya.
const BACKEND_ORIGIN = API_URL.replace(/\/api\/?$/, "");

// Tool image ka poora, browser mein khulne wala URL banata hai.
// Cloudinary URLs (http/https) ko chhu tak nahi karta, sirf koi
// relative path aaye to hi prefix lagata hai.
export const getToolImageUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${BACKEND_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
};

// PUBLIC — website ke "skills/tools" section (Skills.jsx) ke liye
export const getTools = async () => {
  const res = await axios.get(`${API_URL}/tools`);
  return res.data;
};

// ADMIN — dashboard ke liye sab tools (active + inactive)
export const getAllTools = async (token) => {
  const res = await axios.get(`${API_URL}/tools/admin/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ADMIN — naya tool add karna (FormData: name, percentage, order, image)
export const createTool = async (formData, token) => {
  const res = await axios.post(`${API_URL}/tools`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Content-Type jaan boojh kar set nahi kiya — FormData ke sath
      // axios/browser khud multipart boundary set karta hai.
    },
  });
  return res.data;
};

// ADMIN — edit/update
export const updateTool = async (id, formData, token) => {
  const res = await axios.put(`${API_URL}/tools/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ADMIN — delete
export const deleteTool = async (id, token) => {
  const res = await axios.delete(`${API_URL}/tools/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
