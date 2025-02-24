import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept" :  "application/json",
  },
});

export const register = async (userData: any) => {
  return api.post("/register", userData);
};

export const login = async (userData: any) => {
  return api.post("/login", userData);
};


export const updateTask = async ( todoId: any, todoData : any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }
  return api.put(`/tasks/${todoId}`, todoData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const addTask = async (todoData : any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }
  return api.post("/tasks", todoData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTask = async (id : any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }
  return api.delete(`/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export const getTasks = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  return api.get("/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};




