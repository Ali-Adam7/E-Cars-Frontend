import Image from "next/image";
import Link from "next/link";
export default async function Main() {
  const incentives = [
    {
      name: "24/7 Customer Support",
      description: "Our AI chat widget is powered by a naive series of if/else statements. Guaranteed to irritate.",
    },
    {
      name: "Fast Shopping Cart",
      description: "Look how fast that cart is going. What does this mean for the actual experience? I don't know.",
    },
    {
      name: "Hot Deals",
      description: "Buy them for your friends, especially if they don't like our store. Free money for us, it's great.",
    },
  ];
  const faqs = [
    {
      question: "How do I order a car?",
      answer:
        "You go to the cars tab and you explore several new and unique options that we offer in our store front then choose one and add it to cart",
    },
    {
      question: "I have a question about ordering what do I do?",
      answer: " use our unique chat bot Tom which will provide you with answers to your questions",
    },
    {
      question: "can I cancel an order?",
      answer: " No, the future is now.",
    },

    {
      question: "  How can I see hot deals?  ",
      answer:
        " Click on 'Hot Deals' in the navigation bar to see what new and exciting deals we are offering this week!",
    },
  ];

  const callouts = [
    {
      name: "Sedan",
      description: "You will love driving it",
      imageSrc: "/sedan.jpg",
      imageAlt: "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
      href: `cars?type=Sedan`,
    },
    {
      name: "SUV",
      description: "For Room and Comfort",
      imageSrc: "/suv.jpg",
      imageAlt: "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
      href: `cars?type=SUV`,
    },
    {
      name: "Trucks",
      description: "Built for Life on the Road, Heavy-Duty Trucks",
      imageSrc: "/truck.jpg",
      imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
      href: `cars?type=Truck`,
    },
  ];
  return (
    <div>
      <div className="bg-white">
        <header className="relative bg-white"></header>
      </div>
      <div className="relative bg-white">
        {/* Background image and overlap */}
        <div aria-hidden="true" className="absolute inset-0 hidden sm:flex sm:flex-col">
          <div className="relative w-full flex-1 bg-gray-800">
            <div className="absolute inset-0 overflow-hidden">
              <img src="/background.jpg" alt="" />
            </div>
            <div className="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
          {/* Background image and overlap */}
          <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
            <div className="relative w-full flex-1 bg-gray-800">
              <div className="absolute inset-0 overflow-hidden">
                <img src="/mobile_background.jpg" alt="" className="h-full w-full object-cover object-center" />
              </div>
              <div className="absolute inset-0 bg-gray-900 opacity-50" />
            </div>
            <div className="h-48 w-full bg-white" />
          </div>
          <div className="relative py-32">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Welcome to E-Cars</h1>
            <div className="mt-4 sm:mt-6">
              <Link
                href="/cars"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
              >
                Shop
              </Link>
            </div>
          </div>
        </div>

        <section aria-labelledby="collection-heading" className="relative -mt-96 sm:mt-0">
          <h2 id="collection-heading" className="sr-only">
            Collections
          </h2>
          <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
            {callouts.map((collection) => (
              <div
                key={collection.name}
                className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto"
              >
                <div>
                  <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                      <Image
                        placeholder="blur"
                        blurDataURL="/blur.jpg"
                        fill
                        src={collection.imageSrc}
                        alt={collection.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                  </div>
                  <div className="absolute inset-0 flex items-end rounded-lg p-6">
                    <div>
                      <p aria-hidden="true" className="text-sm text-white">
                        {collection.description}
                      </p>
                      <h3 className="mt-1 font-semibold text-white">
                        <Link href={collection.href}>
                          <span className="absolute inset-0" />
                          {collection.name}
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="relative overflow-hidden bg-white mt-10">
          <div className="bg-gray-100">
            <div className="bg-white py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                  Trusted by the world’s most innovative teams
                </h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                  <Image
                    className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                    src="/tesla.jpg"
                    alt="Transistor"
                    width={158}
                    height={48}
                  />
                  <Image
                    className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                    src="/merc.jpg"
                    alt="Reform"
                    width={158}
                    height={48}
                  />
                  <Image
                    className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                    src="/bmw.jpg"
                    alt="Tuple"
                    width={158}
                    height={48}
                  />
                  <Image
                    className="col-span-2 max-h-24 w-full object-contain sm:col-start-2 lg:col-span-1"
                    src="/lucid.jpg"
                    alt="SavvyCal"
                    width={158}
                    height={48}
                  />
                  <Image
                    className="col-span-2 col-start-2 max-h-24 w-full object-contain sm:col-start-auto lg:col-span-1"
                    src="/xpeng.jpg"
                    alt="Statamic"
                    width={158}
                    height={48}
                  />
                </div>
              </div>
            </div>
            <div className="bg-white">
              <div className="relative bg-gray-900">
                {/* Decorative image and overlay */}
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                  <Image src="/deal.jpg" alt="" fill className="h-full w-full object-cover object-center" />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

                <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
                  <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">New Deals Are Here</h1>
                  <p className="mt-4 text-xl text-white"></p>
                  <Link
                    href="/cars"
                    className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                  >
                    Shop Deals
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-gray-100">
              <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
                <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
                  <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
                    <div>
                      <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                        We built our business on great customer service
                      </h2>
                      <p className="mt-4 text-gray-500">
                        At the beginning at least, but then we realized we could make a lot more money if we kinda
                        stopped caring about that. Our new strategy is to write a bunch of things that look really good
                        in the headlines, then clarify in the small print but hope people dt actually read it.
                      </p>
                    </div>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg bg-gray-100">
                      <Image src="/car.jpg" alt="" fill className="object-cover object-center" />
                    </div>
                  </div>
                  <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                    {incentives.map((incentive) => (
                      <div key={incentive.name} className="sm:flex lg:block">
                        <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                          <h3 className="text-sm font-medium text-gray-900">{incentive.name}</h3>
                          <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-5">
                  <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                    Frequently asked questions
                  </h2>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    Can’t find the answer you’re looking for? Reach out to our{" "}
                    <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      customer support
                    </Link>{" "}
                    team.
                  </p>
                </div>
                <div className="mt-10 lg:col-span-7 lg:mt-0">
                  <dl className="space-y-10">
                    {faqs.map((faq) => (
                      <div key={faq.question}>
                        <dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
                        <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
