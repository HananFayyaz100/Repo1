import axios from "axios";

<<<<<<< HEAD
const API_URL =
  (import.meta.env.VITE_API_URL || "http://localhost:5000/api") + "/projects";
=======
const API_URL = "https://aliiwebbackend1.vercel.app/";
>>>>>>> 02321d8cdd869fccb7cf3d208a559c05974d44e0

export const getProjects = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProject = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProject = async (projectData, token) => {
  const response = await axios.post(API_URL, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateProject = async (
  id,
  projectData,
  token
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    }
  );

  return response.data;
};

export const deleteProject = async (id, token) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


