"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PiQuotesDuotone } from "react-icons/pi";

export default function HomePage() {
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
            src="/image/image3.jpg"
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
            <p className="self-end"> Luxury redefined - Indulge in softness and style </p>{" "}
            <span>
              <PiQuotesDuotone className="mx-4 text-gray-200 text-xl md:text-3xl lg:text-5xl"  />
            </span>
          </motion.div>
          <Link href="/shop" passHref>
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3 text-lg font-medium text-white border-2 border-black bg-black hover:bg-neutral-50 hover:text-black rounded-full shadow-lg transition-all"
            >
              Shop Now
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
      <div className="h-96 flex justify-center items-center border rounded m-5 p-5">Another section here</div>
    </div>
  );
}
