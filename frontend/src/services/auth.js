import API from "./axios";

export const signupUser = (data) => {
  return API.post("/users/signup", data);
};

export const loginUser = (data) => {
  return API.post("/users/login", data);
};

export const getProfile = () => {
  return API.get("/users/profile");
};