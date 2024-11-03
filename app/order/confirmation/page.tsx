"use client";

import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";

export default function ConfirmOrder() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Valued Customer";
  const address = searchParams.get("address") || "Your Address";
  const cart = useSelector((state: RootState) => state.order);

  if (cart.length === 0) {
    return (
      <main className="bg-white px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-gray-900">No Orders Found</h1>
          <p className="mt-4 text-gray-500">It looks like you haven not placed any orders yet. Start shopping now!</p>
          <a href="/" className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
            Continue Shopping
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Confirmation Message */}
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-indigo-600">Thank you!</h1>
          <p className="mt-2 text-4xl font-bold text-gray-900">Your Order is on the Way!</p>
          <p className="mt-2 text-base text-gray-500">
            Your order has been successfully placed and will arrive shortly.
          </p>

          {/* Tracking Number */}
          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Tracking Number</dt>
            <dd className="mt-2 text-indigo-600">{Math.floor(Math.random() * 10000)}</dd>
          </dl>
        </div>

        {/* Order Details */}
        <section aria-labelledby="order-heading" className="mt-10 border-t border-gray-200">
          <h2 id="order-heading" className="sr-only">
            Your order
          </h2>

          {/* Items */}
          <h3 className="sr-only">Items</h3>
          <div className="space-y-10">
            {cart.map((product) => (
              <div key={product.id} className="flex space-x-6 border-b border-gray-200 py-10">
                {/* Product Image */}
                <div className="relative h-20 w-20 flex-shrink-0 rounded-lg bg-gray-100 sm:h-40 sm:w-40">
                  <Image
                    src={`/cars/${product.id}.jpg`}
                    alt={`${product.make} ${product.model}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-auto flex-col">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {product.make} {product.model} {product.year}
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                  </div>
                  <div className="mt-6 flex flex-1 items-end">
                    <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                      <div className="flex">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">{product.quantity}</dd>
                      </div>
                      <div className="flex pl-4 sm:pl-6">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">${product.price.toFixed(2)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping and Payment Information */}
          <div className="sm:ml-40 sm:pl-6 mt-10">
            {/* Shipping Address */}
            <h3 className="sr-only">Your information</h3>
            <h4 className="sr-only">Addresses</h4>
            <dl className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Shipping Address</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{name}</span>
                    <span className="block">{address}</span>
                  </address>
                </dd>
              </div>
            </dl>

            {/* Payment and Shipping Method */}
            <h4 className="sr-only">Payment</h4>
            <dl className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Payment Method</dt>
                <dd className="mt-2 text-gray-700">
                  <p>Visa ending in 4242</p>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Shipping Method</dt>
                <dd className="mt-2 text-gray-700">
                  <p>DHL Express</p>
                  <p>Takes up to 3 working days</p>
                </dd>
              </div>
            </dl>

            {/* Order Summary */}
            <h3 className="sr-only">Summary</h3>
            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">
                  ${" "}
                  {cart
                    .reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0)
                    .toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
}
