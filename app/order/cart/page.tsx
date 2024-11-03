"use client";

import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon as XMarkIconMini } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import store, { RootState } from "@/store/store";
import { removeCar } from "@/api/cart";
import { removeFromCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Car } from "@/DTO/Car";

export default function Cart() {
  const Router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);

  const remove = async (car: Car) => {
    try {
      if (user.id) await removeCar(user.id, car.id);
      store.dispatch(removeFromCart(car.id));
    } catch (e) {
      console.log("error removing from cart", e);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

        {cart.length === 0 ? (
          // Empty State
          <div className="mt-12 flex flex-col items-center justify-center text-center">
            <svg
              className="h-24 w-24 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-gray-500">Looks like you haven not added anything to your cart yet.</p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          // Cart Items and Order Summary
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                {cart.map((product) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={`/cars/${product.id}.jpg`}
                        alt={`${product.make} ${product.model}`}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                href={`/car/${product.id}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.make} {product.model}
                              </Link>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">{product.type}</p>

                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.year}</p>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">${product.price}</p>
                          <p className="mt-1 text-sm text-gray-900">Quantity: {product.quantity}</p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <div className="absolute right-0 top-0">
                            <button
                              onClick={() => remove(product)}
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIconMini className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700"></p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${" "}
                    {cart?.reduce(
                      (accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price,
                      0
                    )}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  onClick={() => {
                    if (user.id) {
                      Router.push("/order");
                    } else {
                      Router.push("/order/guest");
                    }
                  }}
                  disabled={!cart.length}
                  className={`w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 ${
                    !cart.length ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Checkout
                </button>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
