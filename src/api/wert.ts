import api from ".";
import { signed_sc_options } from "../types/wert";

export const getSignature = async (args: { itemId: number; orderId: string; usdcAmount: number }) => {
  try {
    const res = await api.post<{ data: signed_sc_options; status: boolean }>("/wert/signature", args);

    return {
      status: res.data.status,
      data: res.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || error.message || error,
    };
  }
};
