export interface PostReviewDTO {
  review: string;
  rating: number;
  carId: number;
}
export interface GetReviewDTO {
  review: string;
  rating: number;
  carId: number;
  user: { name: string };
  time: number;
}
