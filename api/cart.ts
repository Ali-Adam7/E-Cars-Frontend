import { Car } from "@/DTO/Car";

export const addCar = async (cartId: number, carId: number, quantity: number): Promise<void> => {
  try {
    await fetch(`/shopping/cart/${cartId}/${carId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: quantity }),
    });
  } catch (e) {
    console.log("Error adding car", e);
    throw e;
  }
};

export const getCart = async (cartId: number): Promise<Car[]> => {
  try {
    const cart = await fetch(`/shopping/cart/${cartId}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (cart.status !== 200) throw Error();
    return (await cart.json()) as Car[];
  } catch (e) {
    console.log("Error getting cart", e);
    return [];
  }
};
export const removeCar = async (cartId: number, carId: number): Promise<number> => {
  try {
    const res = await fetch(`/shopping/cart/${cartId}/${carId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return res.status;
  } catch (e) {
    console.log("Error removing car", e);
    return 500;
  }
};
