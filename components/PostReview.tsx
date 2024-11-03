"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postReview } from "@/api/catalog";
import toast, { Toaster } from "react-hot-toast";
import { PostReviewDTO } from "@/DTO/Review";

export default function PostReview({ car }: { car: any }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0); // Tracks rating on hover
  const [reviewText, setReviewText] = useState("");
  const router = useRouter();

  const post = async () => {
    if (!rating || !reviewText) return toast.error("Add a review and rating");
    const review: PostReviewDTO = {
      review: reviewText,
      rating: rating,
      carId: car.id,
    };
    try {
      await postReview(review);
      toast.success("Review Posted");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to post review");
    }
  };

  return (
    <div className="flex items-start space-x-4">
      <Toaster />
      <div className="min-w-0 flex-1">
        <div className="rating mb-4 flex space-x-1 text-xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`${(hoverRating || rating) >= star ? "text-orange-400" : "text-gray-300"}`}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
        </div>

        <div className="border-b border-gray-200 focus-within:border-indigo-600">
          <label htmlFor="comment" className="sr-only">
            Add your review
          </label>
          <textarea
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            name="comment"
            id="comment"
            className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Add your comment..."
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={post}
            type="submit"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
