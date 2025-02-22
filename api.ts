import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept" :  "application/json",
    "X-XSRF-TOKEN": "eyJpdiI6IkQ4bG03dUp4YWF3M1VCVTdjQlNPK3c9PSIsInZhbHVlIjoiK3dQUmN5WlhZLzhReG9PMXhwbGVoUzhhclF5VEQrNG9OSGUxaUZzazZxeWxZZU1IUXJ5V3FySERXUlVpcG5sTUlhUGdSc2JBZDJ2dnFFdmdETEFhbjdRZDlWVUJicVJubzljS3BBOGtCNkFRbXJGQVI3QXdKRG91L1ZIYjBscHMiLCJtYWMiOiI5ODM5ZDVlNGY1MmQxZTZkM2M2OGE5YjBjNTg5MTIwNDUzYzVhODljZDhlOGYzMGZhNjgzNGRmOWVkYzZlMDdjIiwidGFnIjoiIn0="
  },
});

export const register = async (userData: any) => {
  return api.post("/register", userData);
};

export const login = async (userData: any) => {
  return api.post("/login", userData);
};

// export const getTasks = async (token: string) => {
//   return api.get("/tasks", { headers: { Authorization: `Bearer ${token}` } });
// };
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


