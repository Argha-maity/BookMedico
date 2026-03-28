import API from "./axios";

export const getDoctors = async () => {
  const res = await API.get("/doctors");
  return res.data;
};