import API from "./axios";

export const addMedicineToInventory = async (medicineData) => {
  const res = await API.post("/inventory/update", medicineData);
  return res.data;
};

export const getFullInventory = async () => {
  const res = await API.get("/inventory/all");
  return res.data;
};

export const removeMedicine = async (id) => {
  const res = await API.delete(`/inventory/${id}`);
  return res.data;
};