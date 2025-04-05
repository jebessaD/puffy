"use client";
import React, { useState } from "react";
import Image from "next/image";
import { GoMail } from "react-icons/go";
import { BiLogoInstagram } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";
import { navbarMenu } from "@/app/lib/data";
import Cart from "./cart";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };
  const hoverEffect = "hover:scale-125 transition duration-500";
  return (
    <div className="z-10 sticky top-0 flex bg-white border-b border-slate-200 justify-between items-center px-4 sm:px-6 lg:px-16 text-gray-800">
      <div className="basis-1/3 flex items-center gap-6">
        <div className="sm:hidden flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <RxHamburgerMenu className="text-3xl cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="flex flex-col" side={"left"}>
              <SheetTitle className="-mx-3">
                <Image
                  src="/image/puffy_logo.png"
                  alt="Puffy Logo"
                  className="sm:hidden -ml-6 -mt-8"
                  width={60}
                  height={80}
                />
              </SheetTitle>
              <div className="basis-full border-t border-t-gray-100 -mx-6">
                {navbarMenu.map((item, index) => (
                  <React.Fragment key={index}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex justify-between border-b border-b-gray-100 px-3 py-2 items-center text-gray-800"
                    >
                      <span className="text-nowrap">{item.name}</span>
                      <IoIosArrowForward />
                    </Link>
                  </React.Fragment>
                ))}
              </div>
              <hr className="-mx-6" />
              <div className="-mx-6 flex justify-around">
                <a
                  href={`mailto:${process.env.EMAIL_USERNAME}`}
                  target="_blank"
                >
                  <GoMail size={25} />
                </a>
                <a
                  href="https://www.instagram.com/puffyboutique/"
                  target="_blank"
                >
                  <BiLogoInstagram size={25} />
                </a>
                <Link href="/account">
                  <GoPerson size={25} />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <ul className="max-sm:hidden h-6 overflow-clip flex justify-center space-x-4 lg:space-x-7">
          {navbarMenu.map((item, index) => (
            <li
              key={index}
              className="z-10 hover:-translate-y-[26px] transition duration-500"
            >
              <Link href={item.href} className="text-nowrap block">
                {item.name}
              </Link>
              <Link href={item.href} className="text-nowrap block">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="basis-1/3 flex justify-center sm:justify-center items-center text-2xl font-medium">
        <Link href="/">
          <Image
            src="/image/puffy_logo.png"
            alt="Puffy Logo"
            width={70}
            height={70}
            priority
          />
        </Link>
      </div>

      <div className="basis-1/3 flex space-x-2 sm:max-lg:space-x-6 lg:space-x-8 justify-end items-center">
        <div className=" hidden sm:flex justify-end space-x-2 sm:max-lg:space-x-6 lg:space-x-8">
          <a href="mailto:OyH5o@example.com" target="_blank">
            <GoMail size={26} className={`${hoverEffect}`} />
          </a>
          <a href="https://www.instagram.com/puffyboutique/" target="_blank">
            <BiLogoInstagram size={26} className={`${hoverEffect}`} />
          </a>
          <Link href="/account">
            <GoPerson size={26} className={`${hoverEffect}`} />
          </Link>
        </div>
        <div className="ml-auto flex justify-end"> <Cart /></div>
       
      </div>
    </div>
  );
}
