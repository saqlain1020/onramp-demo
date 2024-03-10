import api from ".";
import { ApiResponse } from "../types/common";
import { signed_sc_options } from "../types/wert";

export const getSignature = async (args: {
  itemId: number;
  orderId: string;
  usdcAmount: number;
}): ApiResponse<signed_sc_options> => {
  const res = await api.post("/wert/signature", args);
  return res.data;
};
