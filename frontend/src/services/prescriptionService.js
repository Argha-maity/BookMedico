import API from "./axios";

export const savePrescription = async (prescriptionData) => {
  const res = await API.post("/prescriptions/add", prescriptionData);
  return res.data;
};

export const getMyPrescriptions = async () => {
  const res = await API.get("/prescriptions/my");
  return res.data;
};

/*export const getPrescriptionById = async (id) => {
  const res = await API.get(`/prescriptions/details/${id}`);
  return res.data;
};*/

export const uploadPrescription = async (data) => {
  const res = await API.post("/prescriptions/upload", data);
  return res.data;
};