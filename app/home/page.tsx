// app/page.tsx
'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe, Package } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const products = [
    {
      id: 1,
      name: 'Puffy Pro Roller',
      price: 89.99,
      image: '/images/pro-roller.webp',
      features: ['Auto-loading', '3-second rolls', 'Ceramic teeth']
    },
    {
      id: 2,
      name: 'Travel Roller',
      price: 59.99,
      image: '/images/travel-roller.webp',
      features: ['Pocket-sized', 'TSA-friendly', 'Dual grind']
    },
    {
      id: 3,
      name: 'Diamond Grinder',
      price: 49.99,
      image: '/images/diamond-grinder.webp',
      features: ['4-layer design', 'Kief catcher', 'Lifetime warranty']
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section (already done) */}

      {/* Featured Products */}
      <motion.section 
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold">Engineered for Perfection</h2>
            <p className="text-gray-600 mt-2">Precision tools for the modern enthusiast</p>
          </div>
          <button className="flex items-center gap-1 text-sm font-medium group">
            View all products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden"
            >
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">${product.price}</span>
                  <button className="text-xs bg-black text-white px-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors">
                    Add to cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Value Propositions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <Zap className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Roll perfect joints in under 30 seconds every time</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <Shield className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Built to Last</h3>
              <p className="text-gray-600">Aerospace-grade materials with lifetime warranty</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <Globe className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Shipping</h3>
              <p className="text-gray-600">Discreet delivery to 50+ countries</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Feature */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative">
              <Image
                src="/images/product-demo.webp"
                alt="Puffy Roller in action"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.8L17 10 6.3 17.2V2.8z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Precision Engineering</h2>
            <p className="text-gray-600 mb-6">
              The Puffy Roller combines Swiss-inspired mechanics with industrial-grade materials 
              to deliver the most consistent rolls on the market.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Patented rolling mechanism</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Food-grade ceramic grinding teeth</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Anodized aluminum housing</span>
              </li>
            </ul>
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
              Explore Technology
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-gray-800 rounded-full mx-auto mb-6"></div>
            <blockquote className="text-xl md:text-2xl italic mb-6">
              "I've tried every roller on the market - the Puffy Pro is the only one that hasn't jammed after heavy use. Worth every penny."
            </blockquote>
            <div>
              <p className="font-medium">Jamie R.</p>
              <p className="text-gray-400 text-sm">Verified Customer</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}