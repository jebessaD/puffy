// Navbar component to provide a top navigation bar for the website.
// This component will display links for navigation across the website.
import React from "react";
import Image from "next/image";
import { GoMail } from "react-icons/go";
import { BiLogoInstagram } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";
import { navbarMenu } from "@/app/lib/data";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center mx-4 sm:mx-6 lg:mx-16">
      <div className="basis-1/3 flex items-center gap-6">
      <div className="sm:hidden flex items-center gap-2">
      <Sheet>
        <SheetTrigger asChild>
        <RxHamburgerMenu className="text-3xl cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="flex flex-col" side={"left"}>
          <SheetTitle className="-mx-3">
          <Image src="/image/PuffyLogo.png" alt="Puffy Logo" className="sm:hidden -ml-6 -mt-8" width={80} height={80} />
          </SheetTitle>
          <div className="basis-full -mx-6">
          {
          navbarMenu.map((item, index) => (
            <React.Fragment key={index}>
            <hr />
            <Link href={item.href} className="flex justify-between px-3 py-2 items-center">
            <span className="text-nowrap">{item.name}</span>
            <IoIosArrowForward />
            </Link>
            </React.Fragment>
          ))
          }
          <hr />
          </div>
          <hr className="-mx-6" />
          <div className="-mx-6 flex justify-around">
            <GoMail size={25} />
            <BiLogoInstagram size={25} />
            <GoPerson size={25} />
          </div>
        </SheetContent>
      </Sheet>
      </div>
      <Image src="/image/PuffyLogo.png" alt="Puffy Logo" className="max-sm:hidden max-sm:-my-3" width={80} height={80} />
      <ul className="max-sm:hidden h-8 overflow-clip flex justify-center space-x-4 lg:space-x-7 text-xl font-light">
        {
          navbarMenu.map((item, index) => (
            <li key={index} className="z-10 hover:-translate-y-[29px] transition duration-1000">
              <Link href={item.href} className="text-nowrap block">{item.name}</Link>
              <Link href={item.href} className="text-nowrap block">{item.name}</Link>
            </li>
          ))
        }
      </ul>
      </div>
      <div className="basis-1/3 flex justify-center text-2xl font-medium arsenal-sc-bold">
      <div className="max-md:hidden">PUFFY</div>
      <Image src="/image/PuffyLogo.png" alt="Puffy Logo" className="sm:hidden -my-3" width={80} height={80} />
      </div>
      <div className="basis-1/3 flex justify-end gap-2 sm:max-lg:gap-4 lg:gap-6">
      <GoMail className="hover:scale-125 transition duration-500 max-sm:hidden text-3xl cursor-pointer" />
      <BiLogoInstagram className="hover:scale-125 transition duration-500 max-sm:hidden text-3xl cursor-pointer" />
      <GoPerson className="hover:scale-125 transition duration-500 max-sm:hidden sm:text-3xl cursor-pointer" />
      <LiaShoppingBagSolid className="hover:scale-125 transition duration-500 max-sm:hidden sm:text-3xl cursor-pointer" />
      {/* <GoMail className="text-2xl sm:text-3xl cursor-pointer" /> */}
      </div>
    </div>
  );
}
