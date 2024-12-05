import { apiClient } from "..";
import { Inventory } from "../../types";

export const postInventory = async (body: Inventory) => {
  const response = await apiClient.post("/inventory", body, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export const updateInventory = async (id: any, body: Inventory) => {
  const response = await apiClient.patch(`/inventory/${id}`, body, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};
export const deleteInventory = async (inventoryId: any) => {
  return await apiClient.delete(`/inventory/${inventoryId}`);
};

export const allInventoryList = async () => {
  const response = await apiClient.get("/inventories", {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
