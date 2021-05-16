import API_URL from "./apiConfig";
// const API_URL=require('./apiConfig')
import axios from "axios";
// INDEX, SHOW, CREATE, UPDATE, DESTROY

// Get All Articles
const getAllMessage = () => {
  return axios.get(`${API_URL}/api/Messages`);
};

// Delete Article by ID
const deleteMessageByID = (id) => {
  return axios.delete(`${API_URL}/api/Messages/${id}`);
};

const insertOneMessage = (data) => {
  return axios.post(`${API_URL}/api/Messages/`, data);
};

const signIn = async (userName, password) => {
  // return axios.get(`${API_URL}/api/login/${userName}/${password}`);
  let body = {
    userName: userName,
    password: password,
  };
  return await axios.post(`${API_URL}/api/login/`, body, {
    withCredentials: true,
  });
};

const refreshToken = async () => {
  // console.log(API_URL);

  return fetch(`${API_URL}/api/refresh_token`, {
    withCredentials: true, // Needed to include the cookie
  });
};

const Protected = async (headers) => {
  return await axios.post(`${API_URL}/api/protected`, {
    headers,
  });
};

const logOutCallback = async () => {
  await fetch(`${API_URL}/api/logout`, {
    method: "POST",
    credentials: "include", // Needed to include the cookie
  });
};

const userName = async (refreshtoken) => {
  let body = {
    refreshtoken: refreshtoken,
  };
  return await axios.post(`${API_URL}/api/userName/`, body, {
    withCredentials: true,
  });
};

const getData = async () => {
  try {
    let { data } = await axios.get(`${API_URL}/api/getData`);
    return data.allData;
  } catch (error) {
    console.log(error);
  }
};

const getDataID = async (id) => {
  try {
    let { data } = await axios.get(`${API_URL}/api/getData/${id}`);
    return data.allData;
  } catch (error) {
    console.log(error);
  }
};

const getDataForGallery = async (name, id) => {
  try {
    // console.log(name, id);
    let body = {
      name: name,
      id: id,
    };
    let { data } = await axios.post(`${API_URL}/api/getDataForGallery/`, body);
    console.log(data);
    return data.allData;
  } catch (error) {
    console.log(error);
  }
};

// Dashboard side

const adminsignIn = async (adminName, password) => {
  let body = {
    adminName: adminName,
    password: password,
  };
  return await axios.post(`${API_URL}/api/dashboard/login/`, body, {
    withCredentials: true,
  });
};

const deleteProjectByID = async (id, name) => {
  return await axios.delete(`${API_URL}/api/deleteProject/${id}/${name}`);
};

const addNewProject = async (project) => {
  return await axios.post(`${API_URL}/api/addProject`, { project: project });
};

const updateProjectToDB = async (projectName, projectData) => {
  return await axios.post(`${API_URL}/api/updateProject`, {
    projectName: projectName,
    projectData: projectData,
  });
};

const getEmailJsData = async (template) => {
  return await axios.get(`${API_URL}/api/getEmailJsData/${template}`);
};

const getFireBaseData = async () => {
  return await axios.get(`${API_URL}/api/firebaseData/`);
};

export {
  getAllMessage,
  deleteMessageByID,
  insertOneMessage,
  signIn,
  refreshToken,
  Protected,
  logOutCallback,
  userName,
  getData,
  API_URL,
  getDataID,
  getDataForGallery,
  adminsignIn,
  deleteProjectByID,
  addNewProject,
  updateProjectToDB,
  getEmailJsData,
  getFireBaseData,
};
