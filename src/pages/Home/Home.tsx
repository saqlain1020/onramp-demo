import WertWidget from "@wert-io/widget-initializer";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { Box, Card, Container, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { publicClient } from "../../config/viem";
import { Abis } from "../../assets";
import { Contracts } from "../../config";
import { formatUnits } from "viem";
import { getSignature } from "../../api/wert";
import CachedIcon from "@mui/icons-material/Cached";

const Home = () => {
  const [widgetLoading, setWidgetLoading] = useState(false);
  const [bal, setBal] = useState("0");
  const [itemId, setItemId] = useState("1");
  const [cost, setCost] = useState("1");

  const readBalance = async () => {
    const feeReceiver = await publicClient.readContract({
      abi: Abis.sellerAbi,
      functionName: "feeReceiver",
      address: Contracts.Seller,
    });
    const bal = await publicClient.readContract({
      abi: Abis.erc20Abi,
      functionName: "balanceOf",
      address: Contracts.Usdc,
      args: [feeReceiver],
    });
    setBal(formatUnits(bal, 6));
  };

  const openCheckout = async () => {
    setWidgetLoading(true);
    const res = await getSignature({
      itemId: Number(itemId),
      orderId: v4(),
      usdcAmount: Number(cost),
    });
    console.log("wert signature =>", res);
    if (res.status) {
      const wertWidget = new WertWidget({
        ...res.data,
        partner_id: "01HRBVDJ19RJ224MCMPTRNDS44", // your partner id
        // origin: "https://sandbox.wert.io", // this option needed only in sandbox
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
    }
  };

  useEffect(() => {
    readBalance();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", background: "wheat" }}>
      <Container maxWidth="sm">
        <Paper elevation={1} sx={{ p: 4, borderRadius: 2, background: "rgba(255,255,255,0.9)" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Balances:
              </Typography>
              <Typography>
                Usdc Balance of platform Wallet:<b> {bal} </b>{" "}
                <IconButton size="small" color="primary" onClick={readBalance}>
                  <CachedIcon fontSize="small" />
                </IconButton>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                type="number"
                fullWidth
                label="Item ID"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                type="number"
                fullWidth
                label="Item Cost"
                variant="filled"
                InputProps={{ endAdornment: "$" }}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                variant="contained"
                onClick={openCheckout}
                disabled={widgetLoading}
                loading={widgetLoading}
              >
                Buy
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
