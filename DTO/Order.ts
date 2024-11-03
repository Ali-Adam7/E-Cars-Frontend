import { Car } from "./Car";

export interface Order {
  purchaseOrderId: number;
  userID: number;
  status: string;
  items: (Car & { quantity: number } & { carId: string })[];
}
