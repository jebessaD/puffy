// components/Footer.tsx
'use client';

import { Instagram, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.includes("/admin")) return null;
  if (pathname.includes("/order")) return null;

  return (
    <footer className="bg-gray-950 text-gray-300 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Logo and social */}
        <div className="flex flex-col items-center mb-4">
          <Link href="/" className="mb-3">
            <Image 
              src="/image/PuffyLogo1.PNG"
              alt="Puffy Logo"
              width={100}
              height={40}
              className="h-20 w-auto"
              priority
            />
          </Link>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/Getpuffy_" target='_blank' aria-label="Instagram" className="text-gray-400 hover:text-white">
              <Instagram size={18} />
            </a>
            <a href="mailto:getpuffyroll@gmail.com" aria-label="Email" className="text-gray-400 hover:text-white">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Simple links */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4 text-sm">
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/shop" className="hover:text-white">Products</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">&copy; {currentYear} Puffy. All rights reserved.</p>
      </div>
    </footer>
  );
}