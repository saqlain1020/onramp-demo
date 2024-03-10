import { Address } from "viem";

export const WALLET_PK = import.meta.env.VITE_REACT_WALLET_PK as Address;
export const BaseURL = "https://tgf-backend-110f8c64f3b2.herokuapp.com";

export const Contracts = {
  Seller: "0xA61a1B1fAAD9b613f06FCD6889749c1763F06e95",
  Usdc: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
} as const;
