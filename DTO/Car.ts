import { GetReviewDTO } from "./Review";

export interface Car {
  id: number;
  model: String;
  make: String;
  description: string;
  type: string;
  price: number;
  year: number;
  milage: number;
  quantity: number;
  deal: boolean;
  reviews?: GetReviewDTO[];
}
