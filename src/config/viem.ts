import { createPublicClient, http } from "viem";
import { arbitrum } from "viem/chains";

export const publicClient = createPublicClient({
  chain: arbitrum,
  transport: http(),
});
