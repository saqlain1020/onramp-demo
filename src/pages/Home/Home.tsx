import WertWidget from "@wert-io/widget-initializer";
import { useEffect, useState } from "react";
import { generateWertSignedData } from "./../../utils/common";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { publicClient } from "../../config/viem";
import { Abis } from "../../assets";
import { Contracts } from "../../config";
import { Address, formatUnits } from "viem";

const Home = () => {
  const [widgetLoading, setWidgetLoading] = useState(false);
  const [bal, setBal] = useState("0");

  const readBalance = async () => {
    const bal = await publicClient.readContract({
      abi: Abis.erc20Abi,
      functionName: "balanceOf",
      address: Contracts.Seller as Address,
      // args: [Contracts.Seller],
      args: ["0x8be54244f479A99758e88fb29B0955CD083a8a38"],
    });
    setBal(formatUnits(bal, 18));
  };

  const openCheckout = async (itemId: number, price: number) => {
    setWidgetLoading(true);
    const wertWidget = new WertWidget({
      ...generateWertSignedData("0x8be54244f479A99758e88fb29B0955CD083a8a38", price, itemId),
      partner_id: "01GX31S022ST3GB9WY9X4TNYNW", // your partner id
      origin: "https://sandbox.wert.io", // this option needed only in sandbox
      is_crypto_hidden: true,
      extra: {
        item_info: {
          name: `Item ${itemId}`,
          author: "Our Platform",
        },
      },
      listeners: {
        "payment-status": (listenerData) => {
          console.log("Payment status:", listenerData);
          if (listenerData.status === "success") {
            console.log("sucess");
            readBalance();
          }
        },
        loaded: () => {
          console.log("loaded");
          setWidgetLoading(false);
        },
      },
    });
    wertWidget.open();
  };

  useEffect(() => {
    readBalance();
  }, []);

  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item>
            <Card sx={{ p: 2 }} elevation={5}>
              <Typography variant="h3">Item 1</Typography>
              <Typography variant="h5">$2</Typography>
              <LoadingButton loading={widgetLoading} variant="contained" onClick={() => openCheckout(1, 2)}>
                Buy
              </LoadingButton>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ p: 2 }} elevation={5}>
              <Typography variant="h3">Item 2</Typography>
              <Typography variant="h5">$5</Typography>
              <LoadingButton loading={widgetLoading} variant="contained" onClick={() => openCheckout(2, 5)}>
                Buy
              </LoadingButton>
            </Card>
          </Grid>
          <Grid item xs={12}>
            Usd Balance of Owner Wallet: {bal}
          </Grid>
          <Grid item xs={12}>
            <LoadingButton variant="outlined" onClick={readBalance}>
              Reload Balance
            </LoadingButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
