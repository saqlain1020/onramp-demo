export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface Order {
  orderStatus: OrderStatus;
  itemId: number;
  usdAmount: number;
  blockTimestamp?: number;
  orderId?: string;
}
