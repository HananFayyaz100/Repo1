import axios from "axios";

const API_URL = "http://localhost:5000/api/projects";

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


