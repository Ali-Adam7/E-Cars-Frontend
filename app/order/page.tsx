"use client";

import { useState } from "react";
import { submitOrder } from "@/api/order";
import { Car } from "@/DTO/Car";
import { emptyCart } from "@/store/cartSlice";
import { setOrder } from "@/store/orderSlice";
import store, { RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { XMarkIcon as XMarkIconMini } from "@heroicons/react/20/solid";

export default function OrderConfirmation() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);

  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: user.name || "",
    email: user.email || "",
    address: user.address || "",
    country: "United States",
    postalCode: "",
    cardNumber: "",
    cardExpirationDate: "",
    cardCVC: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.firstName || !formData.email || !formData.address) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitOrder(user.id);
      console.log(res);
      if (res === "Success") {
        toast.success("Order submitted successfully!");
        store.dispatch(setOrder(cart));
        store.dispatch(emptyCart());

        setTimeout(() => {
          router.replace(
            `/order/confirmation?address=${encodeURIComponent(formData.address)}&name=${encodeURIComponent(
              formData.firstName
            )}`
          );
        }, 1000);
      } else {
        toast.error("An error occurred while submitting your order.");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl py-12 px-8 bg-white">
      <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          {/* Confirm Details Section */}
          <div className="border-b border-gray-200 pb-12">
            <h2 className="text-2xl font-semibold text-gray-900">Confirm Details</h2>
          </div>

          {/* Personal Information Section */}
          <div className="border-b border-gray-200 pb-12">
            <h2 className="text-base font-semibold text-gray-900">Personal Information</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* First Name */}
              <div className="sm:col-span-3">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!!user.name}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!!user.email}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Street Address */}
              <div className="col-span-full">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!!user.address}
                    autoComplete="street-address"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="1234 Main St"
                  />
                </div>
              </div>

              {/* Country */}
              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>
              </div>

              {/* Postal Code */}
              <div className="sm:col-span-3">
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  ZIP / Postal Code <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="123456"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cart Items Section */}
          <div className="border-b border-gray-200 pb-12">
            <h2 className="text-base font-semibold text-gray-900">Your Cars</h2>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart.map((car: Car) => (
                    <li key={car.id} className="flex py-6">
                      {/* Car Image */}
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={`/cars/${car.id}.jpg`}
                          alt={`${car.make} ${car.model}`}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      {/* Car Details */}
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link href={`/cars/${car.id}`} className="text-indigo-600 hover:text-indigo-800">
                                {car.make} {car.model}
                              </Link>
                            </h3>
                            <p className="ml-4">${car.price.toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {car.year} {car.type}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">Quantity: {car.quantity}</p>
                        </div>

                        {/* Remove Button */}
                        <div className="mt-4 flex items-end justify-between">
                          <div className="flex">
                            <button
                              onClick={() => {
                                // Implement remove functionality if needed
                              }}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-800"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="border-b border-gray-200 pb-12">
            <h2 className="text-base font-semibold text-gray-900">Payment Information</h2>

            <div className="mt-6">
              <fieldset>
                <legend className="sr-only">Payment Details</legend>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {/* Card Number */}
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                      Card Number <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type="text"
                        name="cardNumber"
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>

                  {/* Expiration Date */}
                  <div>
                    <label htmlFor="cardExpirationDate" className="block text-sm font-medium text-gray-700">
                      Expiration Date <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type="text"
                        name="cardExpirationDate"
                        id="cardExpirationDate"
                        value={formData.cardExpirationDate}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="MM / YY"
                      />
                    </div>
                  </div>

                  {/* CVC */}
                  <div>
                    <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-700">
                      CVC <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type="text"
                        name="cardCVC"
                        id="cardCVC"
                        value={formData.cardCVC}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Billing Address */}
              <fieldset className="mt-6">
                <legend className="block text-sm font-medium text-gray-700">Billing Address</legend>
                <div className="mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {/* Country */}
                  <div>
                    <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <select
                        id="billingCountry"
                        name="billingCountry"
                        value={formData.country}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        {/* Add more countries as needed */}
                      </select>
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label htmlFor="billingPostalCode" className="block text-sm font-medium text-gray-700">
                      ZIP / Postal Code <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type="text"
                        name="billingPostalCode"
                        id="billingPostalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="123456"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => router.replace("/")}
            className="text-sm font-semibold text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
              isSubmitting ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {isSubmitting ? "Submitting..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
