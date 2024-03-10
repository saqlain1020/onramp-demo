import React, { useEffect, useState } from "react";
import { Order } from "../../../../types/order";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getCompletedOrders } from "../../../../api/order";
import CachedIcon from "@mui/icons-material/Cached";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const reloadOrders = async () => {
    const res = await getCompletedOrders();
    if (res.status) setOrders(res.data);
    else setOrders([]);
  };

  useEffect(() => {
    reloadOrders();
  }, []);

  return (
    <Paper elevation={1} sx={{ p: 4, borderRadius: 2, mt: 2, background: "rgba(255,255,255,0.9)" }}>
      <Typography variant="h5" fontWeight={"bold"}>
        Orders{" "}
        <IconButton size="small" color="primary" onClick={reloadOrders}>
          <CachedIcon fontSize="small" />
        </IconButton>
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Item ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Usd Amount</TableCell>
              <TableCell>Block Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.orderId}</TableCell>
                <TableCell>{item.itemId}</TableCell>
                <TableCell>{item.orderStatus}</TableCell>
                <TableCell>{item.usdAmount}</TableCell>
                <TableCell>{item.blockTimestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Orders;
