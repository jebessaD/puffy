"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PiQuotesDuotone } from "react-icons/pi";
import { FiTruck, FiShield, FiHeadphones } from "react-icons/fi";
import useProducts from "./hooks/useProducts";
import { Product } from "./lib/types";
import ProductCard from "./shop/ProductCard";
import Loading from "./components/ui/loading";

export default function HomePage() {
  const { products = [], isLoading, isError, mutate } = useProducts({});

  return (
    <div >
      {/* Hero Section (Kept exactly as is) */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative h-[35rem] w-full overflow-hidden"
      >
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
            className="text-5xl md:text-8xl font-extrabold text-white fancy-font "
          >
            PUFFY
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="text-lg flex md:text-2xl items-start text-gray-300 mt-4 max-w-2xl"
          >
            <p className="self-end">Vibe high, stay fly</p>{" "}
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

      {/* New Featured Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            Premium Rolling Experience
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Engineered for perfection, designed for your lifestyle
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {products.slice(0, 3).map((product: Product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard product={product} mutate={mutate} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link
            href="/shop"
            className="flex items-center gap-2 group text-sm font-medium"
          >
            View all products
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* Services Section - Modernized */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Discreet global delivery with real-time tracking
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Encrypted transactions with multiple payment options
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeadphones className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Support</h3>
              <p className="text-gray-600">
                Dedicated customer service for all your needs
              </p>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
}
