import { Car } from "@/DTO/Car";
import { PostReviewDTO } from "@/DTO/Review";

const CATALOG_URL = process.env.CATALOG_URL || "http://localhost:8000/catalog";

export const getFilteredCars = async (queryString: string): Promise<Car[]> => {
  try {
    const response = await fetch(`/catalog/cars/${queryString}`);
    if (response.status === 200) return await response.json();
    return [];
  } catch (e) {
    console.log("Error getFilteredCars", e);
    return [];
  }
};

export const getMakes = async (): Promise<string[]> => {
  try {
    const carMakes = await fetch("/catalog/makes");
    if (carMakes.status == 200) return (await carMakes.json()) as string[];
    return [];
  } catch (e) {
    console.log("Error getMakes", e);
    return [];
  }
};

export const getCarById = async (id: number): Promise<Car> => {
  try {
    const car = await fetch(`${CATALOG_URL}/car/${id}`, { cache: "no-cache" });
    return (await car.json()) as Car;
  } catch (e) {
    console.log("Error getCarById", e);
    throw e;
  }
};

export const postReview = async (review: PostReviewDTO): Promise<void> => {
  try {
    await fetch(`/catalog/review/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
  } catch (e) {
    console.log("Review not submitted", e);
    throw e;
  }
};
