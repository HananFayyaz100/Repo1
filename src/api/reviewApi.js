import axios from "axios";

// Agar aapki projectApi.js mein pehle se koi axios instance / BASE_URL bana hua hai,
// to yahan usi ko import kar lein aur neeche ki API_URL line hata dein.
const API_URL =
  import.meta.env.VITE_API_URL || "https://aliiwebbackend1.vercel.app/";

// Backend ka root origin (API_URL se "/api" hata kar) — images
// ke liye chahiye kyunki backend unhe relative path bhejta hai
// (e.g. "/uploads/reviews/xxx.jpg"), jo frontend ke apne origin
// ke against resolve nahi hoga.
const BACKEND_ORIGIN = API_URL.replace(/\/api\/?$/, "");

// Review image (ya kisi bhi backend-relative path) ka poora,
// browser mein khulne wala URL banata hai. Already-absolute
// URLs (http/https) ko chhu tak nahi.
export const getReviewImageUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${BACKEND_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
};

// PUBLIC — website ke review section ke liye
export const getReviews = async () => {
  const res = await axios.get(`${API_URL}/reviews`);
  return res.data;
};

// ADMIN — dashboard ke liye sab reviews (active + inactive)
export const getAllReviews = async (token) => {
  const res = await axios.get(`${API_URL}/reviews/admin/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ADMIN — naya review add karna (FormData: name, profession, message, rating, image)
export const createReview = async (formData, token) => {
  const res = await axios.post(`${API_URL}/reviews`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Content-Type jaan boojh kar set nahi kiya — FormData ke sath
      // axios/browser khud multipart boundary set karta hai.
    },
  });
  return res.data;
};

// ADMIN — future mein edit/delete ke liye (abhi optional)
export const updateReview = async (id, formData, token) => {
  const res = await axios.put(`${API_URL}/reviews/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteReview = async (id, token) => {
  const res = await axios.delete(`${API_URL}/reviews/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};