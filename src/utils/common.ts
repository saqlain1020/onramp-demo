import { signSmartContractData } from "@wert-io/widget-sc-signer";
import { encodeFunctionData } from "viem";
import { Abis } from "../assets";
import { Contracts, WALLET_PK } from "../config";

export const generateWertSignedData = (receiver: string, usdcAmount: number, itemId: number) => {
  const sc_input_data = encodeFunctionData({
    abi: Abis.sellerAbi,
    functionName: "buy",
    args: [BigInt(itemId)],
  });

  const signedData: {
    address: string;
    commodity: string;
    network: string;
    commodity_amount: number;
    sc_address: string;
    sc_input_data: string;
    signature: string;
  } = signSmartContractData(
    {
      address: receiver,
      commodity: "TT",
      network: "mumbai",
      commodity_amount: usdcAmount,
      sc_address: Contracts.Seller,
      sc_input_data,
    },
    WALLET_PK
  );
  return signedData;
};
