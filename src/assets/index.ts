import { erc20Abi } from "viem";
import sellerAbi from "./abis/sellerAbi";

export const Abis = {
  sellerAbi,
  erc20Abi,
} as const;
