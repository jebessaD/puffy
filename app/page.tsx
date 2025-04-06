"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PiQuotesDuotone } from "react-icons/pi";
import useProducts from "./hooks/useProducts";
import { Product } from "./lib/types";
import ProductCard from "./shop/ProductCard";
import Loading from "./components/ui/loading";

export default function HomePage() {
  const { products = [], isLoading, isError, mutate } = useProducts({});
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative h-[35rem] w-full overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/image/image3.png"
            alt="Luxury shopping scene"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
            priority
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col items-center justify-center h-full text-center px-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-6xl fancy-font md:text-8xl font-extrabold text-white fancy-font tracking-wide"
          >
            Puffy
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="text-lg flex md:text-2xl items-start text-gray-300 mt-4 max-w-2xl"
          >
            <p className="self-end">
              {" "}
              Vibe high, stay fly
            </p>{" "}
            <span>
              <PiQuotesDuotone className="mx-4 text-gray-200 text-xl md:text-3xl lg:text-5xl" />
            </span>
          </motion.div>
          <div className="flex justify-center mt-8">
            <Link
              className="group relative py-3 px-8 rounded-lg text-white font-black"
              href="/shop"
              passHref
            >
              <span className="absolute inset-0 w-3 rounded-lg bg-black transition-all duration-[250ms] ease-out group-hover:w-full"></span>
              <button className="relative group-hover:text-white">
                Shop Now
              </button>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 py-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-20 ">
          New Arrivals
        </h2>
        {isLoading && (
          <div className="flex justify-center py-12">
            <Loading />
          </div>
        )}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 ">
          {products.slice(0, 3).map((product: Product) => (
            <ProductCard key={product.id} product={product} mutate={mutate} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            className="group relative py-3 px-8 rounded-lg bg-white"
            href="/shop"
            passHref
          >
            <span className="absolute inset-0 w-3 rounded-lg bg-black transition-all duration-[250ms] ease-out group-hover:w-full"></span>
            <button className="relative  group-hover:text-white">
              View All Products
            </button>
          </Link>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center my-4">
        Our services
      </h2>
      <div className="flex justify-between md:w-[85%] mx-auto px-4 py-6 ">
        <div className="flex-1 flex justify-center flex-col">
          {" "}
          <Image
            src="/image/fast.jpg"
            alt="Luxury shopping scene"
            width={100}
            height={100}
            className="mix-blend-multiply mx-auto w-20 md:w-auto"
            priority
          />
          <p className="mx-auto text-xs md:text-base text-center">
            Fast Shipping
          </p>
        </div>

        <div className="flex-1 flex justify-center flex-col">
          {" "}
          <Image
            src="/image/secured.jpg"
            alt="Luxury shopping scene"
            className="mix-blend-multiply mx-auto w-20 md:w-auto"
            width={100}
            height={100}
            priority
          />
          <p className="mx-auto text-xs md:text-base text-center">
            Transaction protection
          </p>
        </div>
        <div className="flex-1 flex justify-center flex-col">
          {" "}
          <Image
            src="/image/safety.jpg"
            alt="Luxury shopping scene"
            className="mix-blend-multiply mx-auto w-16 md:w-auto"
            width={100}
            height={100}
            priority
          />
          <p className="mx-auto text-xs md:text-base text-center">
            Reliable after-sale services
          </p>
        </div>
      </div>
    </div>
  );
}
