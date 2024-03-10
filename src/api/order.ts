import api from ".";
import { ApiResponse } from "../types/common";
import { Order } from "../types/order";

export const getCompletedOrders = async (): ApiResponse<Order[]> => {
  const res = await api.get("/order/completed");
  return res.data;
};
