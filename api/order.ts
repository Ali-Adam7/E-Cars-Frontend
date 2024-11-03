import { Car } from "@/DTO/Car";
import { Order } from "@/DTO/Order";

export const submitOrder = async (userID: number) => {
  try {
    const response = await fetch(`/shopping/purchase/${userID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return await response.text();
  } catch {
    return "Internal Error";
  }
};

export const getOrders = async (userID: number): Promise<Order[]> => {
  try {
    const response = await fetch(`/shopping/orders/${userID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) return (await response.json()) as Order[];
    return [];
  } catch {
    return [];
  }
};
