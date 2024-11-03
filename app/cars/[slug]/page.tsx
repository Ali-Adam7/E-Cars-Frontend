"use server";
import { getCarById } from "@/api/catalog";
import { redirect } from "next/navigation";
import { GetReviewDTO } from "@/DTO/Review";
import PostReview from "@/components/PostReview";
import AddCar from "@/components/AddCar";
export default async function CarID({ params }: { params: { slug: string } }) {
  const id = parseInt(params.slug);
  const car = await getCarById(id);
  if (!car) redirect("/cars");

  const filters = [
    { name: "Make", description: `${car?.make}` },
    { name: "Model", description: `${car?.model}` },
    { name: "Type", description: `${car?.type}` },
    { name: "Year", description: `${car?.year}` },
    { name: "Milage", description: `${car?.milage} Km` },
    { name: "Price", description: `$${car?.price}` },
  ];

  return (
    <div className="bg-white">
      <div className=" mx-auto grid max-w-2xl grid-cols-1 items-end   gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {car?.make + " " + car?.model}
          </h2>
          <p className="mt-4 text-gray-500">{car?.description}</p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {filters.map((filter) => (
              <div key={filter.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{filter.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{filter.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <img src={`/cars/${id}.jpg`} alt="" className="rounded-xl bg-gray-100 xl:ml-20" />
        </div>
        <AddCar car={car} />
      </div>

      <div className="bg-white ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="grid grid-cols-4 ">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">Reviews</h2>
            </div>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8   sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-1">
            <PostReview car={car} />

            <div className="bg-white mb-10">
              <div className="mx-auto max-w-7xl ">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  pt-10 sm:mt-5 sm:pt-15 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {car?.reviews?.map((post: GetReviewDTO) => {
                    const stars = new Array(post.rating).fill(1);
                    return (
                      <article
                        key={post.review}
                        className="flex max-w-xl flex-col items-start p-6 space-y-4 bg-whiterounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src="https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                            alt="User avatar"
                            className="h-12 w-12 rounded-full shadow-md"
                          />
                          <div>
                            <p className="text-lg font-semibold text-gray-900">{post.user.name}</p>
                            <div className="flex items-center mt-1 space-x-1">
                              {stars.map((star, i) => (
                                <span key={i} className="text-orange-400">
                                  <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                    disabled
                                  />
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="relative w-full rounded-lg bg-gray-100 p-4 text-gray-800 shadow-sm">
                          <p className="text-sm leading-6">{post.review}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
