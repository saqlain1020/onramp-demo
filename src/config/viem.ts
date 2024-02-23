import { createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";

export const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http(),
});
